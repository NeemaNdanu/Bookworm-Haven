import { Book } from "@/lib/data";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-card group">
        <Link href={`/book/${book.id}`}>
          <div className="aspect-[2/3] relative overflow-hidden bg-muted cursor-pointer">
            <img
              src={book.coverImage}
              alt={book.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="backdrop-blur-sm bg-white/90 text-foreground font-medium">
                ${book.price.toFixed(2)}
              </Badge>
            </div>
          </div>
        </Link>
        <CardContent className="p-4">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3 h-3 fill-primary text-primary" />
            <span className="text-xs font-medium text-muted-foreground">{book.rating}</span>
          </div>
          <Link href={`/book/${book.id}`}>
            <h3 className="font-serif text-lg font-bold leading-tight mb-1 line-clamp-1 hover:text-primary transition-colors cursor-pointer">
              {book.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
          <p className="text-xs text-muted-foreground/80 line-clamp-2">
            {book.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Button 
            className="w-full" 
            variant="secondary"
            onClick={() => addToCart(book)}
            data-testid={`button-add-to-cart-${book.id}`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
