import React from 'react';
import { FOOD_ITEMS } from '../data/content';
import FoodCard from '../components/FoodCard';
import SectionHeader from '../components/SectionHeader';
import './Sections.css';

export default function DiningSection() {
  return (
    <section className="section section--tinted" id="dining">
      <div className="section__inner">
        <SectionHeader
          eyebrow="Food & Drink"
          title="From the sea to your table"
          subtitle="Local seafood, Filipino classics, and international favourites — all with a view. Breakfast is included with every room. Click any card for more."
        />
        <div className="food-grid">
          {FOOD_ITEMS.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
