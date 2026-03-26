import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Navigation, Eye, ExternalLink, ArrowLeft, Star } from 'lucide-react';

var API = process.env.REACT_APP_BACKEND_URL;

export default function CatalunyaHotelsPage() {
  var hotelsState = useState([]);
  var hotels = hotelsState[0];
  var setHotels = hotelsState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  useEffect(function() {
    window.scrollTo(0, 0);
    document.title = 'Luxury Golf Hotels | GOLFGATE Catalunya';
    axios.get(API + '/api/catalunya-hotels')
      .then(function(res) { setHotels(res.data); })
      .catch(function() {})
      .finally(function() { setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-white" data-testid="hotels-page">
      <nav className="sticky top-0 z-40 shadow-sm" style={{ backgroundColor: '#CCFF00' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src="/golfgate-logo-nav.png" alt="GOLFGATE Catalunya" className="h-12 md:h-14 w-auto" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-black/70 text-sm font-medium hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      {/* GIM Header */}
      <section className="py-16 md:py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-stone-500 text-sm uppercase tracking-[0.2em] mb-4">Golf Resorts & Hotels</p>
          <h1 className="font-heading text-4xl md:text-5xl text-stone-900 mb-6">Luxury Golf Hotels in Catalunya</h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">Stay and play at Catalunya's finest golf resorts and luxury hotels. Exclusive golf holiday packages with special rates for our clients.</p>
        </div>
      </section>

      {/* GIM 3-column card grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map(function(hotel) {
                return <HotelCard key={hotel.id} hotel={hotel} />;
              })}
            </div>
          )}
        </div>
      </section>

      <div className="text-center py-8 border-t border-stone-100">
        <Link to="/" className="text-stone-500 text-sm hover:text-stone-800 transition-colors">&larr; Back to GOLFGATE Catalunya</Link>
      </div>
    </div>
  );
}

function HotelCard(props) {
  var hotel = props.hotel;
  var stars = [];
  for (var i = 0; i < (hotel.stars || 4); i++) {
    stars.push(<Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />);
  }

  return (
    <div className="bg-white border border-stone-100 shadow-sm rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow" data-testid={'hotel-card-' + hotel.id}>
      {/* Image with badge */}
      <div className="relative">
        {hotel.discount && (
          <div className="absolute top-4 right-4 z-10 bg-[#1a1a1a] text-white text-xs font-bold px-3 py-1.5 rounded-full">{hotel.discount}</div>
        )}
        <div className="h-56 overflow-hidden m-3 mb-0 rounded-xl relative">
          <img loading="lazy" alt={hotel.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" src={hotel.image} />
          <button className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white transition-all shadow-sm">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-5 pt-4">
        {/* Nearest golf */}
        {hotel.nearest_golf && (
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
            <Navigation className="w-3 h-3" />
            <span>{hotel.nearest_golf}</span>
          </div>
        )}
        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>{hotel.location}</span>
        </div>
        {/* Name + stars */}
        <h3 className="font-heading text-xl text-stone-900 mb-1">{hotel.name}</h3>
        <div className="flex items-center gap-0.5 mb-2">{stars}</div>
        {/* Description */}
        <p className="text-stone-500 text-sm mb-4 line-clamp-2">{hotel.description}</p>
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xs uppercase tracking-wider text-stone-400">From</span>
          <span className="text-xl font-semibold text-stone-800">&euro;{hotel.price_from}</span>
          {hotel.price_original && hotel.price_original > hotel.price_from && (
            <span className="text-sm text-stone-400 line-through">&euro;{hotel.price_original}</span>
          )}
        </div>
        {/* CTA */}
        <a href={hotel.booking_url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-black text-[#CCFF00] px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-black/90 transition-all">
          Book Hotel & Golf Package <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
