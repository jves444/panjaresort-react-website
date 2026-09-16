import React from 'react';
import { RESORT } from '../data/content';
import './Hero.css';

export default function Hero({ onBookNow }) {
  const scrollToRooms = () => {
    document.querySelector('#rooms')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home" aria-label="Hero">
      <div className="hero__bg" />
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__location">Puerto Princesa · Palawan, Philippines</p>
        <h1 className="hero__title">{RESORT.tagline}</h1>
        <p className="hero__sub">{RESORT.subTagline}</p>

        <div className="hero__badges">
          <div className="hero__badge">
            <span className="hero__stars">★★★★½</span>
            <span>{RESORT.rating} · {RESORT.review_count.toLocaleString()} reviews</span>
          </div>
          <div className="hero__badge">🍳 Free Breakfast Included</div>
          <div className="hero__badge">✅ Free Cancellation</div>
        </div>

        <div className="hero__actions">
          <button className="btn btn--primary btn--lg" onClick={onBookNow}>
            Book Your Stay
          </button>
          <button className="btn btn--ghost btn--lg" onClick={scrollToRooms}>
            See Rooms
          </button>
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
