import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, MapPin, Users, Heart, Calendar, Check } from 'lucide-react';
import { toast } from 'sonner';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hotels, reviews, addReview, addBooking, currentUser, toggleFavorite } = useApp();
  
  const hotel = hotels.find(h => h.id === id);
  const hotelReviews = reviews.filter(r => r.hotelId === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  if (!hotel) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Hotel not found</h2>
        <Button onClick={() => navigate('/hotels')}>Back to Hotels</Button>
      </div>
    );
  }

  const isFavorite = currentUser?.favorites.includes(hotel.id) || false;

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const checkIn = formData.get('checkIn') as string;
    const checkOut = formData.get('checkOut') as string;
    const guests = Number(formData.get('guests'));

    const days = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    );

    addBooking({
      hotelId: hotel.id,
      hotelName: hotel.name,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      checkIn,
      checkOut,
      guests,
      totalPrice: hotel.price * days,
      roomType: hotel.roomType,
    });

    setBookingDialogOpen(false);
    toast.success('Booking submitted successfully!');
    navigate('/profile?tab=bookings');
  };

  const handleReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const formData = new FormData(e.currentTarget);
    addReview({
      hotelId: hotel.id,
      userId: currentUser.id,
      userName: currentUser.name,
      rating: Number(formData.get('rating')),
      comment: formData.get('comment') as string,
    });

    setReviewDialogOpen(false);
    toast.success('Review submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Image Gallery */}
      <div className="relative h-[500px] bg-black">
        <img
          src={hotel.images[selectedImage]}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {hotel.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                selectedImage === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Card className="p-6 md:p-8 shadow-elegant">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{hotel.name}</h1>
                <button
                  onClick={() => {
                    if (currentUser) {
                      toggleFavorite(hotel.id);
                    } else {
                      navigate('/login');
                    }
                  }}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
                </button>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{hotel.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium text-foreground">{hotel.rating}</span>
                  <span>({hotel.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-primary mb-2">
                R{hotel.price.toLocaleString()}
                <span className="text-base text-muted-foreground font-normal">/night</span>
              </div>
              <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full md:w-auto">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book {hotel.name}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleBooking} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkIn">Check-in Date</Label>
                      <Input id="checkIn" name="checkIn" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkOut">Check-out Date</Label>
                      <Input id="checkOut" name="checkOut" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input
                        id="guests"
                        name="guests"
                        type="number"
                        min="1"
                        max={hotel.capacity}
                        defaultValue="2"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Confirm Booking</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{hotel.description}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Capacity</h4>
                  <p className="text-sm text-muted-foreground">Up to {hotel.capacity} guests</p>
                </Card>
                <Card className="p-4">
                  <Badge className="mb-2">{hotel.roomType}</Badge>
                  <h4 className="font-semibold mb-1">Room Type</h4>
                  <p className="text-sm text-muted-foreground">Premium accommodation</p>
                </Card>
                <Card className="p-4">
                  <Star className="h-8 w-8 text-accent mb-2 fill-accent" />
                  <h4 className="font-semibold mb-1">Rating</h4>
                  <p className="text-sm text-muted-foreground">{hotel.rating} out of 5</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="amenities">
              <div className="grid md:grid-cols-2 gap-3">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Guest Reviews</h3>
                <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Write a Review</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Write a Review</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleReview} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="rating">Rating (1-5)</Label>
                        <Input
                          id="rating"
                          name="rating"
                          type="number"
                          min="1"
                          max="5"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comment">Your Review</Label>
                        <Textarea
                          id="comment"
                          name="comment"
                          rows={4}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">Submit Review</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {hotelReviews.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                <div className="space-y-4">
                  {hotelReviews.map((review) => (
                    <Card key={review.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{review.userName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="font-medium">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default HotelDetails;
