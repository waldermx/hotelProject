import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NavBar from '@/components/NavBar';
import roomsData from '@/data/rooms';

type Params = Promise<{ id: string }>;

export default async function RoomPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const room = roomsData.find((room) => room.id === resolvedParams.id);
  
  if (!room) {
    notFound();
  }

  return (
    <>
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">{room.name}</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {room.images.map((image, index) => (
              <div key={index} className="relative h-[300px] w-full">
                <Image
                  src={image}
                  alt={`${room.name} - Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Descripción</h2>
              <p className="text-gray-600">{room.description}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Detalles</h2>
              <ul className="space-y-2">
                <li><span className="font-medium">Precio:</span> ${room.price} por noche</li>
                <li><span className="font-medium">Capacidad:</span> {room.capacity} personas</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Servicios</h2>
              <ul className="grid grid-cols-2 gap-2">
                {room.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    <Badge variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
            <Button className="w-full">
              Reservar Ahora
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params;
  const room = roomsData.find((room) => room.id === resolvedParams.id);
  
  return {
    title: room ? `Room ${room.name}` : 'Room Not Found',
    description: room ? `Details for ${room.name}` : 'Room not available'
  };
}

export function generateStaticParams() {
  return roomsData.map((room) => ({
    id: room.id,
  }));
}