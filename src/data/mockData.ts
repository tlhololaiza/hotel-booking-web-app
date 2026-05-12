import { Hotel, Booking, Review } from '@/types';

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Table Bay Grand Hotel',
    location: 'Cape Town, Western Cape',
    description: 'Luxurious 5-star hotel at the V&A Waterfront with stunning Table Mountain views and world-class amenities.',
    roomType: 'Deluxe Suite',
    capacity: 2,
    price: 4500,
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'],
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service'],
    rating: 4.8,
    reviewCount: 234,
    available: true
  },
  {
    id: '2',
    name: 'Umhlanga Seaside Resort',
    location: 'Umhlanga, KwaZulu-Natal',
    description: 'Beautiful beachfront resort along the Indian Ocean with private beach access and ocean-view rooms.',
    roomType: 'Ocean View Room',
    capacity: 4,
    price: 3200,
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'],
    amenities: ['Beach Access', 'Free WiFi', 'Restaurant', 'Bar', 'Gym'],
    rating: 4.9,
    reviewCount: 189,
    available: true
  },
  {
    id: '3',
    name: 'Drakensberg Mountain Lodge',
    location: 'Drakensberg, KwaZulu-Natal',
    description: 'Cozy mountain retreat in the Drakensberg, perfect for hiking and nature lovers.',
    roomType: 'Mountain View Cabin',
    capacity: 6,
    price: 2800,
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
    amenities: ['Hiking Trails', 'Fireplace', 'Hot Tub', 'Restaurant', 'Free WiFi'],
    rating: 4.7,
    reviewCount: 156,
    available: true
  },
  {
    id: '4',
    name: 'Sandton Urban Boutique',
    location: 'Sandton, Johannesburg',
    description: 'Modern boutique hotel in the heart of Sandton CBD with chic interior design.',
    roomType: 'King Suite',
    capacity: 2,
    price: 2400,
    images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800'],
    amenities: ['Free WiFi', 'Rooftop Bar', 'Gym', 'Business Center'],
    rating: 4.6,
    reviewCount: 98,
    available: true
  },
  {
    id: '5',
    name: 'Kruger Safari Lodge',
    location: 'Kruger National Park, Mpumalanga',
    description: 'Exclusive safari lodge bordering the Kruger with daily game drives and luxury tented suites.',
    roomType: 'Safari Villa',
    capacity: 4,
    price: 6800,
    images: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800', 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800'],
    amenities: ['Game Drives', 'Infinity Pool', 'Spa', 'Restaurant', 'Guided Bush Walks', 'Free WiFi'],
    rating: 5.0,
    reviewCount: 312,
    available: true
  },
  {
    id: '6',
    name: 'Stellenbosch Wine Estate Inn',
    location: 'Stellenbosch, Western Cape',
    description: 'Charming Cape Dutch inn set among the vineyards of the Cape Winelands.',
    roomType: 'Heritage Room',
    capacity: 2,
    price: 1900,
    images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'],
    amenities: ['Free WiFi', 'Breakfast Included', 'Wine Tastings', 'Garden'],
    rating: 4.5,
    reviewCount: 145,
    available: true
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    hotelId: '1',
    hotelName: 'Table Bay Grand Hotel',
    userId: 'user1',
    userName: 'Thabo Mokoena',
    userEmail: 'thabo@example.co.za',
    checkIn: '2026-06-15',
    checkOut: '2026-06-18',
    guests: 2,
    totalPrice: 13500,
    status: 'confirmed',
    roomType: 'Deluxe Suite',
    createdAt: '2026-05-01T10:30:00Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    hotelId: '1',
    userId: 'user1',
    userName: 'Thabo Mokoena',
    rating: 5,
    comment: 'Amazing stay at the Waterfront! The staff was incredibly helpful and the Table Mountain views were unforgettable.',
    date: '2026-04-20T14:30:00Z'
  },
  {
    id: 'r2',
    hotelId: '1',
    userId: 'user2',
    userName: 'Lerato Dlamini',
    rating: 4,
    comment: 'Great location and beautiful views. Only minor issue was the checkout time being a bit early.',
    date: '2026-04-18T09:15:00Z'
  },
  {
    id: 'r3',
    hotelId: '2',
    userId: 'user3',
    userName: 'Sipho Naidoo',
    rating: 5,
    comment: 'Perfect beachfront location in Umhlanga! Waking up to Indian Ocean views was magical.',
    date: '2026-04-10T16:45:00Z'
  }
];
