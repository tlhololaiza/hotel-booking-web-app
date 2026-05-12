import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Hotel, Booking, User, Review, Notification } from '@/types';
import { mockHotels, mockBookings, mockReviews } from '@/data/mockData';

interface AppContextType {
  // Hotels
  hotels: Hotel[];
  addHotel: (hotel: Omit<Hotel, 'id'>) => void;
  updateHotel: (id: string, hotel: Partial<Hotel>) => void;
  deleteHotel: (id: string) => void;
  
  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
  
  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  
  // User
  currentUser: User | null;
  login: (email: string, password: string, role?: 'user' | 'admin') => boolean;
  logout: () => void;
  updateUserProfile: (user: Partial<User>) => void;
  toggleFavorite: (hotelId: string) => void;
  
  // Notifications
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Hotels
  const addHotel = (hotel: Omit<Hotel, 'id'>) => {
    const newHotel = { ...hotel, id: Date.now().toString() };
    setHotels([...hotels, newHotel]);
  };

  const updateHotel = (id: string, hotel: Partial<Hotel>) => {
    setHotels(hotels.map(h => h.id === id ? { ...h, ...hotel } : h));
  };

  const deleteHotel = (id: string) => {
    setHotels(hotels.filter(h => h.id !== id));
  };

  // Bookings
  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setBookings([...bookings, newBooking]);
    
    addNotification({
      userId: booking.userId,
      title: 'Booking Confirmation',
      message: `Your booking at ${booking.hotelName} has been received and is pending confirmation.`,
      type: 'booking'
    });
  };

  const updateBooking = (id: string, booking: Partial<Booking>) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, ...booking } : b));
  };

  const cancelBooking = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b));
  };

  // Reviews
  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview = { 
      ...review, 
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setReviews([...reviews, newReview]);
    
    // Update hotel rating
    const hotelReviews = [...reviews, newReview].filter(r => r.hotelId === review.hotelId);
    const avgRating = hotelReviews.reduce((sum, r) => sum + r.rating, 0) / hotelReviews.length;
    updateHotel(review.hotelId, { 
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: hotelReviews.length 
    });
  };

  // User
  const login = (email: string, password: string, role: 'user' | 'admin' = 'user'): boolean => {
    // Mock login - in real app, this would call an API
    const user: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      role,
      favorites: []
    };
    setCurrentUser(user);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserProfile = (user: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...user });
    }
  };

  const toggleFavorite = (hotelId: string) => {
    if (currentUser) {
      const favorites = currentUser.favorites.includes(hotelId)
        ? currentUser.favorites.filter(id => id !== hotelId)
        : [...currentUser.favorites, hotelId];
      setCurrentUser({ ...currentUser, favorites });
    }
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false
    };
    setNotifications([...notifications, newNotification]);
  };

  return (
    <AppContext.Provider value={{
      hotels,
      addHotel,
      updateHotel,
      deleteHotel,
      bookings,
      addBooking,
      updateBooking,
      cancelBooking,
      reviews,
      addReview,
      currentUser,
      login,
      logout,
      updateUserProfile,
      toggleFavorite,
      notifications,
      markNotificationAsRead,
      addNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
