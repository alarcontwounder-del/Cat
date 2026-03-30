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
      <div className="p-5 pt-4 flex-1 flex flex-col overflow-hidden">
        {h.nearest_golf && <p className="flex items-center gap-1.5 text-xs text-stone-500 mb-2 flex-shrink-0"><Navigation className="w-3 h-3" /> {h.nearest_golf}</p>}
        <p className="flex items-center gap-1.5 text-xs text-stone-400 mb-2 flex-shrink-0"><MapPin className="w-3.5 h-3.5" /> {h.location}</p>
        <h3 className="font-heading text-lg text-stone-900 mb-1 flex-shrink-0" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{h.name}</h3>
        <p className="text-stone-500 text-xs mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexShrink: 0 }}>{h.description}</p>
        <p className="mb-2 flex-shrink-0 mt-auto"><span className="text-xs uppercase tracking-wider text-stone-400">From </span><span className="text-xl font-semibold text-stone-800">&euro;{h.price_from}</span>{h.price_original > h.price_from && <span className="text-sm text-stone-400 line-through ml-2">&euro;{h.price_original}</span>}</p>
        <p className="text-xs text-stone-400 italic flex-shrink-0"><span className="hidden md:inline">Hover</span><span className="md:hidden">Tap</span> for details &rarr;</p>
      </div>
    </div>
  );
}

export function HotelCardBack(props) {
  var h = props.hotel;
  return (
    <div className="rounded-2xl h-full flex flex-col items-center justify-center text-center p-6" style={{ background: 'linear-gradient(135deg, #f6416c 0%, #e8365f 40%, #d42a52 100%)' }}>
      <h3 className="font-heading text-2xl text-white mb-6">{h.name}</h3>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
          <Navigation className="w-4 h-4 text-white/80" />
        </div>
        <div className="text-left">
          <p className="text-white/60 text-xs uppercase tracking-wider mb-0.5">Location</p>
          <p className="text-sm text-white">{h.location}</p>
        </div>
      </div>
      <div className="bg-white/15 rounded-lg px-4 py-3 mb-5 w-full">
        <p className="text-sm font-medium text-white">Exclusive: Golf & Stay Package</p>
      </div>
      {h.nearest_golf && <p className="flex items-center gap-2 text-white/80 text-sm mb-6"><Navigation className="w-4 h-4" /> {h.nearest_golf}</p>}
      <a href={h.booking_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 bg-white text-[#f6416c] px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-white/90 transition-all shadow-md">
        Book Now <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
