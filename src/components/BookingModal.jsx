import React, { useState, useEffect } from 'react';
import { ROOMS } from '../data/content';
import { submitBooking, calcNights, formatPHP } from '../utils/booking';
import './BookingModal.css';

const today = () => new Date().toISOString().split('T')[0];
const tomorrow = () => {
  const d = new Date(); d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const ROOM_PRICES = Object.fromEntries(ROOMS.map(r => [r.name, r.price]));
const ROOM_NAMES = ROOMS.map(r => r.name);

const INITIAL = {
  firstName: '', lastName: '',
  email: '', phone: '',
  checkin: today(), checkout: tomorrow(),
  room: ROOM_NAMES[0],
  guests: '2',
  notes: '',
};

export default function BookingModal({ open, onClose, preselectedRoom }) {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  // Sync preselected room
  useEffect(() => {
    if (preselectedRoom) {
      setForm(f => ({ ...f, room: preselectedRoom.name }));
    }
  }, [preselectedRoom]);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, [open]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => { setStatus('idle'); setErrors({}); }, 300);
    }
  }, [open]);

  if (!open) return null;

  const nights = calcNights(form.checkin, form.checkout);
  const pricePerNight = ROOM_PRICES[form.room] || ROOM_PRICES[ROOM_NAMES[0]];
  const total = nights * pricePerNight;

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'Required';
    if (!form.lastName.trim()) errs.lastName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
    if (!form.phone.trim()) errs.phone = 'Required';
    if (!form.checkin) errs.checkin = 'Required';
    if (!form.checkout) errs.checkout = 'Required';
    if (nights <= 0) errs.checkout = 'Check-out must be after check-in';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');
    try {
      await submitBooking({
        ...form,
        nights,
        totalPrice: total,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bm" role="dialog" aria-modal="true" aria-label="Book your stay">
        <button className="bm__close" onClick={onClose} aria-label="Close booking">✕</button>

        {/* ── SUCCESS STATE ── */}
        {status === 'success' ? (
          <div className="bm__success">
            <div className="bm__success-icon">🌿</div>
            <h2>You're all set!</h2>
            <p>
              Thank you, <strong>{form.firstName}</strong>! We've received your reservation
              for <strong>{form.room}</strong> ({form.checkin} → {form.checkout}).
            </p>
            <p>
              A confirmation has been sent to <strong>{form.email}</strong>.
              Our team will follow up within a few hours.
            </p>
            <p className="bm__success-contact">
              Questions? Call <a href="tel:+639173764835">0917 376 4835</a>
            </p>
            <button className="btn btn--primary btn--full" style={{ marginTop: 24 }} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="bm__header">
              <h2 className="bm__title">Reserve your stay</h2>
              <p className="bm__subtitle">No payment now · Free cancellation · Confirmation by email</p>
            </div>

            <form className="bm__form" onSubmit={handleSubmit} noValidate>
              {/* Room & Dates */}
              <div className="bm__section-title">Stay details</div>

              <div className="bm__field bm__field--full">
                <label htmlFor="bm-room">Room type</label>
                <select id="bm-room" value={form.room} onChange={set('room')}>
                  {ROOM_NAMES.map(n => (
                    <option key={n} value={n}>{n} — {formatPHP(ROOM_PRICES[n])}/night</option>
                  ))}
                </select>
              </div>

              <div className="bm__row">
                <div className={`bm__field ${errors.checkin ? 'bm__field--error' : ''}`}>
                  <label htmlFor="bm-checkin">Check-in</label>
                  <input id="bm-checkin" type="date" value={form.checkin}
                    min={today()} onChange={set('checkin')} />
                  {errors.checkin && <span className="bm__error">{errors.checkin}</span>}
                </div>
                <div className={`bm__field ${errors.checkout ? 'bm__field--error' : ''}`}>
                  <label htmlFor="bm-checkout">Check-out</label>
                  <input id="bm-checkout" type="date" value={form.checkout}
                    min={form.checkin || today()} onChange={set('checkout')} />
                  {errors.checkout && <span className="bm__error">{errors.checkout}</span>}
                </div>
              </div>

              <div className="bm__field">
                <label htmlFor="bm-guests">Guests</label>
                <select id="bm-guests" value={form.guests} onChange={set('guests')}>
                  {['1', '2', '3', '4'].map(n => (
                    <option key={n} value={n}>{n} {n === '1' ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>

              {/* Guest Info */}
              <div className="bm__section-title" style={{ marginTop: 16 }}>Your information</div>

              <div className="bm__row">
                <div className={`bm__field ${errors.firstName ? 'bm__field--error' : ''}`}>
                  <label htmlFor="bm-fname">First name</label>
                  <input id="bm-fname" type="text" value={form.firstName}
                    onChange={set('firstName')} placeholder="Maria" />
                  {errors.firstName && <span className="bm__error">{errors.firstName}</span>}
                </div>
                <div className={`bm__field ${errors.lastName ? 'bm__field--error' : ''}`}>
                  <label htmlFor="bm-lname">Last name</label>
                  <input id="bm-lname" type="text" value={form.lastName}
                    onChange={set('lastName')} placeholder="Santos" />
                  {errors.lastName && <span className="bm__error">{errors.lastName}</span>}
                </div>
              </div>

              <div className={`bm__field ${errors.email ? 'bm__field--error' : ''}`}>
                <label htmlFor="bm-email">Email</label>
                <input id="bm-email" type="email" value={form.email}
                  onChange={set('email')} placeholder="maria@email.com" />
                {errors.email && <span className="bm__error">{errors.email}</span>}
              </div>

              <div className={`bm__field ${errors.phone ? 'bm__field--error' : ''}`}>
                <label htmlFor="bm-phone">Phone number</label>
                <input id="bm-phone" type="tel" value={form.phone}
                  onChange={set('phone')} placeholder="+63 9xx xxx xxxx" />
                {errors.phone && <span className="bm__error">{errors.phone}</span>}
              </div>

              <div className="bm__field">
                <label htmlFor="bm-notes">Special requests <span className="bm__optional">(optional)</span></label>
                <textarea id="bm-notes" value={form.notes} onChange={set('notes')} rows={3}
                  placeholder="Early check-in, dietary needs, celebration, extra bed..." />
              </div>

              {/* Price Summary */}
              <div className="bm__summary">
                <div className="bm__summary-row">
                  <span>{form.room}</span>
                  <span>{formatPHP(pricePerNight)} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                </div>
                <div className="bm__summary-row bm__summary-row--total">
                  <span>Total (incl. breakfast)</span>
                  <strong>{nights > 0 ? formatPHP(total) : '—'}</strong>
                </div>
              </div>

              {status === 'error' && (
                <p className="bm__error-banner">
                  Something went wrong. Please try again or call us at 0917 376 4835.
                </p>
              )}

              <button type="submit" className="btn btn--primary btn--full btn--lg"
                disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending reservation…' : 'Confirm reservation'}
              </button>

              <p className="bm__note">
                No payment required now. We'll confirm by email or call.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
