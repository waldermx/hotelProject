"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DateRangePicker from "./DateRangePicker";
import { DateRange } from "@/lib/types";
import { UserIcon } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  // Inicializar con fechas por defecto
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  });
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("checkIn", dateRange.startDate.toISOString());
    params.set("checkOut", dateRange.endDate.toISOString());
    params.set("guests", guests);
    
    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <div className="relative h-[500px] w-full">
      <Image
        src="/images/hero.jpg"
        alt="Hotel de lujo con vista al mar"
        fill
        priority
        className="object-cover brightness-50"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center max-w-3xl">
          Descubre el lujo y la comodidad en LuxStay Hotel
        </h1>
        <p className="mt-4 text-xl text-center max-w-xl">
          Habitaciones elegantes con vistas impresionantes para una estancia inolvidable
        </p>
        
        <div className="mt-8 w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
            <div className="md:col-span-5">
              <DateRangePicker 
                onChange={(range) => {
                  console.log("Fecha seleccionada:", range);
                  setDateRange(range);
                }} 
                initialRange={dateRange} 
              />
            </div>
            <div className="md:col-span-1">
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="w-full h-[52px]">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Huéspedes" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <div className="py-2">
                    <div className="px-2 pb-2 text-sm font-medium text-gray-500">Huéspedes</div>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Huésped" : "Huéspedes"}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1">
              <Button onClick={handleSearch} className="w-full h-[52px]" size="lg">
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}