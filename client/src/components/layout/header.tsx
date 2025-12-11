import { Link, useLocation } from "wouter";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { ShoppingBag, User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useState } from "react";

export function Header() {
  const { count, setIsOpen } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight flex items-center gap-2">
          <span className="text-primary text-3xl">✦</span> Lumina Books
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className={`transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
            Browse
          </Link>
          <Link href="/bestsellers" className={`transition-colors hover:text-primary ${location === '/bestsellers' ? 'text-primary' : 'text-muted-foreground'}`}>
            Bestsellers
          </Link>
          <Link href="/about" className={`transition-colors hover:text-primary ${location === '/about' ? 'text-primary' : 'text-muted-foreground'}`}>
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Cart Trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsOpen(true)}
            data-testid="button-cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center animate-in zoom-in">
                {count}
              </span>
            )}
          </Button>

          {/* User Menu */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-user-menu">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  {user?.name}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-left font-serif">Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigation menu for mobile devices
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Browse
                  </Link>
                  <Link href="/bestsellers" className="text-lg font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                    Bestsellers
                  </Link>
                  <Link href="/about" className="text-lg font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                    About
                  </Link>
                  {!isAuthenticated && (
                     <Button className="w-full mt-4" onClick={() => setMobileMenuOpen(false)} asChild>
                       <Link href="/auth">Sign In / Register</Link>
                     </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
