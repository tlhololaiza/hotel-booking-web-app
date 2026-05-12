import { SearchBar } from '@/components/search/SearchBar/SearchBar';
import { HotelCard } from '@/components/hotels/HotelCard/HotelCard';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Star, Shield, HeadphonesIcon } from 'lucide-react';
import heroImage from '@/assets/hero-hotel.jpg';

const Home = () => {
  const { hotels } = useApp();
  const navigate = useNavigate();
  const featuredHotels = hotels.slice(0, 3);

  const handleSearch = (filters: any) => {
    navigate('/hotels', { state: { filters } });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Luxury hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 animate-slide-up">
            Discover luxury accommodations worldwide
          </p>

          <div className="max-w-5xl mx-auto animate-scale-in">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose LuxStay?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Selection</h3>
              <p className="text-muted-foreground">
                Handpicked luxury hotels and resorts from around the world
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-muted-foreground">
                Safe and secure payment processing for your peace of mind
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                <HeadphonesIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Round-the-clock customer service to assist with your needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Featured Hotels
              </h2>
              <p className="text-muted-foreground">
                Discover our most popular destinations
              </p>
            </div>
            <Button onClick={() => navigate('/hotels')} variant="outline">
              View All
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of satisfied travelers who trust LuxStay
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/hotels')}
            className="text-lg px-8"
          >
            Browse Hotels
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
