import React from 'react';
import { BLOG_POSTS } from '../data/content';
import BlogCard from '../components/BlogCard';
import SectionHeader from '../components/SectionHeader';

export default function BlogSection() {
  return (
    <section className="section" id="blog">
      <div className="section__inner">
        <SectionHeader
          eyebrow="From the Resort"
          title="Stories & Travel Tips"
          subtitle="Local guides, dining picks, and what's happening in Palawan."
        />
        <div className="rooms-grid"> {/* reuses the same 3-col grid */}
          {BLOG_POSTS.map(post => <BlogCard key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  );
}