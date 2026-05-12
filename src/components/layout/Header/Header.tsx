import { Link, useNavigate } from 'react-router-dom';
import { Hotel, User, Bell, Heart, LogOut, Menu, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import './Header.css';

export const Header = () => {
  const { currentUser, logout, notifications } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read && n.userId === currentUser?.id).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <Hotel className="h-8 w-8 text-primary" />
          <span className="header-logo-text">LuxStay</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav-desktop">
          <Link to="/hotels" className="header-nav-link">
            Hotels
          </Link>
          {currentUser?.role === 'admin' && (
            <Link to="/admin" className="header-nav-link">
              Admin Panel
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="header-actions-desktop">
          {currentUser ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/notifications')}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="notification-badge">
                    {unreadCount}
                  </Badge>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/favorites')}>
                    <Heart className="mr-2 h-4 w-4" />
                    Favorites
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')}>
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="header-mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="header-mobile-menu">
          <Link to="/hotels" className="header-mobile-link" onClick={() => setMobileMenuOpen(false)}>
            Hotels
          </Link>
          {currentUser?.role === 'admin' && (
            <Link to="/admin" className="header-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Admin Panel
            </Link>
          )}
          {currentUser ? (
            <>
              <Link to="/profile" className="header-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </Link>
              <Link to="/favorites" className="header-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Favorites
              </Link>
              <Link to="/notifications" className="header-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Notifications {unreadCount > 0 && `(${unreadCount})`}
              </Link>
              <button className="header-mobile-link text-left w-full" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="header-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
