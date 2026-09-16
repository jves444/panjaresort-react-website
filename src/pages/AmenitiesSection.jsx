import React from 'react';
import { AMENITIES } from '../data/content';
import SectionHeader from '../components/SectionHeader';
import './Sections.css';

export default function AmenitiesSection() {
  return (
    <section className="section section--dark" id="amenities">
      <div className="section__inner">
        <SectionHeader
          eyebrow="At the Resort"
          title="Everything you need, nothing you don't"
          subtitle="Infinity pool, full-service spa, rooftop bar — all on a hillside above Honda Bay."
          light
        />
        <div className="amenities-grid">
          {AMENITIES.map(a => (
            <div className="amenity-card" key={a.name}>
              <div className="amenity-card__icon">{a.icon}</div>
              <h3 className="amenity-card__name">{a.name}</h3>
              <p className="amenity-card__desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
