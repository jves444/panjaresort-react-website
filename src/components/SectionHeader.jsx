import React from 'react';
import './SectionHeader.css';

export default function SectionHeader({ eyebrow, title, subtitle, center = false, light = false }) {
  return (
    <div className={`sh ${center ? 'sh--center' : ''} ${light ? 'sh--light' : ''}`}>
      {eyebrow && <p className="sh__eyebrow">{eyebrow}</p>}
      <h2 className="sh__title">{title}</h2>
      {subtitle && <p className="sh__subtitle">{subtitle}</p>}
    </div>
  );
}
