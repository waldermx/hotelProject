export type Amenity = 
  | "Free WiFi" 
  | "Air conditioning" 
  | "Minibar" 
  | "Sea View" 
  | "Mountain View" 
  | "Balcony" 
  | "TV" 
  | "Coffee Machine";

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: Amenity[];
  images: string[];
}

export interface BookingFormData {
  roomId: string;
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}