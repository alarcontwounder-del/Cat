import React from 'react';
import { MapPin, Navigation, Eye, ExternalLink } from 'lucide-react';

var STAR = '\u2605';

function renderStars(n) {
  return STAR.repeat(n || 4);
}

export function HotelCardFront(props) {
  var h = props.hotel;
  return (
    <div className="bg-white border border-stone-100 shadow-sm rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="relative">
        {h.discount && <div className="absolute top-4 right-4 z-10 bg-[#1a1a1a] text-white text-xs font-bold px-3 py-1.5 rounded-full">{h.discount}</div>}
        <div className="h-56 overflow-hidden m-3 mb-0 rounded-xl relative">
          <img loading="lazy" alt={h.name} className="w-full h-full object-cover" src={h.image} />
          <button onClick={function(e) { e.stopPropagation(); props.onQuickView(h); }} className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white transition-all shadow-sm">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-5 pt-4 flex-1 flex flex-col">
        {h.nearest_golf && <p className="flex items-center gap-1.5 text-xs text-stone-500 mb-2"><Navigation className="w-3 h-3" /> {h.nearest_golf}</p>}
        <p className="flex items-center gap-1.5 text-xs text-stone-400 mb-2"><MapPin className="w-3.5 h-3.5" /> {h.location}</p>
        <h3 className="font-heading text-xl text-stone-900 mb-1">{h.name}</h3>
        <p className="text-amber-400 text-sm mb-2">{renderStars(h.stars)}</p>
        <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-1">{h.description}</p>
        <p className="mb-3"><span className="text-xs uppercase tracking-wider text-stone-400">From </span><span className="text-xl font-semibold text-stone-800">&euro;{h.price_from}</span>{h.price_original > h.price_from && <span className="text-sm text-stone-400 line-through ml-2">&euro;{h.price_original}</span>}</p>
        <p className="text-xs text-stone-400 italic hidden md:block">Hover for details &rarr;</p>
      </div>
    </div>
  );
}

export function HotelCardBack(props) {
  var h = props.hotel;
  return (
    <div className="rounded-2xl overflow-hidden h-full flex flex-col p-6 text-white" style={{ background: 'linear-gradient(135deg, #2D2D2D 0%, #3D3D3D 100%)' }}>
      <h3 className="font-heading text-2xl mb-1">{h.name}</h3>
      <p className="text-amber-400 text-sm mb-4">{renderStars(h.stars)}</p>
      <div className="flex-1 space-y-3">
        <p className="flex items-center gap-2 text-white/80 text-sm"><Navigation className="w-4 h-4" /> {h.nearest_golf}</p>
        <p className="flex items-center gap-2 text-white/80 text-sm"><MapPin className="w-4 h-4" /> {h.location}</p>
        <div className="bg-white/10 rounded-lg p-3 mt-2">
          <p className="text-sm font-medium">Golf & Stay Package</p>
          <p className="text-white/60 text-xs mt-1">From &euro;{h.price_from}/night</p>
        </div>
      </div>
      <a href={h.booking_url} target="_blank" rel="noopener noreferrer" className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-white text-stone-800 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition-all">
        Book Now <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export function HotelQuickView(props) {
  var h = props.hotel;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={props.onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={function(e) { e.stopPropagation(); }}>
        <img src={h.image} alt={h.name} className="w-full h-64 object-cover rounded-t-2xl" />
        <button onClick={props.onClose} className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70">&times;</button>
        <div className="p-6">
          <p className="text-amber-400 text-sm mb-2">{renderStars(h.stars)}</p>
          <h2 className="font-heading text-2xl text-stone-900 mb-2">{h.name}</h2>
          <p className="flex items-center gap-1.5 text-sm text-stone-400 mb-4"><MapPin className="w-4 h-4" /> {h.location}</p>
          <p className="text-stone-600 text-sm leading-relaxed mb-4">{h.description}</p>
          {h.nearest_golf && <p className="flex items-center gap-1.5 text-sm text-stone-500 mb-4"><Navigation className="w-4 h-4" /> {h.nearest_golf}</p>}
          <p className="mb-4"><span className="text-xs uppercase tracking-wider text-stone-400">From </span><span className="text-2xl font-semibold text-stone-800">&euro;{h.price_from}</span>{h.price_original > h.price_from && <span className="text-base text-stone-400 line-through ml-2">&euro;{h.price_original}</span>}<span className="text-xs text-stone-400 ml-1">/night</span></p>
          <a href={h.booking_url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-black text-[#CCFF00] px-6 py-3 rounded-full text-sm font-bold hover:bg-black/90 transition-all">
            Book Hotel & Golf Package <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
