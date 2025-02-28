import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import roomsData from "@/data/rooms.js";

export default function RoomsList() {
  return (
    <main>
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Nuestras Habitaciones</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomsData.map((room) => (
            <Link key={room.id} href={`/rooms/${room.id}`}>
              <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 w-full">
                  <Image
                    src={room.images[0] || "https://placehold.co/600x400?text=Hotel+Room"}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold">{room.name}</h2>
                  <p className="text-gray-600 mt-2">
                    Capacidad: {room.capacity} {room.capacity === 1 ? "persona" : "personas"}
                  </p>
                  <p className="text-2xl font-bold text-primary mt-4">${room.price}<span className="text-base font-normal text-gray-500">/noche</span></p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}