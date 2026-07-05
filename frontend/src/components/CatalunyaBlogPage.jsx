import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Tag, Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { setSEO } from '../lib/seo';

var API = process.env.REACT_APP_BACKEND_URL;

export default function CatalunyaBlogPage() {
  var postsState = useState([]);
  var posts = postsState[0];
  var setPosts = postsState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  useEffect(function() {
    window.scrollTo(0, 0);
    setSEO({
      title: 'Blog | GOLFGATE Catalunya - Golf Tips, Course Guides & Travel Advice',
      description: 'Golf tips, course guides and travel advice for Catalunya. Discover the best golf courses, hotels and cultural day trips in Catalonia.',
      path: '/blog'
    });
    axios.get(API + '/api/blog-posts')
      .then(function(res) { setPosts(res.data); })
      .catch(function() {})
      .finally(function() { setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen" data-testid="blog-page">
      {/* Back to home nav */}
      <nav className="sticky top-0 z-40 shadow-md" style={{ backgroundColor: '#CCFF00' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src="/golfgate-logo-nav.png" alt="GOLFGATE Catalunya" className="h-12 md:h-20 w-auto" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#f6416c' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Blog Header - GIM exact structure */}
      <section className="py-16 md:py-20"  data-testid="blog-header">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-stone-500 text-sm uppercase tracking-[0.2em] mb-4" data-testid="blog-subtitle">Catalunya Golf Guide</p>
          <h1 className="font-heading text-4xl md:text-5xl text-stone-900 mb-4" data-testid="blog-title">Tips, Course Guides & Travel Advice</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">Expert golf travel tips, detailed course guides, and insider advice for planning your perfect Catalunya golf holiday.</p>
        </div>
      </section>

      {/* Blog Grid - GIM exact structure */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-500 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map(function(post) {
                return (
                  <article key={post.id} className="bg-white rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow" data-testid={'blog-card-' + post.id}>
                    {post.image && (
                      <Link to={'/blog/' + post.id} className="block">
                        <div className="overflow-hidden aspect-[3/2] rounded-2xl m-3 mb-0">
                          <img alt={post.title} className="w-full h-full object-cover object-center rounded-xl group-hover:scale-105 transition-transform duration-500" loading="lazy" src={post.image} />
                        </div>
                      </Link>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-stone-400 mb-3">
                        {post.category && (
                          <span className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5" />
                            {post.category}
                          </span>
                        )}
                        {post.created_at && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <Link to={'/blog/' + post.id}>
                        <h3 className="font-heading text-xl md:text-2xl text-stone-900 mb-3 line-clamp-2 group-hover:text-stone-600 transition-colors">{post.title}</h3>
                      </Link>
                      <p className="text-stone-600 text-sm mb-4 line-clamp-2">{post.excerpt || (post.content && post.content.substring(0, 150) + '...')}</p>
                      {post.author && (
                        <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                      )}
                      <Link to={'/blog/' + post.id} className="inline-flex items-center gap-2 text-stone-800 hover:text-stone-500 transition-colors font-medium text-sm" data-testid={'blog-read-' + post.id}>
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer link */}
      <div className="text-center py-8 border-t border-stone-100">
        <Link to="/" className="text-stone-500 text-sm hover:text-stone-800 transition-colors">&larr; Back to GOLFGATE Catalunya</Link>
      </div>
    </div>
  );
}
