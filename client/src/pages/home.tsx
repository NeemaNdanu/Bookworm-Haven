import { MOCK_BOOKS } from "@/lib/data";
import { BookCard } from "@/components/ui/book-card";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const genres = Array.from(new Set(MOCK_BOOKS.map((b) => b.genre)));

  const filteredBooks = MOCK_BOOKS.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || 
                          book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-primary/5 flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-background to-background"></div>
        <div className="container relative z-10 px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight animate-in slide-in-from-bottom-5 duration-700">
            Stories that stay with you.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in slide-in-from-bottom-5 duration-700 delay-100">
            Discover a curated collection of timeless classics and modern masterpieces.
          </p>
          
          <div className="max-w-md mx-auto relative animate-in zoom-in duration-500 delay-200">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search titles, authors, genres..." 
              className="pl-10 bg-background/80 backdrop-blur border-primary/20 focus-visible:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <Button 
            variant={selectedGenre === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedGenre(null)}
            className="rounded-full"
          >
            All
          </Button>
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGenre(genre)}
              className="rounded-full"
            >
              {genre}
            </Button>
          ))}
          <Button variant="ghost" size="sm" className="ml-auto">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-muted-foreground">No books found matching your criteria.</h3>
            <Button variant="link" onClick={() => { setSearch(""); setSelectedGenre(null); }}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
