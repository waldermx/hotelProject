import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <nav className="border-b fixed top-0 left-0 right-0 w-full z-50 bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                className="block h-15 w-auto"
                src="/images/LuxStay.png"
                alt="LuxStay"/>
              <span className="font-bold text-xl text-primary">LuxStay</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/rooms" className="text-gray-700 hover:text-primary">
              Habitaciones
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary">
              Contacto
            </Link>
            <Button asChild size="sm">
              <Link href="/rooms">Reservar Ahora</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}