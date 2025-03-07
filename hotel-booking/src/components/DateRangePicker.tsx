"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { format, differenceInDays, addDays } from "date-fns";
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

  // Manejar la selección de fecha
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    
    if (selectionMode === 'llegada') {
      // Si la fecha seleccionada es la de llegada
      const newEndDate = date.endDate < selectedDate ? addDays(selectedDate, 1) : date.endDate;
      
      setDate({
        startDate: selectedDate,
        endDate: newEndDate,
      });
      setSelectionMode('salida');
    } else {
      // Si la fecha seleccionada es la de salida
      if (selectedDate <= date.startDate) {
        // No permitimos fechas de salida anteriores o iguales a la llegada
        setDate({
          ...date,
          endDate: addDays(date.startDate, 1),
        });
      } else {
        setDate({
          ...date,
          endDate: selectedDate,
        });
      }
    }
  };

  // Función para aceptar la selección y cerrar el calendario
  const handleAccept = () => {
    setIsOpen(false);
    setSelectionMode('llegada'); // Reinicia para la próxima apertura
  };

  return (
    <div className="grid gap-2">
      <Popover open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          // Al abrir el popover, comenzamos por seleccionar la fecha de llegada
          setSelectionMode('llegada');
        }
      }}>
        {/* Botón que muestra las fechas seleccionadas y activa el popover */}
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-center text-center font-normal p-3 h-[52px]"
            aria-label="Seleccionar fechas de llegada y salida"
          >
            <div className="flex items-center justify-center w-full gap-1 sm:gap-2">
              <div className={`flex items-center ${isOpen && selectionMode === 'llegada' ? 'bg-primary/10 rounded-md px-1 py-0.5' : ''}`}>
                <CalendarIcon className="mr-1 h-3 w-3" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-medium">Llegada</span>
                  <span className="text-xs font-medium">
                    {date.startDate ? format(date.startDate, "dd MMM", { locale: es }) : "Seleccionar"}
                  </span>
                </div>
              </div>
              
              <div className="text-gray-400 text-xs">→</div>
              
              <div className={`flex items-center ${isOpen && selectionMode === 'salida' ? 'bg-primary/10 rounded-md px-1 py-0.5' : ''}`}>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-medium">Salida</span>
                  <span className="text-xs font-medium">
                    {date.endDate ? format(date.endDate, "dd MMM", { locale: es }) : "Seleccionar"}
                  </span>
                </div>
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        
        {/* Contenido del popover que muestra el calendario */}
        <PopoverContent className="w-auto p-0 shadow-lg" align="center">
          {/* Instrucciones de selección - más compactas */}
          <div className="p-2 border-b bg-primary/5">
            <h3 className="text-sm font-medium text-center flex items-center justify-center gap-1">
              {selectionMode === 'llegada' ? (
                <>
                  <span className="inline-flex items-center justify-center w-4 h-4 bg-primary text-white rounded-full text-[10px]">1</span>
                  Fecha de llegada
                </>
              ) : (
                <>
                  <span className="inline-flex items-center justify-center w-4 h-4 bg-primary text-white rounded-full text-[10px]">2</span>
                  Fecha de salida
                </>
              )}
            </h3>
          </div>
          
          {/* Calendario más pequeño */}
          <Calendar
            mode="single"
            selected={selectionMode === 'llegada' ? date.startDate : date.endDate}
            onSelect={(selected) => handleDateSelect(selected || undefined)}
            numberOfMonths={1}
            disabled={{ 
              before: new Date(),
              // Si estamos seleccionando fecha de salida, deshabilitar fechas anteriores a la llegada
              ...(selectionMode === 'salida' && { before: addDays(date.startDate, 0) })
            }}
            locale={es}
            classNames={{
              day_range_middle: "bg-primary/20",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              head_cell: "text-xs font-medium",
              caption: "text-sm",
              cell: "text-xs p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
              day: "h-7 w-7 text-xs p-0 aria-selected:opacity-100"
            }}
          />
          
          {/* Visualización compacta del rango seleccionado */}
          <div className="p-1 border-t bg-primary/5 text-xs">
            <div className="flex items-center justify-center">
              <span className="font-medium">{format(date.startDate, "dd MMM", { locale: es })}</span>
              <span className="mx-1">→</span>
              <span className="font-medium">{format(date.endDate, "dd MMM", { locale: es })}</span>
              <span className="ml-1 px-1.5 py-0.5 bg-primary/10 rounded-full text-[10px]">
                {nightsCount} {nightsCount === 1 ? 'noche' : 'noches'}
              </span>
            </div>
          </div>
          
          {/* Footer más compacto */}
          <div className="p-2 border-t bg-gray-50 flex flex-col gap-1">
            {/* Botón de aceptar */}
            <Button 
              onClick={handleAccept}
              className="w-full h-8 text-xs"
              size="sm"
            >
              Aceptar
            </Button>
            
            {/* Mensajes de ayuda más compactos */}
            {selectionMode === 'llegada' ? (
              <div className="text-[10px] text-center text-amber-600 flex items-center justify-center gap-1">
                <AlertCircle className="h-2.5 w-2.5" />
                Selecciona fecha de llegada
              </div>
            ) : (
              <div className="text-[10px] text-center text-blue-600 flex items-center justify-center gap-1">
                <AlertCircle className="h-2.5 w-2.5" />
                Selecciona fecha de salida
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}