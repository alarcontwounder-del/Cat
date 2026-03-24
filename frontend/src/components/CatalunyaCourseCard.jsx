import React from 'react';
import { MapPin, ExternalLink, Phone, Flag, Navigation, Eye, Trophy } from 'lucide-react';

export const CatalunyaCourseCard = ({ course, onQuickView }) => (
  <div className="flip-card" data-testid={`cat-course-card-${course.id}`}>
    <div className="flip-card-inner">
      <div className="flip-card-front bg-white border border-stone-100 shadow-sm rounded-2xl">
        <div className="aspect-[4/3] overflow-hidden rounded-t-2xl relative m-3 mb-0">
          <img
            src={course.image}
            alt={course.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 rounded-xl"
          />
          {course.price_from && (
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-stone-800 text-sm font-semibold px-3 py-1.5 rounded-full shadow-sm">
              From &euro;{course.price_from}
            </div>
          )}
          {onQuickView && (
            <button
              onClick={(e) => { e.stopPropagation(); onQuickView(course); }}
              className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white transition-all shadow-sm"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="p-5 pt-4">
          <div
            className="flex items-center gap-2 text-stone-400 text-xs mb-2 cursor-pointer hover:text-[#f53d7d] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(course.name + ', ' + course.location + ', Catalunya'), '_blank');
            }}
            title="Open in Google Maps"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{course.location}</span>
          </div>
          <h3 className="font-heading text-xl text-stone-900 mb-2">{course.name}</h3>
          <p className="text-stone-500 text-sm mb-4 line-clamp-2">
            {course.description && course.description.en ? course.description.en : String(course.description || '')}
          </p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider text-stone-400">Holes</span>
            <span className="text-xl font-semibold text-stone-800">{course.holes}</span>
            <span className="text-stone-300 mx-1">|</span>
            <span className="text-xs uppercase tracking-wider text-stone-400">Par</span>
            <span className="text-xl font-semibold text-stone-800">{course.par}</span>
          </div>
          <p className="text-xs text-stone-400 italic hidden md:block">Hover for details</p>
          {onQuickView && (
            <button
              onClick={(e) => { e.stopPropagation(); onQuickView(course); }}
              className="md:hidden text-xs text-[#f53d7d] font-medium flex items-center gap-1"
            >
              <Eye className="w-3 h-3" /> View Details
            </button>
          )}
        </div>
      </div>
      <div className="flip-card-back rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #2D2D2D 0%, #3D3D3D 100%)' }}>
        <h3 className="font-heading text-2xl mb-5">{course.name}</h3>
        <div className="space-y-3">
          <div
            className="flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(course.full_address || course.name + ', Catalunya'), '_blank');
            }}
            title="Open in Google Maps"
          >
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/70 text-xs uppercase tracking-wider mb-0.5">Location</p>
              <p className="text-sm">{course.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/70 text-xs uppercase tracking-wider mb-0.5">Course</p>
              <p className="text-sm">{course.holes} Holes - Par {course.par}</p>
            </div>
          </div>
          {course.phone && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-white/70 text-xs uppercase tracking-wider mb-0.5">Pro Shop</p>
                <p className="text-sm">{course.phone}</p>
              </div>
            </div>
          )}
          {course.features && course.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {course.features.slice(0, 3).map((f, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-white/15 rounded-full">{f}</span>
              ))}
            </div>
          )}
          {course.price_from && (
            <div className="bg-white/10 rounded-lg p-3 mt-3">
              <p className="text-sm font-medium flex items-center gap-2">
                <Trophy className="w-4 h-4" /> Green Fee from &euro;{course.price_from}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <a
            href={course.booking_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-[#f53d7d] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#e0356f] transition-all"
          >
            Book a Tee Time now! <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  </div>
);
