import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (filters: any) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch({
      location: formData.get('location'),
      checkIn: formData.get('checkIn'),
      checkOut: formData.get('checkOut'),
      guests: formData.get('guests'),
    });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar-field">
        <MapPin className="search-bar-icon" />
        <Input
          name="location"
          placeholder="Where are you going?"
          className="search-bar-input"
        />
      </div>

      <div className="search-bar-field">
        <Calendar className="search-bar-icon" />
        <Input
          name="checkIn"
          type="date"
          placeholder="Check-in"
          className="search-bar-input"
        />
      </div>

      <div className="search-bar-field">
        <Calendar className="search-bar-icon" />
        <Input
          name="checkOut"
          type="date"
          placeholder="Check-out"
          className="search-bar-input"
        />
      </div>

      <div className="search-bar-field">
        <Users className="search-bar-icon" />
        <Input
          name="guests"
          type="number"
          min="1"
          defaultValue="2"
          placeholder="Guests"
          className="search-bar-input"
        />
      </div>

      <Button type="submit" size="lg" className="search-bar-button">
        <Search className="h-5 w-5 mr-2" />
        Search
      </Button>
    </form>
  );
};
