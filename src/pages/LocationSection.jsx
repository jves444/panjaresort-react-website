import React from 'react';
import { RESORT, NEARBY } from '../data/content';
import SectionHeader from '../components/SectionHeader';
import './Sections.css';

export default function LocationSection() {
  return (
    <section className="section section--tinted" id="location">
      <div className="section__inner">
        <SectionHeader
          eyebrow="Getting Here"
          title="Bay Vista Rd, Puerto Princesa"
          subtitle="Perched on a hillside above the city with sea views in every direction — 9 km from the airport, 8 minutes walk from Mitra's Ranch zip lines."
        />

        <div className="location-grid">
          <div className="location-map">
            <iframe
              title="Panja Resort Palawan map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.123456789!2d118.7335874!3d9.8131757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b563331320089f%3A0x523bfd3045bf209!2sPanja%20Resort%20Palawan!5e0!3m2!1sen!2sph!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="location-info">
            <div className="location-details">
              <div className="location-detail">
                <span className="location-detail__icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <p>{RESORT.address}</p>
                </div>
              </div>
              <div className="location-detail">
                <span className="location-detail__icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p><a href={`tel:${RESORT.phone}`}>{RESORT.phone}</a></p>
                </div>
              </div>
              <div className="location-detail">
                <span className="location-detail__icon">🕑</span>
                <div>
                  <strong>Check-in / Check-out</strong>
                  <p>Check-in from {RESORT.checkin} · Check-out by {RESORT.checkout}</p>
                </div>
              </div>
            </div>

            <div className="nearby-list">
              <h4 className="nearby-list__title">Nearby attractions</h4>
              {NEARBY.map(n => (
                <div className="nearby-item" key={n.name}>
                  <span className="nearby-item__icon">{n.icon}</span>
                  <span className="nearby-item__name">{n.name}</span>
                  <span className="nearby-item__dist">{n.distance}</span>
                </div>
              ))}
            </div>

            <a
              href={RESORT.google_maps}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
              style={{ marginTop: 8, display: 'inline-flex' }}
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
