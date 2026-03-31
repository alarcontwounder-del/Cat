import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, MapPin, ExternalLink } from 'lucide-react';

export function CatalunyaCourseCard({ course, onQuickView }) {
  var flipState = useState(false);
  var isFlipped = flipState[0];
  var setIsFlipped = flipState[1];

  var mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(course.full_address || course.name + ' golf ' + course.location);

  return (
    <div
      className={'flip-card group' + (isFlipped ? ' flipped' : '')}
      data-testid={'course-card-' + course.id}
      onClick={function(e) { if (e.target.closest('a') || e.target.closest('button')) return; setIsFlipped(!isFlipped); }}
    >
      <div className="flip-card-inner">
        {/* FRONT - Matches GIM layout: image top, text below */}
        <div className="flip-card-front">
          <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
            {/* Image area - GIM style with margin all sides */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl m-3">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Editor's Pick badge */}
              {course.editors_pick && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-md" style={{ backgroundColor: '#f6416c' }} data-testid={'editors-pick-' + course.id}>
                  Editor's Pick
                </div>
              )}
              {/* Eye icon - quick view */}
              <button
                onClick={function(e) { e.stopPropagation(); onQuickView(course); }}
                className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-md"
                data-testid={'quickview-btn-' + course.id}
              >
                <Eye className="w-4 h-4 text-stone-600" />
              </button>
              {/* Price badge */}
              {course.price_from && (
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                  <span className="text-sm font-semibold text-stone-800">From &euro;{course.price_from}</span>
                </div>
              )}
            </div>

            {/* Text area below image */}
            <div className="flex-1 flex flex-col p-4 pt-3 overflow-hidden">
              {/* Location */}
              <button
                onClick={function() { window.open(mapsUrl, '_blank'); }}
                className="flex items-center gap-1 text-stone-400 text-xs mb-1 hover:text-[#EF476F] transition-colors w-fit flex-shrink-0"
                data-testid={'map-link-' + course.id}
              >
                <MapPin className="w-3 h-3" />
                <span>{course.location}</span>
              </button>

              {/* Course name - GIM size */}
              <Link to={'/courses/' + course.id} className="hover:opacity-80 transition-opacity flex-shrink-0">
                <h3 className="font-heading text-xl text-stone-900 mb-1.5 leading-snug" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{course.name}</h3>
              </Link>

              {/* Description - GIM size */}
              <p className="text-stone-500 text-sm leading-relaxed mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexShrink: 0 }}>
                {typeof course.description === 'object' ? course.description.en : course.description}
              </p>

              {/* Holes / Par row - GIM size */}
              <div className="flex items-center gap-1 text-stone-600 text-xs mb-2 flex-shrink-0 mt-auto">
                <span className="uppercase tracking-wider text-stone-400 text-[10px]">Holes</span>
                <span className="font-heading text-xl font-medium text-stone-800">{course.holes}</span>
                <span className="text-stone-300 mx-1.5">|</span>
                <span className="uppercase tracking-wider text-stone-400 text-[10px]">Par</span>
                <span className="font-heading text-xl font-medium text-stone-800">{course.par}</span>
              </div>

              {/* Hover hint */}
              <p className="text-stone-400 text-xs italic flex-shrink-0"><span className="hidden md:inline">Hover</span><span className="md:hidden">Tap</span> for details &rarr;</p>
            </div>
          </div>
        </div>

        {/* BACK - EXACT GIM structure */}
        <div className="flip-card-back">
          <div className="rounded-2xl overflow-hidden h-full flex flex-col p-5" style={{ background: 'linear-gradient(135deg, #CCFF00 0%, #89F336 40%, #38A711 100%)' }}>
            <h3 className="font-heading text-2xl mb-5">{course.name}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={function() { window.open(mapsUrl, '_blank'); }}>
                <div className="w-9 h-9 bg-black/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-black/60 text-xs uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-sm">{course.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-black/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" x2="4" y1="22" y2="15" /></svg>
                </div>
                <div>
                  <p className="text-black/60 text-xs uppercase tracking-wider mb-0.5">Course</p>
                  <p className="text-sm">{course.holes} Holes &bull; Par {course.par}</p>
                </div>
              </div>
              {course.features && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {course.features.slice(0, 4).map(function(f) { return <span key={f} className="text-xs px-2 py-1 bg-black/10 rounded-full">{f}</span>; })}
                </div>
              )}
              {course.price_from && (
                <div className="bg-black/10 rounded-lg p-3 mt-3">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
                    Green Fee from &euro;{course.price_from}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <a href={course.booking_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 bg-white text-stone-800 px-4 py-2 rounded-full text-xs font-semibold hover:bg-white/90 transition-all" data-testid={'book-btn-' + course.id}>
                Book a Tee Time now! <ExternalLink className="w-3 h-3" />
              </a>
              <Link to={'/courses/' + course.id} className="inline-flex items-center justify-center gap-1.5 bg-black/15 px-4 py-2 rounded-full text-xs font-medium hover:bg-black/25 transition-all border border-black/20" data-testid={'details-btn-' + course.id}>
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
