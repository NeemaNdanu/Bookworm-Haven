import { MOCK_BOOKS } from "@/lib/data";
import { BookCard } from "@/components/ui/book-card";
import { Trophy } from "lucide-react";

export default function Bestsellers() {
  // Filter for books with high ratings (>= 4.5) to simulate bestsellers
  const bestsellers = MOCK_BOOKS.filter((book) => book.rating >= 4.5).sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header Section */}
      <section className="bg-muted/30 py-12 mb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 animate-in slide-in-from-bottom-5 duration-500">
            Our Bestsellers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in slide-in-from-bottom-5 duration-500 delay-100">
            The most loved books by our community this month. Discover your next favorite read from our top-rated collection.
          </p>
        </div>
      </section>

      {/* Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-700 delay-200">
          {bestsellers.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
