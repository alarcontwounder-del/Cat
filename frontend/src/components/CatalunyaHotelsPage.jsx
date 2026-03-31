import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { HotelCardFront, HotelCardBack } from './HotelCardComponents';
import { HotelQuickView } from './HotelQuickView';

var API = process.env.REACT_APP_BACKEND_URL;

export default function CatalunyaHotelsPage() {
  var hotelsState = useState([]);
  var hotels = hotelsState[0];
  var setHotels = hotelsState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];
  var qvState = useState(null);
  var qvHotel = qvState[0];
  var setQvHotel = qvState[1];

  useEffect(function() {
    window.scrollTo(0, 0);
    document.title = 'Golf Hotels Catalunya | Luxury Golf Resorts & Stay and Play Packages';

    var setMeta = function(attr, name, content) {
      var el = document.querySelector('meta[' + attr + '="' + name + '"]');
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', 'Luxury golf hotels in Catalunya, Spain. 5-star golf resorts, stay and play packages, golf holidays with hotel. Camiral Resort, Peralada Wine Spa, Melia Sitges. Exclusive golf holiday packages.');
    setMeta('name', 'keywords', 'golf hotels catalonia, luxury golf resorts catalonia, 5 star golf hotels catalonia, golf resorts catalonia, stay and play catalonia golf, golf holidays catalonia with hotel, golf hotels costa brava, golf hotels barcelona, golf resort packages catalonia');
    setMeta('property', 'og:title', 'Golf Hotels Catalunya | Luxury Golf Resorts & Stay and Play');
    setMeta('property', 'og:description', 'Luxury golf hotels in Catalunya. 5-star resorts, stay and play packages. Camiral Resort, Peralada, Melia Sitges.');

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

      <section className="py-16 md:py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-stone-500 text-sm uppercase tracking-[0.2em] mb-4">Golf Resorts & Hotels</p>
          <h1 className="font-heading text-4xl md:text-5xl text-stone-900 mb-6">Luxury Golf Hotels in Catalunya</h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">Stay and play at Catalunya's finest golf hotels and resorts. Book your accommodation at exclusive rates near the best championship courses in Barcelona, Costa Brava, Girona and Tarragona.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map(function(hotel) {
                return (
                  <div key={hotel.id} className="flip-card" data-testid={'hotel-card-' + hotel.id} onClick={function(e) { e.currentTarget.classList.toggle('flipped'); }}>
                    <div className="flip-card-inner">
                      <HotelCardFront hotel={hotel} onQuickView={setQvHotel} />
                      <HotelCardBack hotel={hotel} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <div className="text-center py-8 border-t border-stone-100">
        <Link to="/" className="text-stone-500 text-sm hover:text-stone-800 transition-colors">&larr; Back to GOLFGATE Catalunya</Link>
      </div>

      {qvHotel && <HotelQuickView hotel={qvHotel} onClose={function() { setQvHotel(null); }} />}
    </div>
  );
}
