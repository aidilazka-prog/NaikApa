"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function SearchForm() {
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) return;
    
    // In a real app we'd pass these as query params or state
    router.push(`/routes?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg border-primary/20 bg-background/50 backdrop-blur-md">
      <CardContent className="pt-6">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Lokasi Penjemputan" 
              className="pl-10 h-12 bg-background/80"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-destructive" />
            <Input 
              placeholder="Lokasi Tujuan" 
              className="pl-10 h-12 bg-background/80"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full h-12 text-lg">
            <Search className="mr-2 h-5 w-5" /> Cari Rute Terbaik
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
