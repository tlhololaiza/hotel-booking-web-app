import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { HotelCard } from '@/components/hotels/HotelCard/HotelCard';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const navigate = useNavigate();
  const { currentUser, hotels } = useApp();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const favoriteHotels = hotels.filter(h => currentUser.favorites.includes(h.id));

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
          <p className="text-muted-foreground">
            {favoriteHotels.length} saved properties
          </p>
        </div>

        {favoriteHotels.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring and save your favorite hotels
            </p>
            <Button onClick={() => navigate('/hotels')}>Browse Hotels</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
