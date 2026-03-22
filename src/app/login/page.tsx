"use client";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsPending(true);
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // Redirect after success
      });
      
      if (error) {
        alert("Gagal memproses login: " + (error.message || "Pastikan pengaturan Google Auth benar."));
      }
    } catch {
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md animate-in fade-in duration-500 min-h-[calc(100vh-14rem)] flex items-center justify-center">
      <Card className="w-full shadow-lg border-primary/20">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Masuk ke NaikApa</CardTitle>
          <CardDescription>
            Pilih metode masuk untuk mengakses sejarah rute dan preferensi moda Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="outline" className="w-full relative h-11" onClick={handleGoogleLogin} disabled={isPending}>
            {isPending ? (
              <span>Memuat...</span>
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="absolute left-4 h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Lanjutkan dengan Google
              </>
            )}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Atau gunakan email</span>
            </div>
          </div>
          <div className="grid gap-2 text-left">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="nama@email.com" />
          </div>
          <div className="grid gap-2 text-left">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full h-11 text-base">Masuk</Button>
          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun? {" "}
            <Link href="#" className="font-semibold text-primary hover:underline">
              Daftar disini
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
