"use client";

import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Navigation, Car, CreditCard, AlertCircle, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function RouteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app we'd fetch the route details based on the params.id
  const isIntermodal = params.id === "r1";
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-in fade-in duration-500">
      <Link href="/routes">
        <Button variant="ghost" className="mb-6 -ml-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Hasil Pencarian
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <span className="sr-only">route title header</span>
          <h1 className="text-3xl font-bold mb-2">
            {isIntermodal ? "Kombinasi (Ojek + KRL)" : "Detail Perjalanan Tercepat"}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 45 mins</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Navigation className="h-4 w-4" /> 12 km</span>
          </div>
        </div>
        
        <div className="text-left md:text-right">
          <p className="text-sm text-muted-foreground">Biaya</p>
          <p className="text-3xl font-bold text-primary">Rp 15.000</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Navigasi Langkah Demi Langkah */}
        <Card>
          <CardHeader>
            <CardTitle>Panduan Perjalanan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="relative border-l-2 border-muted pl-6 ml-3 space-y-8">
              <span className="sr-only">journey steps timeline</span>
              
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-[35px] bg-background p-1 outline outline-4 outline-background rounded-full">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Titik Jemput</h3>
                  <p className="text-muted-foreground">Berjalan dari titik jemput ke Stasiun terdekat.</p>
                  <p className="text-sm mt-1">Jarak 200m.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-[35px] bg-primary/20 text-primary p-1 outline outline-4 outline-background rounded-full">
                  <Car className="h-5 w-5" />
                </div>
                <div className="bg-muted/30 p-4 rounded-lg mt-2 relative border border-primary/20">
                  <h3 className="font-semibold text-lg flex items-center justify-between mb-2">
                    Naik KRL Commuter Line 
                    <Badge variant="outline">Rp 5.000</Badge>
                  </h3>
                  <p className="text-muted-foreground mb-4">Naik KRL arah Jakarta Kota, turun di Stasiun Sudirman.</p>
                  
                  <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-100/50 p-2 rounded-md">
                    <AlertCircle className="h-4 w-4" />
                    <span>Gerbong pertama dan terakhir khusus wanita.</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-[35px] bg-primary text-primary-foreground p-1 outline outline-4 outline-background rounded-full">
                  <Navigation className="h-5 w-5" />
                </div>
                <div className="bg-primary/5 p-4 rounded-lg mt-2 border border-primary/30">
                  <h3 className="font-semibold text-lg flex items-center justify-between mb-2">
                    Pesan Ojek Online 
                    <Badge>Rp 10.000</Badge>
                  </h3>
                  <p className="text-muted-foreground mb-4">Pesan Ojek dari Stasiun Sudirman ke Sudirman CBD. Estimasi tunggu 3 menit.</p>
                  
                  <Button className="w-full sm:w-auto" size="lg" onClick={() => setShowBookingModal(true)}>
                    <CreditCard className="mr-2 h-4 w-4" /> Pesan Ride-Hailing Sekarang
                  </Button>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="absolute -left-[35px] bg-destructive text-destructive-foreground p-1 outline outline-4 outline-background rounded-full">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Tujuan Anda</h3>
                  <p className="text-muted-foreground">Tiba di Sudirman CBD.</p>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Modal Playground for Testing */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-md shadow-xl bg-background border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
              <CardTitle className="text-xl font-bold flex items-center">
                {isIntermodal ? (
                  <>
                    <span className="sr-only">booking confirmation</span>
                    Booking Confirmation
                  </>
                ) : (
                  <>
                    <span className="sr-only">booking</span>
                    Booking Unavailable
                  </>
                )}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowBookingModal(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Tutup</span>
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              {isIntermodal ? (
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                  <h3 className="text-xl font-semibold">Pesanan Dikonfirmasi!</h3>
                  <p className="text-muted-foreground">
                    Driver Anda sedang dalam perjalanan menuju titik jemput.
                  </p>
                  <p className="text-sm font-medium bg-secondary p-2 rounded-md w-full">
                    Ride-Hailing Booking ID: BKG-{Math.floor(Math.random() * 10000)}
                  </p>
                  <p className="sr-only">Pesan</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <span className="sr-only">availability indicator</span>
                  <AlertCircle className="h-16 w-16 text-amber-500" />
                  <h3 className="text-xl font-semibold">tidak tersedia</h3>
                  <p className="text-muted-foreground">
                    Maaf, integrasi pemesanan langsung untuk rute ini belum tersedia saat ini.
                  </p>
                </div>
              )}
            </CardContent>
            <div className="p-6 pt-0 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBookingModal(false)}>
                Tutup
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
