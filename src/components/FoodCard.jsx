import React, { useState } from 'react';
import './FoodCard.css';

export default function FoodCard({ item }) {
  const [open, setOpen] = useState(false);

  const openDetail = () => { setOpen(true); document.body.classList.add('modal-open'); };
  const closeDetail = () => { setOpen(false); document.body.classList.remove('modal-open'); };

  return (
    <>
      {/* ── CARD ── */}
      <article className="food-card" onClick={openDetail} tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && openDetail()}
        role="button" aria-label={`View details for ${item.name}`}>
        <div className="food-card__img-wrap">
          <img src={item.image} alt={item.name} loading="lazy" />
          <span className="food-card__category">{item.category}</span>
        </div>
        <div className="food-card__body">
          <h3 className="food-card__name">{item.name}</h3>
          <p className="food-card__tagline">{item.tagline}</p>
          <div className="food-card__footer">
            <span className="food-card__hours">🕐 {item.hours}</span>
            <span className="food-card__cta">See menu</span>
          </div>
        </div>
      </article>

      {/* ── DETAIL MODAL ── */}
      {open && (
        <div className="food-modal__overlay" onClick={e => e.target === e.currentTarget && closeDetail()}>
          <div className="food-modal" role="dialog" aria-modal="true" aria-label={item.name}>
            <button className="food-modal__close" onClick={closeDetail} aria-label="Close">✕</button>

            <div className="food-modal__img">
              <img src={item.image} alt={item.name} />
              <span className="food-card__category">{item.category}</span>
            </div>

            <div className="food-modal__info">
              <h2 className="food-modal__name">{item.name}</h2>
              <p className="food-modal__tagline">{item.tagline}</p>
              <p className="food-modal__desc">{item.description}</p>

              <div className="food-modal__meta">
                <div className="food-modal__meta-item">
                  <span className="food-modal__meta-label">Hours</span>
                  <span>{item.hours}</span>
                </div>
                <div className="food-modal__meta-item">
                  <span className="food-modal__meta-label">Price range</span>
                  <span>{item.price}</span>
                </div>
              </div>

              <h4 className="food-modal__highlights-title">Highlights</h4>
              <ul className="food-modal__highlights">
                {item.highlights.map(h => (
                  <li key={h}><span className="food-modal__check">✓</span>{h}</li>
                ))}
              </ul>

              <button className="btn btn--outline btn--full" onClick={closeDetail}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
