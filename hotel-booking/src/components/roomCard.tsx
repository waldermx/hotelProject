import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Room } from "@/lib/types";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={room.images[0] || "https://placehold.co/600x400?text=Hotel+Room"}
          alt={room.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{room.name}</h3>
            <p className="text-gray-500 text-sm mt-1">
              Capacidad: {room.capacity} {room.capacity === 1 ? "persona" : "personas"}
            </p>
          </div>
          <p className="text-primary font-bold">${room.price}<span className="text-xs text-gray-500">/noche</span></p>
        </div>
        <p className="mt-2 text-sm line-clamp-2">{room.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {room.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{room.amenities.length - 3} más
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/rooms/${room.id}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}