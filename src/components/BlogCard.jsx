import React, { useState } from 'react';

export default function BlogCard({ post }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="blog-card" onClick={() => setOpen(true)} tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(true)} role="button">
        <div className="blog-card__img">
          <img src={post.image} alt={post.title} loading="lazy" />
          <span className="blog-card__category">{post.category}</span>
        </div>
        <div className="blog-card__body">
          <p className="blog-card__date">{post.date}</p>
          <h3 className="blog-card__title">{post.title}</h3>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <span className="blog-card__cta">Read more →</span>
        </div>
      </article>

      {open && (
        <div className="blog-modal__overlay" onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="blog-modal">
            <button className="blog-modal__close" onClick={() => setOpen(false)}>✕</button>
            <img src={post.image} alt={post.title} className="blog-modal__img" />
            <div className="blog-modal__content">
              <p className="blog-card__category">{post.category} · {post.date}</p>
              <h2>{post.title}</h2>
              {post.content.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}