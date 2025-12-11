import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, real, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  price: real("price").notNull(),
  rating: real("rating").notNull(),
  description: text("description").notNull(),
  coverImage: text("cover_image").notNull(),
  genre: text("genre").notNull(),
  stock: integer("stock").notNull().default(100),
});

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }).unique(),
  items: jsonb("items").notNull().default('[]'),
  total: real("total").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertBookSchema = createInsertSchema(books).omit({
  id: true,
});

export const insertCartSchema = createInsertSchema(carts).omit({
  id: true,
  updatedAt: true,
});

// Additional schemas for API validation
export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const cartItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  price: z.number(),
  coverImage: z.string(),
  quantity: z.number().int().positive(),
  rating: z.number(),
  description: z.string(),
  genre: z.string(),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Book = typeof books.$inferSelect;
export type InsertBook = z.infer<typeof insertBookSchema>;

export type Cart = typeof carts.$inferSelect;
export type InsertCart = z.infer<typeof insertCartSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;
