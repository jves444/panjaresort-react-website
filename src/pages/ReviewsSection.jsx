import React from 'react';
import { REVIEWS, RESORT } from '../data/content';
import SectionHeader from '../components/SectionHeader';
import './Sections.css';

const STARS = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

export default function ReviewsSection() {
  return (
    <section className="section" id="reviews">
      <div className="section__inner">
        <div className="reviews-header">
          <SectionHeader
            eyebrow="Guest Reviews"
            title="What guests are saying"
          />
          <div className="reviews-rating">
            <span className="reviews-rating__big">{RESORT.rating}</span>
            <div>
              <div className="reviews-rating__stars">★★★★½</div>
              <div className="reviews-rating__count">{RESORT.review_count.toLocaleString()} reviews</div>
              <div className="reviews-rating__sources">Google · Tripadvisor · Trip.com</div>
            </div>
          </div>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="review-card__stars">{STARS(r.rating)}</div>
              <p className="review-card__text">"{r.text}"</p>
              <div className="review-card__meta">
                <strong>{r.name}</strong>
                <span>{r.source} · {r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
