import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export function HotelQuickView(props) {
  var h = props.hotel;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={props.onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={function(e) { e.stopPropagation(); }}>
        <img src={h.image} alt={h.name} className="w-full h-64 object-cover rounded-t-2xl" />
        <button onClick={props.onClose} className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70">&times;</button>
        <div className="p-6">
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
