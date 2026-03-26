import React from 'react';
import { MapPin, Navigation, Eye, ExternalLink } from 'lucide-react';

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
    <div className="rounded-2xl overflow-hidden h-full flex flex-col" style={{ background: 'linear-gradient(135deg, #CCFF00 0%, #89F336 40%, #38A711 100%)' }}>
      <div className="p-5 pb-2">
        <p className="flex items-center gap-1 text-black/50 text-xs mb-1"><MapPin className="w-3 h-3" /> {h.location}</p>
        <h3 className="font-heading text-xl text-black font-medium mb-2 leading-tight">{h.name}</h3>
      </div>
      <div className="flex-1 px-5 space-y-3">
        <p className="text-black/70 text-xs leading-relaxed line-clamp-3">{h.description}</p>
        {h.nearest_golf && <p className="flex items-center gap-1.5 text-black/60 text-xs"><Navigation className="w-3 h-3" /> {h.nearest_golf}</p>}
        <div className="flex items-center gap-3">
          <div className="bg-black/10 rounded-lg px-2.5 py-1.5"><span className="text-xs font-semibold text-black/80">From &euro;{h.price_from}/night</span></div>
          {h.price_original > h.price_from && <div className="bg-black/10 rounded-lg px-2.5 py-1.5"><span className="text-xs text-black/50 line-through">&euro;{h.price_original}</span></div>}
        </div>
      </div>
      <div className="p-5 pt-3 space-y-2">
        <a href={h.booking_url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-black text-[#CCFF00] px-4 py-3 rounded-full text-sm font-semibold hover:bg-black/90 transition-all">
          Book Hotel & Golf Package <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
