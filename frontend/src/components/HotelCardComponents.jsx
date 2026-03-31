import React from 'react';
import { MapPin, Navigation, Eye, ExternalLink } from 'lucide-react';

export function HotelCardFront(props) {
  var h = props.hotel;
  return (
    <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        {h.discount && <div className="absolute top-6 right-6 z-10 bg-[#1a1a1a] text-white text-xs font-bold px-3 py-1.5 rounded-full">{h.discount}</div>}
        <div className="h-56 overflow-hidden rounded-t-2xl relative m-3 mb-0">
          <img loading="lazy" alt={h.name} className="w-full h-full object-cover object-center rounded-xl" src={h.image} />
          <button onClick={function(e) { e.stopPropagation(); props.onQuickView(h); }} className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white transition-all shadow-sm">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-5 pt-4 flex-1 flex flex-col">
        {h.nearest_golf && <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2"><Navigation className="w-3 h-3" /><span>{h.nearest_golf}</span></div>}
        <div className="flex items-center gap-2 text-stone-400 text-xs mb-2"><MapPin className="w-3.5 h-3.5" /><span>{h.location}</span></div>
        <h3 className="font-heading text-xl text-stone-900 mb-2">{h.name}</h3>
        <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-1">{h.description}</p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xs uppercase tracking-wider text-stone-400">From</span>
          <span className="text-xl font-semibold text-stone-800">&euro;{h.price_from}</span>
          {h.price_original > h.price_from && <span className="text-sm text-stone-400 line-through">&euro;{h.price_original}</span>}
        </div>
        <p className="text-xs text-stone-400 italic"><span className="hidden md:inline">Hover</span><span className="md:hidden">Tap</span> for details &rarr;</p>
      </div>
    </div>
  );
}

export function HotelCardBack(props) {
  var h = props.hotel;
  return (
    <div className="rounded-2xl overflow-hidden h-full flex flex-col p-5" style={{ background: 'linear-gradient(135deg, #f6416c 0%, #e8365f 40%, #d42a52 100%)' }}>
      <h3 className="font-heading text-2xl text-white mb-6">{h.name}</h3>
      <div className="space-y-4 flex-1">
        <div className="flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Navigation className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Location</p>
            <p className="text-sm text-white">{h.location}</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-3 mt-4">
          <p className="text-sm font-medium text-white">Exclusive: Golf & Stay Package</p>
        </div>
        {h.nearest_golf && (
          <div className="flex items-center gap-2 text-white/80 text-sm mt-3">
            <Navigation className="w-4 h-4" />
            <span>{h.nearest_golf}</span>
          </div>
        )}
      </div>
      <a href={h.booking_url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 bg-white text-stone-800 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition-all">
        Book Now <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
