"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Interfaz que define la estructura del rango de fechas
interface DateRange {
  startDate: Date; // Fecha de llegada
  endDate: Date;   // Fecha de salida
}

// Propiedades que recibe el componente
interface DateRangePickerProps {
  onChange: (range: DateRange) => void; // Función que se ejecuta al cambiar las fechas
  initialRange?: DateRange;             // Rango inicial (opcional)
}

export default function DateRangePicker({ onChange, initialRange }: DateRangePickerProps) {
  // Estado para almacenar el rango de fechas seleccionado
  const [date, setDate] = useState<DateRange>({
    startDate: initialRange?.startDate || new Date(),
    endDate: initialRange?.endDate || new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  // Estado para controlar si estamos seleccionando la fecha de llegada o salida
  const [selectionMode, setSelectionMode] = useState<'llegada' | 'salida'>('llegada');
  
  // Estado para controlar si el calendario está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Calcula la duración de la estadía en noches
  const nightsCount = differenceInDays(date.endDate, date.startDate);

  // Efecto que notifica al componente padre cuando cambia el rango de fechas
  useEffect(() => {
    onChange(date);
  }, [date, onChange]);

  return (
    <div className="grid gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        {/* Botón que muestra las fechas seleccionadas y activa el popover */}
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between text-left font-normal flex flex-wrap items-center p-4"
            aria-label="Seleccionar fechas de llegada y salida"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">Llegada</span>
                  <span className="font-medium">
                    {date.startDate ? format(date.startDate, "EEE, dd MMM", { locale: es }) : "Seleccionar"}
                  </span>
                </div>
              </div>
              
              <div className="hidden sm:block text-gray-400">→</div>
              
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 sm:hidden" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">Salida</span>
                  <span className="font-medium">
                    {date.endDate ? format(date.endDate, "EEE, dd MMM", { locale: es }) : "Seleccionar"}
                  </span>
                </div>
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        
        {/* Contenido del popover que muestra el calendario */}
        <PopoverContent className="w-auto p-0 shadow-lg" align="start">
          <div className="p-3 border-b">
            <h3 className="font-medium text-center">
              {selectionMode === 'llegada' 
                ? "Selecciona tu fecha de llegada" 
                : "Selecciona tu fecha de salida"}
            </h3>
          </div>
          
          <Calendar
            mode="range"
            defaultMonth={date.startDate}
            selected={{
              from: date.startDate,
              to: date.endDate,
            }}
            onSelect={(selectedDate) => {
              // Cuando el usuario selecciona fechas en el calendario
              if (selectedDate?.from && selectedDate?.to) {
                // Selección completa de rango
                setDate({
                  startDate: selectedDate.from,
                  endDate: selectedDate.to,
                });
                setSelectionMode('llegada'); // Reiniciamos para la próxima vez
                setIsOpen(false); // Cerramos el popover
              } else if (selectedDate?.from) {
                // Solo se ha seleccionado la fecha de llegada
                setDate({
                  ...date,
                  startDate: selectedDate.from,
                });
                // Cambiamos automáticamente a modo selección de fecha de salida
                setSelectionMode('salida');
              }
            }}
            numberOfMonths={2}
            disabled={{ before: new Date() }}
            locale={es}
          />
          
          {/* Footer con información de la selección */}
          <div className="p-3 border-t bg-gray-50">
            {nightsCount > 0 && (
              <p className="text-sm text-center">
                <span className="font-medium">{nightsCount}</span> {nightsCount === 1 ? 'noche' : 'noches'} de estancia
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}