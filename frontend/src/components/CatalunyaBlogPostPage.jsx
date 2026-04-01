import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Tag, Calendar, User, ArrowLeft } from 'lucide-react';

var API = process.env.REACT_APP_BACKEND_URL;

export default function CatalunyaBlogPostPage() {
  var params = useParams();
  var postState = useState(null);
  var post = postState[0];
  var setPost = postState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  useEffect(function() {
    window.scrollTo(0, 0);
    axios.get(API + '/api/blog-posts')
      .then(function(res) {
        var found = res.data.find(function(p) { return p.id === params.postId; });
        if (found) {
          setPost(found);
          document.title = found.title + ' | GOLFGATE Catalunya Blog';
        }
      })
      .catch(function() {})
      .finally(function() { setLoading(false); });
  }, [params.postId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-stone-500 text-lg">Post not found.</p>
        <Link to="/blog" className="text-stone-800 font-medium hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" data-testid="blog-post-page">
      {/* Nav */}
      <nav className="sticky top-0 z-40 shadow-md" style={{ backgroundColor: '#CCFF00' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src="/golfgate-logo-nav.png" alt="GOLFGATE Catalunya" className="h-12 md:h-20 w-auto" />
          </Link>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#f6416c' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </nav>

      {/* Hero image */}
      {post.image && (
        <div className="w-full max-h-[450px] overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover object-center" style={{ maxHeight: '450px' }} />
        </div>
      )}

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-stone-400 mb-4">
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
          {post.author && (
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-8 leading-tight">{post.title}</h1>

        {/* Content */}
        <div className="prose prose-stone prose-lg max-w-none">
          {post.content.split('\n\n').map(function(paragraph, i) {
            if (!paragraph.trim()) return null;
            var isHeading = paragraph.match(/^\d+\.\s/) || paragraph.length < 80 && !paragraph.includes('.');
            if (isHeading && paragraph.match(/^\d+\./)) {
              return <h3 key={i} className="font-heading text-xl md:text-2xl text-stone-900 mt-8 mb-3">{paragraph}</h3>;
            }
            return <p key={i} className="text-stone-600 text-base md:text-lg leading-relaxed mb-5">{paragraph}</p>;
          })}
        </div>

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-stone-100">
          <Link to="/blog" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors font-medium text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
