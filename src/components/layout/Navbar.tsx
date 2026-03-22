import Link from "next/link";
import { Train } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
            <Train className="h-5 w-5" />
          </div>
          <span className="hidden font-bold sm:inline-block">
            NaikApa
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can add search here later if needed */}
          </div>
          <nav className="flex items-center space-x-2">
            <Link href="/routes">
              <Button variant="ghost" className="text-sm">Rute</Button>
            </Link>
            <Link href="/login">
              <Button variant="default">Login / Daftar</Button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
