import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";
import { Header } from "@/components/layout/header";
import { CartDrawer } from "@/components/cart/cart-drawer";

import Home from "@/pages/home";
import BookDetail from "@/pages/book-detail";
import AuthPage from "@/pages/auth";
import Bestsellers from "@/pages/bestsellers";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/book/:id" component={BookDetail} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/bestsellers" component={Bestsellers} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <CartDrawer />
            <main className="flex-1">
              <Router />
            </main>
            <Toaster />
          </div>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
