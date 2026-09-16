import React from 'react';
import { ROOMS } from '../data/content';
import RoomCard from '../components/RoomCard';
import SectionHeader from '../components/SectionHeader';
import './Sections.css';

export default function RoomsSection({ onBook }) {
  return (
    <section className="section" id="rooms">
      <div className="section__inner">
        <SectionHeader
          eyebrow="Accommodations"
          title="Rooms built for the view"
          subtitle="Every room has a balcony. All 35 rooms include daily breakfast, high-speed Wi-Fi, and air conditioning. Click any room to see full details."
        />
        <div className="rooms-grid">
          {ROOMS.map(room => (
            <RoomCard key={room.id} room={room} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  );
}
