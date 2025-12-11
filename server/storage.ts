import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;
import { eq, like, or, and, sql } from "drizzle-orm";
import {
  type User,
  type InsertUser,
  type Book,
  type InsertBook,
  type Cart,
  type InsertCart,
  type CartItem,
  users,
  books,
  carts,
} from "@shared/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool);

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Book methods
  getBooks(params?: {
    page?: number;
    limit?: number;
    q?: string;
    genre?: string;
  }): Promise<{ books: Book[]; total: number }>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  seedBooks(bookList: InsertBook[]): Promise<void>;

  // Cart methods
  getCart(userId: string): Promise<Cart | undefined>;
  createCart(cart: InsertCart): Promise<Cart>;
  updateCart(userId: string, items: CartItem[], total: number): Promise<Cart>;
  deleteCart(userId: string): Promise<void>;
  mergeCart(userId: string, guestItems: CartItem[]): Promise<Cart>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Book methods
  async getBooks(params?: {
    page?: number;
    limit?: number;
    q?: string;
    genre?: string;
  }): Promise<{ books: Book[]; total: number }> {
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const offset = (page - 1) * limit;

    let query = db.select().from(books);
    let countQuery = db.select({ count: sql<number>`count(*)` }).from(books);

    const conditions = [];
    
    if (params?.q) {
      conditions.push(
        or(
          like(books.title, `%${params.q}%`),
          like(books.author, `%${params.q}%`)
        )
      );
    }

    if (params?.genre) {
      conditions.push(eq(books.genre, params.genre));
    }

    if (conditions.length > 0) {
      const whereClause = conditions.length === 1 ? conditions[0] : and(...conditions);
      query = query.where(whereClause!);
      countQuery = countQuery.where(whereClause!);
    }

    const [bookList, countResult] = await Promise.all([
      query.limit(limit).offset(offset),
      countQuery,
    ]);

    return {
      books: bookList,
      total: Number(countResult[0]?.count || 0),
    };
  }

  async getBook(id: number): Promise<Book | undefined> {
    const [book] = await db.select().from(books).where(eq(books.id, id)).limit(1);
    return book;
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const [book] = await db.insert(books).values(insertBook).returning();
    return book;
  }

  async seedBooks(bookList: InsertBook[]): Promise<void> {
    await db.insert(books).values(bookList);
  }

  // Cart methods
  async getCart(userId: string): Promise<Cart | undefined> {
    const [cart] = await db.select().from(carts).where(eq(carts.userId, userId)).limit(1);
    return cart;
  }

  async createCart(insertCart: InsertCart): Promise<Cart> {
    const [cart] = await db.insert(carts).values(insertCart).returning();
    return cart;
  }

  async updateCart(userId: string, items: CartItem[], total: number): Promise<Cart> {
    const [cart] = await db
      .update(carts)
      .set({ items: items as any, total, updatedAt: new Date() })
      .where(eq(carts.userId, userId))
      .returning();
    
    if (!cart) {
      // Create cart if it doesn't exist
      return this.createCart({ userId, items: items as any, total });
    }
    
    return cart;
  }

  async deleteCart(userId: string): Promise<void> {
    await db.delete(carts).where(eq(carts.userId, userId));
  }

  async mergeCart(userId: string, guestItems: CartItem[]): Promise<Cart> {
    const existingCart = await this.getCart(userId);
    
    if (!existingCart || !existingCart.items) {
      // No existing cart, just create one with guest items
      const total = guestItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return this.createCart({ userId, items: guestItems as any, total });
    }

    // Merge items: combine quantities for same books
    const existingItems = existingCart.items as CartItem[];
    const mergedMap = new Map<string, CartItem>();

    // Add existing items
    for (const item of existingItems) {
      mergedMap.set(item.id, item);
    }

    // Merge guest items
    for (const guestItem of guestItems) {
      const existing = mergedMap.get(guestItem.id);
      if (existing) {
        mergedMap.set(guestItem.id, {
          ...existing,
          quantity: existing.quantity + guestItem.quantity,
        });
      } else {
        mergedMap.set(guestItem.id, guestItem);
      }
    }

    const mergedItems = Array.from(mergedMap.values());
    const total = mergedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return this.updateCart(userId, mergedItems, total);
  }
}

export const storage = new DatabaseStorage();
