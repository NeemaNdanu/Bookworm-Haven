import scifi from '@assets/generated_images/sci-fi_book_cover.png';
import mystery from '@assets/generated_images/mystery_book_cover.png';
import cookbook from '@assets/generated_images/cookbook_cover.png';
import literary from '@assets/generated_images/literary_fiction_cover.png';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  description: string;
  coverImage: string;
  genre: string;
}

export const MOCK_BOOKS: Book[] = [
  {
    id: "1",
    title: "The Star Voyager",
    author: "Elena Cosmo",
    price: 18.99,
    rating: 4.5,
    description: "A journey across the galaxy to find the last habitable planet. A tale of courage, loss, and the enduring human spirit in the face of the infinite void.",
    coverImage: scifi,
    genre: "Science Fiction"
  },
  {
    id: "2",
    title: "Shadows in the Mist",
    author: "Arthur Conan",
    price: 14.50,
    rating: 4.8,
    description: "A detective with a troubled past must solve a series of disappearances in a foggy coastal town before the killer strikes again.",
    coverImage: mystery,
    genre: "Mystery"
  },
  {
    id: "3",
    title: "Culinary Secrets",
    author: "Julia Childers",
    price: 29.99,
    rating: 5.0,
    description: "Explore the hidden techniques of French cooking with this comprehensive guide to mastering the art of flavor and presentation.",
    coverImage: cookbook,
    genre: "Non-Fiction"
  },
  {
    id: "4",
    title: "Echoes of Time",
    author: "Gabriel Garcia",
    price: 16.95,
    rating: 4.2,
    description: "A multi-generational saga exploring memory, history, and the way our past shapes our future in unexpected ways.",
    coverImage: literary,
    genre: "Fiction"
  },
  {
    id: "5",
    title: "The Silent Algorithm",
    author: "Tech Noir",
    price: 21.00,
    rating: 4.6,
    description: "In a world where AI controls everything, one programmer discovers a backdoor that could change humanity's fate forever.",
    coverImage: scifi,
    genre: "Science Fiction"
  },
  {
    id: "6",
    title: "Midnight Express",
    author: "Agatha Christie-Like",
    price: 12.99,
    rating: 4.3,
    description: "A murder on a trans-continental train leaves everyone a suspect. Can you figure it out before the train reaches its destination?",
    coverImage: mystery,
    genre: "Mystery"
  },
  {
    id: "7",
    title: "Modern Minimalist Living",
    author: "Zen Master",
    price: 24.50,
    rating: 4.7,
    description: "Declutter your home and your mind. A guide to finding peace through simplicity and intentional living.",
    coverImage: cookbook,
    genre: "Non-Fiction"
  },
  {
    id: "8",
    title: "The Lost Garden",
    author: "Rose Petal",
    price: 15.99,
    rating: 4.4,
    description: "Two lovers separated by war find their way back to each other through the clues left in an abandoned garden.",
    coverImage: literary,
    genre: "Fiction"
  }
];
