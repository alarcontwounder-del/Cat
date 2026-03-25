import React from 'react';
import { MapPin, ExternalLink, Flag, Trophy } from 'lucide-react';

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
  var mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(course.full_address || course.name + ', ' + course.location + ', Catalunya, Spain');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-lg text-sm font-semibold">X</button>
        <div className="relative h-44 overflow-hidden rounded-t-2xl">
          <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <button onClick={function() { window.open(mapsUrl, '_blank'); }} className="flex items-center gap-1.5 text-stone-500 text-xs mb-1.5 hover:text-[#EF476F] transition-colors">
            <MapPin className="w-3.5 h-3.5" />
            <span>{course.location}</span>
          </button>
          <h3 className="font-heading text-xl text-stone-900 mb-2">{course.name}</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1.5 rounded-lg">
              <Flag className="w-3.5 h-3.5 text-stone-600" />
              <span className="text-xs font-medium">{course.holes} Holes</span>
            </div>
            <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1.5 rounded-lg">
              <span className="text-xs font-medium">Par {course.par}</span>
            </div>
          </div>
          {course.price_from && (
            <div className="flex items-center gap-2 bg-[#CCFF00]/20 px-3 py-2 rounded-lg mb-3">
              <Trophy className="w-4 h-4 text-[#38A711]" />
              <span className="text-sm font-semibold">Green Fee from &euro;{course.price_from}</span>
            </div>
          )}
          <p className="text-stone-600 text-xs leading-relaxed mb-3 line-clamp-3">{desc}</p>
          <FeatureTags feats={feats} />
          <a href={course.booking_url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-black text-[#CCFF00] px-5 py-3 rounded-full text-sm font-semibold hover:bg-black/90 transition-all">
            Book a Tee Time Now <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function FeatureTags(props) {
  var feats = props.feats;
  if (!feats || feats.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {feats.map(function(f, i) {
        return <span key={i} className="text-xs px-2.5 py-1 bg-stone-100 text-stone-600 rounded-full">{f}</span>;
      })}
    </div>
  );
}
