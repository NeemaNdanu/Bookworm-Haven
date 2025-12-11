import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Coffee, Users } from "lucide-react";
// We'll import the generated image once it's available, for now I'll use a placeholder variable name and update it later if needed, 
// or I can just use the path I expect it to be at.
import aboutImage from "@assets/generated_images/cozy_bookstore_interior.png"; 

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={aboutImage} 
          alt="Cozy bookstore interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-md animate-in slide-in-from-bottom-5 duration-700">
              More than just a bookstore.
            </h1>
            <p className="text-xl text-white/90 font-medium max-w-xl mx-auto animate-in slide-in-from-bottom-5 duration-700 delay-100">
              We are a sanctuary for stories, a community for dreamers, and a home for those who believe in the magic of words.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6 animate-in slide-in-from-left-5 duration-700 delay-200">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The Gilded Page began with a simple idea: that the right book at the right time can change a life. Founded in 2024, we set out to curate a collection that moves beyond the bestseller lists to find the hidden gems, the quiet masterpieces, and the bold new voices that challenge our perspectives.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in the tactile experience of reading—the smell of paper, the weight of a hardcover, and the quiet moments of reflection that only a physical book can provide.
            </p>
            <div className="pt-4">
              <Button size="lg" asChild>
                <Link href="/">Start Browsing</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-muted/30 p-6 rounded-lg space-y-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <h3 className="font-serif text-xl font-bold">Curated Selection</h3>
              <p className="text-muted-foreground">Every book on our shelves is hand-picked by our team of passionate readers.</p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg space-y-3">
              <Users className="w-8 h-8 text-primary" />
              <h3 className="font-serif text-xl font-bold">Community First</h3>
              <p className="text-muted-foreground">We host weekly book clubs, author readings, and workshops for aspiring writers.</p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg space-y-3 sm:col-span-2">
              <Coffee className="w-8 h-8 text-primary" />
              <h3 className="font-serif text-xl font-bold">A Space to Linger</h3>
              <p className="text-muted-foreground">Our spaces are designed for you to stay, read, and get lost in a story. No rushing allowed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="max-w-4xl mx-auto font-serif text-2xl md:text-4xl italic leading-relaxed text-foreground/80">
            "A room without books is like a body without a soul."
          </blockquote>
          <cite className="block mt-6 text-lg font-medium text-primary not-italic">— Marcus Tullius Cicero</cite>
        </div>
      </div>
    </div>
  );
}
