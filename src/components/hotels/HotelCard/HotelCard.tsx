import { Hotel } from '@/types';
import { Star, MapPin, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import './HotelCard.css';

interface HotelCardProps {
  hotel: Hotel;
}

export const HotelCard = ({ hotel }: HotelCardProps) => {
  const navigate = useNavigate();
  const { currentUser, toggleFavorite } = useApp();
  const isFavorite = currentUser?.favorites.includes(hotel.id) || false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentUser) {
      toggleFavorite(hotel.id);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="hotel-card" onClick={() => navigate(`/hotels/${hotel.id}`)}>
      <div className="hotel-card-image-wrapper">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="hotel-card-image"
        />
        <button
          className={`hotel-card-favorite ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        {!hotel.available && (
          <Badge className="hotel-card-unavailable-badge" variant="destructive">
            Unavailable
          </Badge>
        )}
      </div>

      <div className="hotel-card-content">
        <div className="hotel-card-header">
          <h3 className="hotel-card-title">{hotel.name}</h3>
          <div className="hotel-card-rating">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span>{hotel.rating}</span>
            <span className="hotel-card-review-count">({hotel.reviewCount})</span>
          </div>
        </div>

        <div className="hotel-card-location">
          <MapPin className="h-4 w-4" />
          <span>{hotel.location}</span>
        </div>

        <p className="hotel-card-description">{hotel.description}</p>

        <div className="hotel-card-details">
          <div className="hotel-card-detail-item">
            <Users className="h-4 w-4" />
            <span>{hotel.capacity} guests</span>
          </div>
          <Badge variant="secondary">{hotel.roomType}</Badge>
        </div>

        <div className="hotel-card-amenities">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {hotel.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{hotel.amenities.length - 3} more
            </Badge>
          )}
        </div>

        <div className="hotel-card-footer">
          <div className="hotel-card-price">
            <span className="hotel-card-price-amount">R{hotel.price.toLocaleString()}</span>
            <span className="hotel-card-price-period">per night</span>
          </div>
          <Button size="sm">View Details</Button>
        </div>
      </div>
    </div>
  );
};
