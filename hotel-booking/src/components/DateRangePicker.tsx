"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DateRangePickerProps {
  onChange: (range: DateRange) => void;
  initialRange?: DateRange;
}

export default function DateRangePicker({ onChange, initialRange }: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange>({
    startDate: initialRange?.startDate || new Date(),
    endDate: initialRange?.endDate || new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onChange(date);
  }, [date, onChange]);

  return (
    <div className="grid gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal grid grid-cols-2"
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>
                {date.startDate ? format(date.startDate, "PPP", { locale: es }) : "Seleccionar"}
              </span>
            </div>
            <div className="text-center">→</div>
            <div className="text-right">
              {date.endDate ? format(date.endDate, "PPP", { locale: es }) : "Seleccionar"}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date.startDate}
            selected={{
              from: date.startDate,
              to: date.endDate,
            }}
            onSelect={(selectedDate) => {
              if (selectedDate?.from && selectedDate?.to) {
                setDate({
                  startDate: selectedDate.from,
                  endDate: selectedDate.to,
                });
                // Close the popover after selection is complete
                if (selectedDate.to) {
                  setIsOpen(false);
                }
              }
            }}
            numberOfMonths={2}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}