import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

const ADMIN_EMAILS = [
  'admin@luxstay.com',
  'admin@example.com',
];

const Admin = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { hotels, bookings, addHotel, updateBooking, deleteHotel } = useApp();
  const [addHotelDialogOpen, setAddHotelDialogOpen] = useState(false);

  // Check if current user is admin
  const isAdmin = currentUser && ADMIN_EMAILS.includes(currentUser.email || '');

  if (!currentUser || !isAdmin) {
    navigate('/');
    return null;
  }

  const handleAddHotel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const amenities = (formData.get('amenities') as string).split(',').map(a => a.trim());
    const images = (formData.get('images') as string).split(',').map(i => i.trim());

    addHotel({
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      description: formData.get('description') as string,
      roomType: formData.get('roomType') as string,
      capacity: Number(formData.get('capacity')),
      price: Number(formData.get('price')),
      images,
      amenities,
      rating: 0,
      reviewCount: 0,
      available: true,
    });

    setAddHotelDialogOpen(false);
    toast.success('Hotel added successfully!');
  };

  const handleApproveBooking = (id: string) => {
    updateBooking(id, { status: 'confirmed' });
    toast.success('Booking confirmed!');
  };

  const handleCancelBooking = (id: string) => {
    updateBooking(id, { status: 'cancelled' });
    toast.success('Booking cancelled!');
  };

  const handleDeleteHotel = (id: string) => {
    if (confirm('Are you sure you want to delete this hotel?')) {
      deleteHotel(id);
      toast.success('Hotel deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Badge variant="secondary" className="text-base px-4 py-2">
            Admin
          </Badge>
        </div>

        <Tabs defaultValue="hotels" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hotels">Hotels Management</TabsTrigger>
            <TabsTrigger value="bookings">Bookings Management</TabsTrigger>
          </TabsList>

          <TabsContent value="hotels" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">All Hotels</h2>
                  <p className="text-muted-foreground">{hotels.length} properties</p>
                </div>
                <Dialog open={addHotelDialogOpen} onOpenChange={setAddHotelDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Hotel
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Hotel</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddHotel} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Hotel Name</Label>
                          <Input id="name" name="name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" name="location" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" rows={3} required />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="roomType">Room Type</Label>
                          <Input id="roomType" name="roomType" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="capacity">Capacity</Label>
                          <Input id="capacity" name="capacity" type="number" min="1" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Price per Night (R)</Label>
                          <Input id="price" name="price" type="number" min="0" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="images">Image URLs (comma-separated)</Label>
                        <Textarea
                          id="images"
                          name="images"
                          rows={2}
                          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                        <Textarea
                          id="amenities"
                          name="amenities"
                          rows={2}
                          placeholder="Free WiFi, Pool, Gym, Restaurant"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">Add Hotel</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {hotels.map((hotel) => (
                  <Card key={hotel.id} className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-full md:w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{hotel.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{hotel.location}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{hotel.roomType}</Badge>
                          <Badge variant="outline">R{hotel.price.toLocaleString()}/night</Badge>
                          <Badge variant="outline">{hotel.capacity} guests</Badge>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteHotel(hotel.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">All Bookings</h2>
                <p className="text-muted-foreground">{bookings.length} total bookings</p>
              </div>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="p-4">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{booking.hotelName}</h3>
                            <p className="text-sm text-muted-foreground">{booking.roomType}</p>
                          </div>
                          <Badge
                            variant={
                              booking.status === 'confirmed'
                                ? 'default'
                                : booking.status === 'pending'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-2 text-sm">
                          <p><span className="text-muted-foreground">Guest:</span> {booking.userName}</p>
                          <p><span className="text-muted-foreground">Email:</span> {booking.userEmail}</p>
                          <p><span className="text-muted-foreground">Check-in:</span> {new Date(booking.checkIn).toLocaleDateString()}</p>
                          <p><span className="text-muted-foreground">Check-out:</span> {new Date(booking.checkOut).toLocaleDateString()}</p>
                          <p><span className="text-muted-foreground">Guests:</span> {booking.guests}</p>
                          <p><span className="text-muted-foreground">Total:</span> R{booking.totalPrice.toLocaleString()}</p>
                        </div>
                      </div>

                      {booking.status === 'pending' && (
                        <div className="flex lg:flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveBooking(booking.id)}
                            className="flex-1 lg:flex-none"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="flex-1 lg:flex-none"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
