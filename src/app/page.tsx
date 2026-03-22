import { SearchForm } from "@/components/SearchForm";
import { Badge } from "@/components/ui/badge";
import { AnimatedHeroSVG } from "@/components/AnimatedHeroSVG";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Badge variant="secondary" className="px-4 py-1.5 text-sm rounded-full">
          🚀 Panduan Rute Multi-Moda #1 di Jabodetabek
        </Badge>
        
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Hindari Macet, <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Hemat Waktu & Biaya</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Bandingkan efisiensi waktu dan biaya antara kendaraan pribadi, transportasi umum, ojek online, atau kombinasi antar-moda secara real-time.
          </p>
        </div>

        <div className="-mt-8 -mb-4 w-full">
          <AnimatedHeroSVG />
        </div>

        <div className="w-full mt-8">
          <SearchForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto text-left">
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl border bg-card/50 shadow-sm transition-all hover:shadow-md">
            <div className="p-4 bg-primary/10 rounded-full">
              <span className="text-3xl">🚇</span>
            </div>
            <h3 className="text-xl font-bold">Kombinasi Moda Terpintar</h3>
            <p className="text-muted-foreground">Kombinasikan ojek online dengan KRL/MRT untuk rute tercepat bebas pusing.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl border bg-card/50 shadow-sm transition-all hover:shadow-md">
            <div className="p-4 bg-primary/10 rounded-full">
              <span className="text-3xl">⏱️</span>
            </div>
            <h3 className="text-xl font-bold">Data Real-Time</h3>
            <p className="text-muted-foreground">Pembaruan jadwal kereta, bus, jalan tol, dan kondisi lalu lintas secara langsung.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl border bg-card/50 shadow-sm transition-all hover:shadow-md">
            <div className="p-4 bg-primary/10 rounded-full">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-xl font-bold">Hemat Biaya</h3>
            <p className="text-muted-foreground">Temukan alternatif transportasi termurah yang tidak akan menguras kantong Anda.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
