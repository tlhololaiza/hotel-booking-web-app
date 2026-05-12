export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  roomType: string;
  capacity: number;
  price: number;
  images: string[];
  amenities: string[];
  rating: number;
  reviewCount: number;
  available: boolean;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  userId: string;
  userName: string;
  userEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  roomType: string;
  createdAt: string;
}

export interface Review {
  id: string;
  hotelId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  favorites: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'promotion' | 'update';
  read: boolean;
  createdAt: string;
}

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  minPrice: number;
  maxPrice: number;
  roomType: string;
}
