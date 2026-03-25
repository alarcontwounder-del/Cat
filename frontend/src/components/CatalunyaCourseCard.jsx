import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ExternalLink, Flag, Navigation, Eye, Trophy } from 'lucide-react';

function getDesc(course) {
  if (!course || !course.description) return '';
  if (typeof course.description === 'string') return course.description;
  return course.description.en || '';
}

export function CatalunyaCourseCard(props) {
  var course = props.course;
  var onQuickView = props.onQuickView;

  return (
    <div className="flip-card" data-testid={'cat-course-card-' + course.id}>
      <div className="flip-card-inner">
        {/* Front - EXACT GIM style */}
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
                onClick={function(e) { e.stopPropagation(); onQuickView(course); }}
                className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white transition-all shadow-sm"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="p-5 pt-4">
            <div
              className="location-link flex items-center gap-2 text-stone-400 text-xs mb-2 cursor-pointer hover:text-stone-700 transition-colors"
              onClick={function(e) {
                e.stopPropagation();
                window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(course.full_address || course.name + ', ' + course.location + ', Catalunya, Spain'), '_blank');
              }}
              title="Open in Google Maps"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{course.location}</span>
            </div>
            <Link to={'/courses/' + course.id} className="hover:text-stone-700 transition-colors">
              <h3 className="font-heading text-xl text-stone-900 mb-2">{course.name}</h3>
            </Link>
            <p className="text-stone-500 text-sm mb-4 line-clamp-2">{getDesc(course)}</p>
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
                onClick={function(e) { e.stopPropagation(); onQuickView(course); }}
                className="md:hidden text-xs text-stone-600 font-medium flex items-center gap-1"
              >
                <Eye className="w-3 h-3" /> View Details
              </button>
            )}
          </div>
        </div>

        {/* Back - Electric Kiwi gradient, GIM structure (no phone, with View Details) */}
        <div className="flip-card-back rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #CCFF00 0%, #DFFF00 50%, #FFFF00 100%)' }}>
          <h3 className="font-heading text-2xl mb-5 text-black">{course.name}</h3>
          <div className="space-y-3">
            <div
              className="location-link flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={function(e) {
                e.stopPropagation();
                window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(course.full_address || course.name + ', ' + course.location + ', Catalunya, Spain'), '_blank');
              }}
              title="Open in Google Maps"
            >
              <div className="w-9 h-9 bg-black/15 rounded-full flex items-center justify-center flex-shrink-0">
                <Navigation className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-black/60 text-xs uppercase tracking-wider mb-0.5">Location</p>
                <p className="text-sm text-black">{course.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-black/15 rounded-full flex items-center justify-center flex-shrink-0">
                <Flag className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-black/60 text-xs uppercase tracking-wider mb-0.5">Course</p>
                <p className="text-sm text-black">{course.holes} Holes - Par {course.par}</p>
              </div>
            </div>
            {course.features && course.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {course.features.slice(0, 3).map(function(f, i) {
                  return <span key={i} className="text-xs px-2 py-1 bg-black/10 rounded-full text-black">{f}</span>;
                })}
              </div>
            )}
            {course.price_from && (
              <div className="bg-black/10 rounded-lg p-3 mt-3">
                <p className="text-sm font-medium flex items-center gap-2 text-black">
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
              className="inline-flex items-center justify-center gap-1.5 bg-black text-[#CCFF00] px-4 py-2 rounded-full text-xs font-semibold hover:bg-black/80 transition-all"
            >
              Book a Tee Time now! <ExternalLink className="w-3 h-3" />
            </a>
            <Link
              to={'/courses/' + course.id}
              className="inline-flex items-center justify-center gap-1.5 bg-black/15 text-black px-4 py-2 rounded-full text-xs font-medium hover:bg-black/25 transition-all border border-black/30"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
