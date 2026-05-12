import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { HotelCard } from '@/components/hotels/HotelCard/HotelCard';
import { SearchBar } from '@/components/search/SearchBar/SearchBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';

const Hotels = () => {
  const { hotels } = useApp();
  const location = useLocation();
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 10000,
    roomType: 'all',
    rating: 0,
  });

  useEffect(() => {
    if (location.state?.filters) {
      setFilters({ ...filters, ...location.state.filters });
    }
  }, [location.state]);

  useEffect(() => {
    let result = hotels;

    if (filters.location) {
      result = result.filter(h =>
        h.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    result = result.filter(h =>
      h.price >= filters.minPrice && h.price <= filters.maxPrice
    );

    if (filters.roomType !== 'all') {
      result = result.filter(h => h.roomType === filters.roomType);
    }

    if (filters.rating > 0) {
      result = result.filter(h => h.rating >= filters.rating);
    }

    setFilteredHotels(result);
  }, [filters, hotels]);

  const handleSearch = (searchFilters: any) => {
    setFilters({ ...filters, ...searchFilters });
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: 0,
      maxPrice: 10000,
      roomType: 'all',
      rating: 0,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Bar */}
      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-20 space-y-6 bg-card border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Search location..."
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <Label>Price Range</Label>
                <div className="px-2">
                  <Slider
                    min={0}
                    max={10000}
                    step={250}
                    value={[filters.minPrice, filters.maxPrice]}
                    onValueChange={([min, max]) =>
                      setFilters({ ...filters, minPrice: min, maxPrice: max })
                    }
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>R{filters.minPrice}</span>
                  <span>R{filters.maxPrice}</span>
                </div>
              </div>

              {/* Room Type */}
              <div className="space-y-2">
                <Label>Room Type</Label>
                <Select
                  value={filters.roomType}
                  onValueChange={(value) => setFilters({ ...filters, roomType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Deluxe Suite">Deluxe Suite</SelectItem>
                    <SelectItem value="Ocean View Room">Ocean View Room</SelectItem>
                    <SelectItem value="Mountain View Cabin">Mountain View Cabin</SelectItem>
                    <SelectItem value="King Suite">King Suite</SelectItem>
                    <SelectItem value="Beachfront Villa">Beachfront Villa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>Minimum Rating</Label>
                <Select
                  value={filters.rating.toString()}
                  onValueChange={(value) => setFilters({ ...filters, rating: Number(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">All Ratings</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.8">4.8+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          {/* Hotels Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Available Hotels</h2>
                <p className="text-muted-foreground">
                  {filteredHotels.length} properties found
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {filteredHotels.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No hotels found matching your criteria
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
