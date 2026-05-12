import { Hotel, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-section">
            <div className="footer-brand">
              <Hotel className="h-8 w-8 text-primary" />
              <span className="footer-brand-text">LuxStay</span>
            </div>
            <p className="footer-description">
              Your trusted partner for luxury accommodations worldwide. Book with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/hotels">Browse Hotels</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <Mail className="h-4 w-4" />
                <span>support@luxstay.com</span>
              </li>
              <li>
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <MapPin className="h-4 w-4" />
                <span>123 Hotel Street, NY 10001</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3 className="footer-heading">Newsletter</h3>
            <p className="footer-newsletter-text">
              Subscribe to get special offers and updates.
            </p>
            <div className="footer-newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                className="footer-newsletter-input"
              />
              <button className="footer-newsletter-button">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 LuxStay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
