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
  var quoteState = useState(null);
  var quoteHotel = quoteState[0];
  var setQuoteHotel = quoteState[1];

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
    <div className="min-h-screen" data-testid="hotels-page">
      <nav className="sticky top-0 z-40 shadow-md" style={{ backgroundColor: '#CCFF00' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src="/golfgate-logo-nav.png" alt="GOLFGATE Catalunya" className="h-12 md:h-20 w-auto" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#f6416c' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      <section className="py-16 md:py-20" >
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
                  <div key={hotel.id} className="flip-card" data-testid={'hotel-card-' + hotel.id} onClick={function(e) { if (e.target.closest('a') || e.target.closest('button')) return; e.currentTarget.classList.toggle('flipped'); }}>
                    <div className="flip-card-inner">
                      <HotelCardFront hotel={hotel} onQuickView={setQvHotel} />
                      <HotelCardBack hotel={hotel} onRequestQuote={setQuoteHotel} />
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

      {quoteHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={function() { setQuoteHotel(null); }}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={function(e) { e.stopPropagation(); }}>
            <button onClick={function() { setQuoteHotel(null); }} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 text-lg">&times;</button>
            <h3 className="font-heading text-xl text-stone-900 mb-1">Request a Quote</h3>
            <p className="text-stone-400 text-sm mb-5">Golf & Stay Package — {quoteHotel}</p>
            <form onSubmit={function(e) {
              e.preventDefault();
              var fd = new FormData(e.target);
              axios.post(API + '/api/contact', { name: fd.get('name'), email: fd.get('email'), dates: fd.get('dates'), message: 'Hotel quote request: ' + quoteHotel + '. ' + (fd.get('message') || '') })
                .then(function() { setQuoteHotel(null); alert('Quote request sent! We will get back to you within 24 hours.'); })
                .catch(function() { alert('Something went wrong. Please email us at contact@golfgatecatalunya.es'); });
            }} className="space-y-3">
              <input name="name" type="text" required placeholder="Name" className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#CCFF00]" />
              <input name="email" type="email" required placeholder="Email" className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#CCFF00]" />
              <input name="dates" type="text" placeholder="Travel dates" className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#CCFF00]" />
              <textarea name="message" placeholder="Any special requests?" rows="3" className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#CCFF00]" />
              <button type="submit" className="w-full py-2.5 rounded-full text-sm font-bold text-white" style={{ backgroundColor: '#f6416c' }}>Send Quote Request</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
