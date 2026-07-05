import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Tag, Calendar, User, ArrowLeft } from 'lucide-react';
import { setSEO } from '../lib/seo';

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
          setSEO({
            title: found.title + ' | GOLFGATE Catalunya Blog',
            description: (found.excerpt || found.content || '').substring(0, 160),
            path: '/blog/' + found.id,
            image: found.image
          });
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
              return <h3 key={'h-' + paragraph.substring(0, 20)} className="font-heading text-xl md:text-2xl text-stone-900 mt-8 mb-3">{paragraph}</h3>;
            }
            return <p key={'p-' + i + '-' + paragraph.substring(0, 15)} className="text-stone-600 text-base md:text-lg leading-relaxed mb-5">{paragraph}</p>;
          })}
        </div>

        {/* Share buttons */}
        <div className="mt-10 pt-8 border-t border-stone-100">
          <p className="text-stone-400 text-xs uppercase tracking-wider mb-3">Share this article</p>
          <div className="flex items-center gap-3">
            <a href={'https://wa.me/?text=' + encodeURIComponent(post.title + ' ' + window.location.href)} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" style={{ backgroundColor: '#25D366' }} data-testid="share-whatsapp">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(post.title) + '&url=' + encodeURIComponent(window.location.href)} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:opacity-80 transition-opacity" data-testid="share-twitter">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href)} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" style={{ backgroundColor: '#1877F2' }} data-testid="share-facebook">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>

        {/* Back */}
        <div className="mt-8 pt-8 border-t border-stone-100">
          <Link to="/blog" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors font-medium text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
