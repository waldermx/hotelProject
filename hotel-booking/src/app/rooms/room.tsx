import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface RoomType {
  images: string[];
  name: string;
  capacity: number;
  price: number;
  description: string;
}

export default function Room() {
  const router = useRouter();
  const { id } = router.query;
  const [room, setRoom] = useState<RoomType | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/rooms/${id}`)
        .then(response => response.json())
        .then(data => setRoom(data));
    }
  }, [id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="border rounded-lg overflow-hidden shadow-lg">
          <div className="relative h-96 w-full">
            <Image
              src={room.images[0] || "https://placehold.co/600x400?text=Hotel+Room"}
              alt={room.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h1 className="text-3xl font-bold">{room.name}</h1>
            <p className="text-gray-600 mt-2">
              Capacidad: {room.capacity} {room.capacity === 1 ? "persona" : "personas"}
            </p>
            <p className="text-2xl font-bold text-primary mt-4">${room.price}<span className="text-base font-normal text-gray-500">/noche</span></p>
            <p className="text-gray-600 mt-4">{room.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}