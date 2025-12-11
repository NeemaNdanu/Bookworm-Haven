import { useParams, useLocation } from "wouter";
import { MOCK_BOOKS } from "@/lib/data";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, ArrowLeft, Heart, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function BookDetail() {
  const { id } = useParams();
  const [_, setLocation] = useLocation();
  const { addToCart } = useCart();
  
  const book = MOCK_BOOKS.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif">Book not found</h1>
        <Button variant="link" onClick={() => setLocation("/")}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all" onClick={() => setLocation("/")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Browse
      </Button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Image */}
        <div className="relative aspect-[2/3] md:aspect-[3/4] rounded-lg overflow-hidden shadow-2xl bg-muted max-w-md mx-auto w-full">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-3">{book.genre}</Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground font-medium">{book.author}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 ${star <= Math.round(book.rating) ? 'fill-primary text-primary' : 'text-muted'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({book.rating} / 5.0)</span>
          </div>

          <div className="text-3xl font-bold text-primary">
            ${book.price.toFixed(2)}
          </div>

          <p className="text-lg leading-relaxed text-muted-foreground">
            {book.description}
          </p>

          <div className="flex gap-4 pt-4">
            <Button size="lg" className="flex-1" onClick={() => addToCart(book)}>
              <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="px-4">
              <Heart className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="ghost" className="px-4">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          <Separator className="my-8" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-muted-foreground mb-1">Publisher</span>
              <span className="font-medium">Lumina Press</span>
            </div>
            <div>
              <span className="block text-muted-foreground mb-1">Year</span>
              <span className="font-medium">2024</span>
            </div>
            <div>
              <span className="block text-muted-foreground mb-1">Pages</span>
              <span className="font-medium">342</span>
            </div>
            <div>
              <span className="block text-muted-foreground mb-1">Language</span>
              <span className="font-medium">English</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
