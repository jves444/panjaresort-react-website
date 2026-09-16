import React from 'react';
import { RESORT } from '../data/content';
import './Footer.css';

export default function Footer({ onBookNow }) {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__cta-band">
        <div className="footer__cta-content">
          <h2 className="footer__cta-title">Ready for your Palawan escape?</h2>
          <p className="footer__cta-sub">Free breakfast · Free cancellation · Direct booking discount</p>
        </div>
        <button className="btn btn--primary btn--lg" onClick={onBookNow}>
          Book direct & save
        </button>
      </div>

      <div className="footer__main">
        <div className="footer__brand">
          <div className="footer__logo">Panja</div>
          <div className="footer__logo-sub">Resort Palawan</div>
          <p className="footer__tagline">{RESORT.ownerQuote}</p>
          <div className="footer__socials">
            <a href={RESORT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href={RESORT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Stay</h4>
          <ul>
            <li><button onClick={() => scrollTo('#rooms')}>Standard Double</button></li>
            <li><button onClick={() => scrollTo('#rooms')}>Deluxe Twin</button></li>
            <li><button onClick={() => scrollTo('#rooms')}>Sea View Suite</button></li>
            <li><button onClick={() => scrollTo('#rooms')}>Triple Room</button></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Resort</h4>
          <ul>
            <li><button onClick={() => scrollTo('#dining')}>Horizon Restaurant</button></li>
            <li><button onClick={() => scrollTo('#dining')}>360 Rooftop Bar</button></li>
            <li><button onClick={() => scrollTo('#amenities')}>Infinity Pool</button></li>
            <li><button onClick={() => scrollTo('#amenities')}>Prana Spa</button></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul>
            <li><a href={`tel:${RESORT.phone}`}>{RESORT.phone}</a></li>
            <li><a href={`mailto:${RESORT.email}`}>{RESORT.email}</a></li>
            <li><button onClick={() => scrollTo('#location')}>Get directions</button></li>
            <li>
              <a href={RESORT.facebook} target="_blank" rel="noopener noreferrer">
                Facebook Page
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} {RESORT.name} · {RESORT.address}</p>
        <p>Check-in {RESORT.checkin} · Check-out {RESORT.checkout}</p>
      </div>
    </footer>
  );
}
