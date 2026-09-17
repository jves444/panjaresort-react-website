import React, { useState, useEffect } from 'react';
import { RESORT } from '../data/content';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Rooms', href: '#rooms' },
  { label: 'Dining', href: '#dining' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Reviews', href: '#reviews' },
   { label: 'Blog', href: '#blog' },
  { label: 'Location', href: '#location' },
 
];

export default function Navbar({ onBookNow }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} aria-label="Site navigation">
      <a href="#home" className="navbar__brand" onClick={() => handleNavClick('#home')}>
        <span className="navbar__brand-main">Panja</span>
        <span className="navbar__brand-sub">Resort Palawan</span>
      </a>

      <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <button className="navbar__link" onClick={() => handleNavClick(link.href)}>
              {link.label}
            </button>
          </li>
        ))}
        <li className="navbar__mobile-cta">
          <button className="btn btn--primary" onClick={() => { setMenuOpen(false); onBookNow(); }}>
            Book Now
          </button>
        </li>
      </ul>

      <button
        className="btn btn--primary navbar__cta"
        onClick={onBookNow}
        aria-label="Open booking form"
      >
        Book Now
      </button>

      <button
        className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}
