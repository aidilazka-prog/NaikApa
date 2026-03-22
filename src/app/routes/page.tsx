"use client";

import { useEffect, useState, Suspense } from "react";
import { MapPin, ArrowRight, Clock, Banknote, Car, Train, Bike, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Define interface based on API structure
interface RouteOption {
  id: string;
  type: string;
  time: string;
  cost: string;
  distance: string;
  badge: string;
  badgeVariant: "default" | "secondary" | "outline";
}

function RoutesContent() {
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin") || "Stasiun Bogor";
  const destination = searchParams.get("destination") || "Sudirman CBD";

  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);

  useEffect(() => {
    async function fetchRoutes() {
      setLoading(true);
      setErrorStatus(false);
      try {
        const res = await fetch(`/api/routes?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
        
        if (!res.ok) {
          setErrorStatus(true);
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (data.error) {
          setErrorStatus(true);
          setLoading(false);
          return;
        }

        if (data.routes) {
          setRoutes(data.routes);
        } else {
          setRoutes([]);
        }
      } catch (error) {
        console.error("Failed to fetch routes:", error);
        setErrorStatus(true);
      } finally {
        setLoading(false);
      }
    }
    fetchRoutes();
  }, [origin, destination]);

  const getIcon = (type: string) => {
    if (type.includes("Kombinasi") || type.includes("KRL")) return <Train className="h-5 w-5" />;
    if (type.includes("Motor")) return <Bike className="h-5 w-5" />;
    return <Car className="h-5 w-5" />;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-500">
      <div className="mb-8 p-4 bg-muted/50 rounded-xl border flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium mb-1">Titik Jemput</p>
          <div className="flex items-center gap-2 justify-center md:justify-start font-semibold">
            <MapPin className="h-4 w-4 text-muted-foreground" /> {origin}
          </div>
        </div>
        <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground rotate-90 md:rotate-0" />
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium mb-1">Tujuan</p>
          <div className="flex items-center gap-2 justify-center md:justify-start font-semibold">
            <MapPin className="h-4 w-4 text-destructive" /> {destination}
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/">
            <Button variant="outline" size="sm">Ubah Pencarian</Button>
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Pilihan Rute Multimoda</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 text-muted-foreground space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p>Memuat... Menganalisis rute dan lalu lintas real-time...</p>
        </div>
      ) : errorStatus ? (
        <div className="flex flex-col items-center justify-center p-12 text-muted-foreground space-y-4 text-center">
          <h3 className="text-xl font-bold text-foreground">Gagal memuat rute</h3>
          <p>Pencarian rute Gagal. Silakan coba lokasi lain atau periksa koneksi Anda.</p>
        </div>
      ) : routes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-muted-foreground space-y-4 text-center">
          <h3 className="text-xl font-bold text-foreground">Tidak ada rute</h3>
          <p>Kami tidak dapat menemukan rute untuk perjalanan ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {routes.map((route) => (
            <Card key={route.id} className="hover:border-primary/50 transition-colors shadow-sm cursor-pointer group">
              <CardHeader className="py-4 md:pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {getIcon(route.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{route.type}</CardTitle>
                      <CardDescription>Jarak tempuh {route.distance}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={route.badgeVariant} className="whitespace-nowrap">{route.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent className="py-0 pb-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estimasi Waktu</p>
                      <p className="font-semibold">{route.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estimasi Biaya</p>
                      <p className="font-semibold">{route.cost}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="py-4 border-t bg-muted/10 group-hover:bg-primary/5 transition-colors">
                <Link href={`/routes/${route.id}`} className="w-full">
                  <Button className="w-full">Lihat Detail & Perjalanan</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RoutesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoutesContent />
    </Suspense>
  );
}
