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
      <div className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-lg text-lg">X</button>
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <button onClick={function() { window.open(mapsUrl, '_blank'); }} className="flex items-center gap-2 text-stone-500 text-sm mb-2 hover:text-[#EF476F] transition-colors">
            <MapPin className="w-4 h-4" />
            <span>{course.location}</span>
          </button>
          <h3 className="font-heading text-2xl text-stone-900 mb-3">{course.name}</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 bg-stone-100 px-3 py-2 rounded-lg">
              <Flag className="w-4 h-4 text-stone-600" />
              <span className="text-sm font-medium">{course.holes} Holes</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-100 px-3 py-2 rounded-lg">
              <span className="text-sm font-medium">Par {course.par}</span>
            </div>
          </div>
          {course.price_from && (
            <div className="flex items-center gap-2 bg-[#CCFF00]/20 px-4 py-3 rounded-xl mb-4">
              <Trophy className="w-5 h-5 text-[#38A711]" />
              <span className="font-semibold">Green Fee from &euro;{course.price_from}</span>
            </div>
          )}
          <p className="text-stone-600 text-sm leading-relaxed mb-4">{desc}</p>
          <FeatureTags feats={feats} />
          <a href={course.booking_url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-black text-[#CCFF00] px-6 py-3.5 rounded-full font-semibold hover:bg-black/90 transition-all">
            Book a Tee Time Now <ExternalLink className="w-4 h-4" />
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
