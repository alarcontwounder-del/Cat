import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

function getDesc(course) {
  if (!course || !course.description) return '';
  if (typeof course.description === 'string') return course.description;
  return course.description.en || '';
}

function getFeatures(course) {
  if (!course || !course.features) return [];
  return course.features;
}

export function CatalunyaQuickView(props) {
  var course = props.course;
  var onClose = props.onClose;
  if (!course) return null;
  
  var desc = getDesc(course);
  var feats = getFeatures(course);
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl" onClick={function(e) { e.stopPropagation(); }}>
        <div className="relative">
          <img src={course.image} alt={course.name} className="w-full h-48 object-cover" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 text-lg">X</button>
        </div>
        <div className="p-6">
          <h3 className="font-heading text-2xl text-stone-900 mb-2">{course.name}</h3>
          <p className="text-stone-400 text-sm flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5" />{course.location}
          </p>
          <p className="text-stone-500 text-sm mb-4">{desc}</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xs uppercase tracking-wider text-stone-400">Holes</span>
            <span className="text-lg font-semibold text-stone-800">{course.holes}</span>
            <span className="text-stone-300 mx-1">|</span>
            <span className="text-xs uppercase tracking-wider text-stone-400">Par</span>
            <span className="text-lg font-semibold text-stone-800">{course.par}</span>
          </div>
          {feats.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {feats.map(function(f, i) {
                return <span key={i} className="text-xs px-2.5 py-1 bg-stone-100 text-stone-600 rounded-full">{f}</span>;
              })}
            </div>
          )}
          <a
            href={course.booking_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#f53d7d] text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-[#e0356f] transition-all"
          >
            Book a Tee Time <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
