import React, { useState } from 'react';
import { formatPHP } from '../utils/booking';
import './RoomCard.css';

export default function RoomCard({ room, onBook }) {
  const [open, setOpen] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  const openDetail = () => { setOpen(true); document.body.classList.add('modal-open'); };
  const closeDetail = () => { setOpen(false); document.body.classList.remove('modal-open'); };

  return (
    <>
      {/* ── CARD ── */}
      <article className="room-card" onClick={openDetail} tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && openDetail()}
        role="button" aria-label={`View details for ${room.name}`}>
        <div className="room-card__img-wrap">
          <img src={room.image} alt={room.name} loading="lazy" />
          {room.badge && <span className="room-card__badge">{room.badge}</span>}
        </div>
        <div className="room-card__body">
          <h3 className="room-card__name">{room.name}</h3>
          <p className="room-card__tagline">{room.tagline}</p>
          <div className="room-card__meta">
            <span className="room-card__guests">👥 Up to {room.capacity} guests</span>
          </div>
          <div className="room-card__footer">
            <div className="room-card__price">
              <strong>{formatPHP(room.price)}</strong>
              <span>/ night · incl. breakfast</span>
            </div>
            <span className="room-card__cta">View details</span>
          </div>
        </div>
      </article>

      {/* ── DETAIL MODAL ── */}
      {open && (
        <div className="room-modal__overlay" onClick={e => e.target === e.currentTarget && closeDetail()}>
          <div className="room-modal" role="dialog" aria-modal="true" aria-label={room.name}>
            <button className="room-modal__close" onClick={closeDetail} aria-label="Close">✕</button>

            {/* Gallery */}
            <div className="room-modal__gallery">
              <img src={room.gallery[imgIdx]} alt={`${room.name} view ${imgIdx + 1}`} />
              {room.gallery.length > 1 && (
                <div className="room-modal__thumbs">
                  {room.gallery.map((src, i) => (
                    <button key={i}
                      className={`room-modal__thumb ${i === imgIdx ? 'active' : ''}`}
                      onClick={() => setImgIdx(i)}
                      aria-label={`Photo ${i + 1}`}>
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="room-modal__info">
              {room.badge && <span className="room-card__badge room-card__badge--inline">{room.badge}</span>}
              <h2 className="room-modal__name">{room.name}</h2>
              <p className="room-modal__tagline">{room.tagline}</p>
              <p className="room-modal__desc">{room.description}</p>

              <div className="room-modal__includes">
                {room.includes.map(item => (
                  <span key={item} className="room-modal__tag">✓ {item}</span>
                ))}
              </div>

              <h4 className="room-modal__details-title">Room details</h4>
              <ul className="room-modal__details">
                {room.details.map(d => <li key={d}>{d}</li>)}
              </ul>

              <div className="room-modal__book-bar">
                <div className="room-modal__price">
                  <strong>{formatPHP(room.price)}</strong>
                  <span>per night · breakfast included</span>
                </div>
                <button className="btn btn--primary btn--lg"
                  onClick={() => { closeDetail(); onBook(room); }}>
                  Reserve this room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
