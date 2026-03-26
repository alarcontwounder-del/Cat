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
      className="flip-card group"
      data-testid={'course-card-' + course.id}
    >
      <div className="flip-card-inner">
        {/* FRONT - Matches GIM layout: image top, text below */}
        <div className="flip-card-front">
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
            {/* Image area */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
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

              {/* Course name */}
              <Link to={'/courses/' + course.id} className="hover:opacity-80 transition-opacity flex-shrink-0">
                <h3 className="font-heading text-base text-stone-900 mb-1.5 leading-snug" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{course.name}</h3>
              </Link>

              {/* Description - strict 2-line clamp */}
              <p className="text-stone-500 text-xs leading-relaxed mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexShrink: 0 }}>
                {typeof course.description === 'object' ? course.description.en : course.description}
              </p>

              {/* Holes / Par row */}
              <div className="flex items-center gap-1 text-stone-600 text-xs mb-2 flex-shrink-0 mt-auto">
                <span className="uppercase tracking-wider text-stone-400 text-[10px]">Holes</span>
                <span className="font-heading text-lg font-medium text-stone-800">{course.holes}</span>
                <span className="text-stone-300 mx-1.5">|</span>
                <span className="uppercase tracking-wider text-stone-400 text-[10px]">Par</span>
                <span className="font-heading text-lg font-medium text-stone-800">{course.par}</span>
              </div>

              {/* Hover hint */}
              <p className="text-stone-400 text-xs italic flex-shrink-0">Hover for details &rarr;</p>
            </div>
          </div>
        </div>

        {/* BACK - Electric Kiwi gradient with booking CTA */}
        <div className="flip-card-back">
          <div className="rounded-2xl overflow-hidden h-full flex flex-col" style={{ background: 'linear-gradient(135deg, #CCFF00 0%, #DFFF00 40%, #FFFF00 80%, #DFFF00 100%)' }}>
            {/* Course name + location */}
            <div className="p-5 pb-2">
              <button
                onClick={function() { window.open(mapsUrl, '_blank'); }}
                className="flex items-center gap-1 text-black/50 text-xs mb-1 hover:text-black/80 transition-colors"
              >
                <MapPin className="w-3 h-3" />
                <span>{course.location}</span>
              </button>
              <h3 className="font-heading text-xl text-black font-medium mb-2 leading-tight">{course.name}</h3>
            </div>

            {/* Details */}
            <div className="flex-1 px-5 space-y-3">
              <p className="text-black/70 text-xs leading-relaxed line-clamp-3">
                {typeof course.description === 'object' ? course.description.en : course.description}
              </p>

              <div className="flex items-center gap-3">
                <div className="bg-black/10 rounded-lg px-2.5 py-1.5">
                  <span className="text-xs font-medium text-black/80">{course.holes} Holes</span>
                </div>
                <div className="bg-black/10 rounded-lg px-2.5 py-1.5">
                  <span className="text-xs font-medium text-black/80">Par {course.par}</span>
                </div>
                {course.price_from && (
                  <div className="bg-black/10 rounded-lg px-2.5 py-1.5">
                    <span className="text-xs font-semibold text-black/80">&euro;{course.price_from}</span>
                  </div>
                )}
              </div>

              {/* Features */}
              {course.features && (
                <div className="flex flex-wrap gap-1.5">
                  {course.features.slice(0, 4).map(function(f) {
                    return <span key={f} className="text-[10px] bg-white/30 text-black/70 px-2 py-0.5 rounded-full">{f}</span>;
                  })}
                </div>
              )}
            </div>

            {/* Booking buttons */}
            <div className="p-5 pt-3 space-y-2">
              <a
                href={course.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-white text-black px-4 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition-all shadow-md"
                data-testid={'book-btn-' + course.id}
              >
                Book a Tee Time Now <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link
                to={'/courses/' + course.id}
                className="w-full flex items-center justify-center gap-2 bg-black/20 text-black px-4 py-2.5 rounded-full text-xs font-medium hover:bg-black/30 transition-all"
                data-testid={'details-btn-' + course.id}
              >
                View Course Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
