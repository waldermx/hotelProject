import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import roomsData from "@/data/rooms.js";

export default function Home() {
  // Tomar solo las primeras 3 habitaciones para destacar
  const featuredRooms = roomsData.slice(0, 3);
  
  return (
    <main>
      <NavBar />
      <HeroSection />
      
      {/* Sección de habitaciones destacadas */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Nuestras Habitaciones Destacadas</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Descubre nuestras habitaciones más populares, diseñadas para ofrecer el máximo confort y estilo
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <Card key={room.id}>
              <div className="relative h-48 w-full">
                <Image
                  src={room.images[0] || "https://placehold.co/600x400?text=Hotel+Room"}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{room.name}</h3>
                <p className="mt-2 text-primary font-bold">${room.price}<span className="text-xs text-gray-500">/noche</span></p>
                <p className="mt-2 text-sm line-clamp-2">{room.description}</p>
                <Button asChild className="w-full mt-4">
                  <Link href={`/rooms/${room.id}`}>Ver Detalles</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/rooms">Ver Todas las Habitaciones</Link>
          </Button>
        </div>
      </section>
      
      {/* Sección de servicios */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Nuestros Servicios</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Disfruta de estos servicios exclusivos durante tu estancia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-lg">WiFi Gratuito</h3>
              <p className="mt-2 text-gray-600">Conexión de alta velocidad en todas nuestras instalaciones</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-lg">Desayuno Incluido</h3>
              <p className="mt-2 text-gray-600">Buffet completo con opciones locales e internacionales</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-lg">Piscina y Spa</h3>
              <p className="mt-2 text-gray-600">Relájate en nuestra piscina y disfruta de tratamientos de spa</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}