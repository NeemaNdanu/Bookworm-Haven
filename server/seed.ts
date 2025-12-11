import { storage } from "./storage";
import type { InsertBook } from "@shared/schema";

const SEED_BOOKS: InsertBook[] = [
  {
    title: "The Star Voyager",
    author: "Elena Cosmo",
    price: 18.99,
    rating: 4.5,
    description: "A journey across the galaxy to find the last habitable planet. A tale of courage, loss, and the enduring human spirit in the face of the infinite void.",
    coverImage: "/generated_images/sci-fi_book_cover.png",
    genre: "Science Fiction",
    stock: 100,
  },
  {
    title: "Shadows in the Mist",
    author: "Arthur Conan",
    price: 14.50,
    rating: 4.8,
    description: "A detective with a troubled past must solve a series of disappearances in a foggy coastal town before the killer strikes again.",
    coverImage: "/generated_images/mystery_book_cover.png",
    genre: "Mystery",
    stock: 100,
  },
  {
    title: "Culinary Secrets",
    author: "Julia Childers",
    price: 29.99,
    rating: 5.0,
    description: "Explore the hidden techniques of French cooking with this comprehensive guide to mastering the art of flavor and presentation.",
    coverImage: "/generated_images/cookbook_cover.png",
    genre: "Non-Fiction",
    stock: 100,
  },
  {
    title: "Echoes of Time",
    author: "Gabriel Garcia",
    price: 16.95,
    rating: 4.2,
    description: "A multi-generational saga exploring memory, history, and the way our past shapes our future in unexpected ways.",
    coverImage: "/generated_images/literary_fiction_cover.png",
    genre: "Fiction",
    stock: 100,
  },
  {
    title: "The Silent Algorithm",
    author: "Tech Noir",
    price: 21.00,
    rating: 4.6,
    description: "In a world where AI controls everything, one programmer discovers a backdoor that could change humanity's fate forever.",
    coverImage: "/generated_images/sci-fi_book_cover.png",
    genre: "Science Fiction",
    stock: 100,
  },
  {
    title: "Midnight Express",
    author: "Agatha Christie-Like",
    price: 12.99,
    rating: 4.3,
    description: "A murder on a trans-continental train leaves everyone a suspect. Can you figure it out before the train reaches its destination?",
    coverImage: "/generated_images/mystery_book_cover.png",
    genre: "Mystery",
    stock: 100,
  },
  {
    title: "Modern Minimalist Living",
    author: "Zen Master",
    price: 24.50,
    rating: 4.7,
    description: "Declutter your home and your mind. A guide to finding peace through simplicity and intentional living.",
    coverImage: "/generated_images/cookbook_cover.png",
    genre: "Non-Fiction",
    stock: 100,
  },
  {
    title: "The Lost Garden",
    author: "Rose Petal",
    price: 15.99,
    rating: 4.4,
    description: "Two lovers separated by war find their way back to each other through the clues left in an abandoned garden.",
    coverImage: "/generated_images/literary_fiction_cover.png",
    genre: "Fiction",
    stock: 100,
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding books...");
    await storage.seedBooks(SEED_BOOKS);
    console.log("✅ Seeded", SEED_BOOKS.length, "books successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
