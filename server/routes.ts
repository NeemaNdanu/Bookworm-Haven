import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pkg from "pg";
const { Pool } = pkg;
import { registerSchema, loginSchema, cartItemSchema, type CartItem } from "@shared/schema";
import { fromError } from "zod-validation-error";

const PgSession = connectPgSimple(session);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Session middleware
  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: "session",
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET || "gilded-page-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    })
  );

  // Auth middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // ============= AUTH ROUTES =============
  
  // Register
  app.post("/api/auth/register", async (req, res) => {
    try {
      const result = registerSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: fromError(result.error).toString() });
      }

      const { name, email, password } = result.data;

      // Check if user exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create user
      const user = await storage.createUser({ name, email, passwordHash });

      // Set session
      req.session.userId = user.id;

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: fromError(result.error).toString() });
      }

      const { email, password } = result.data;

      // Find user
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Verify password
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Set session
      req.session.userId = user.id;

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get current user
  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // ============= BOOKS ROUTES =============

  // Get books with filtering and pagination
  app.get("/api/books", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const q = req.query.q as string;
      const genre = req.query.genre as string;

      const result = await storage.getBooks({ page, limit, q, genre });
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get single book
  app.get("/api/books/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const book = await storage.getBook(id);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.json(book);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============= CART ROUTES =============

  // Get cart
  app.get("/api/cart", requireAuth, async (req, res) => {
    try {
      const cart = await storage.getCart(req.session.userId!);
      
      if (!cart) {
        return res.json({ items: [], total: 0 });
      }

      res.json({
        items: cart.items,
        total: cart.total,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update cart (add/update items)
  app.post("/api/cart", requireAuth, async (req, res) => {
    try {
      const items = req.body.items as CartItem[];
      
      // Validate items
      for (const item of items) {
        const result = cartItemSchema.safeParse(item);
        if (!result.success) {
          return res.status(400).json({ message: fromError(result.error).toString() });
        }
      }

      // Calculate total
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const cart = await storage.updateCart(req.session.userId!, items, total);

      res.json({
        items: cart.items,
        total: cart.total,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Merge guest cart with user cart on login
  app.post("/api/cart/merge", requireAuth, async (req, res) => {
    try {
      const guestItems = req.body.items as CartItem[];
      
      // Validate items
      for (const item of guestItems) {
        const result = cartItemSchema.safeParse(item);
        if (!result.success) {
          return res.status(400).json({ message: fromError(result.error).toString() });
        }
      }

      const cart = await storage.mergeCart(req.session.userId!, guestItems);

      res.json({
        items: cart.items,
        total: cart.total,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Delete cart
  app.delete("/api/cart", requireAuth, async (req, res) => {
    try {
      await storage.deleteCart(req.session.userId!);
      res.json({ message: "Cart cleared" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
}
