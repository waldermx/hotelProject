// app/rooms/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DateRangePicker from "@/components/DateRangePicker";
import roomsData from "@/data/rooms.js";

interface RoomPageProps {
  params: { id: string };
}

export default function RoomPage({ params }: RoomPageProps) {
  const room = roomsData.find((room) => room.id === params.id);
  
  if (!room) {
    notFound();
  }
  
  return (
    <main>
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="relative h-72 w-full rounded-lg overflow-hidden">
              <Image
                src={room.images[0] || "https://placehold.co/600x400?text=Hotel+Room"}
                alt={room.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {room.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {room.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src={image || "https://placehold.co/600x400?text=Hotel+Room"}
                      alt={`${room.name} - Imagen ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <h1 className="text-3xl font-bold">{room.name}</h1>
            <p className="text-gray-600 mt-2">
              Capacidad: {room.capacity} {room.capacity === 1 ? "persona" : "personas"}
            </p>
            <p className="text-2xl font-bold text-primary mt-4">${room.price}<span className="text-base font-normal text-gray-500">/noche</span></p>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-gray-700">{room.description}</p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Servicios</h3>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Seleccionar fechas</h3>
              <DateRangePicker 
                onChange={() => {}}
                initialRange={{
                  startDate: new Date(),
                  endDate: new Date(new Date().setDate(new Date().getDate() + 1))
                }}
              />
              <Button className="w-full mt-4">Reservar ahora</Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}