import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { setSEO } from '../lib/seo';

export default function BestTimePage() {
  useEffect(function() {
    window.scrollTo(0, 0);
    setSEO({
      title: 'Best Time to Play Golf in Catalunya | Season Guide',
      description: 'When is the best time to play golf in Catalunya? Season-by-season guide with temperatures, rainfall, crowd levels, and green fee prices.',
      path: '/best-time-to-play'
    });
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-40 shadow-md" style={{ backgroundColor: '#CCFF00' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0"><img src="/golfgate-logo-nav.png" alt="GOLFGATE Catalunya" className="h-12 md:h-20 w-auto" /></Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70" style={{ color: '#f6416c' }}><ArrowLeft className="w-4 h-4" /> Back to Home</Link>
        </div>
      </nav>

      <section className="py-16 md:py-20" >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-stone-500 text-sm uppercase tracking-[0.2em] mb-4">Seasonal Guide</p>
          <h1 className="font-heading text-4xl md:text-5xl text-stone-900 mb-4">Best Time to Play Golf in Catalunya</h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">Catalunya offers year-round golf with 300+ days of sunshine. Here is your season-by-season guide.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <SeasonCard name="Spring (Mar-May)" temp="14-22C" rain="Low" crowds="Moderate" prices="Mid-season" rating="Excellent" color="#38A711" desc="Perfect golf weather. Courses in peak condition after winter rains. Wildflowers bloom across the fairways. Book early for Easter week." />
          <SeasonCard name="Summer (Jun-Aug)" temp="25-32C" rain="Very Low" crowds="High" prices="Peak season" rating="Good (early mornings)" color="#CCFF00" dark desc="Hot afternoons. Book early morning tee times before 9am. Coastal courses benefit from sea breezes. Twilight rounds offer great value." />
          <SeasonCard name="Autumn (Sep-Nov)" temp="15-25C" rain="Moderate" crowds="Low" prices="Best value" rating="Best Overall" color="#f6416c" desc="The golden season. Warm days, cool evenings, fewer crowds, and the best green fee deals. October is the perfect month." />
          <SeasonCard name="Winter (Dec-Feb)" temp="8-15C" rain="Moderate" crowds="Very Low" prices="Lowest" rating="Good (mild days)" color="#CCFF00" dark desc="Catalunya winters are mild. Many sunny days perfect for golf. Lowest prices of the year. Mountain courses may be cooler." />
        </div>
      </section>

      <div className="text-center py-8 border-t border-stone-100">
        <Link to="/" className="text-stone-500 text-sm hover:text-stone-800">&larr; Back to GOLFGATE Catalunya</Link>
      </div>
    </div>
  );
}

function SeasonCard(props) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h2 className="font-heading text-2xl text-stone-900">{props.name}</h2>
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: props.color, color: props.dark ? 'black' : 'white' }}>{props.rating}</span>
      </div>
      <p className="text-stone-600 text-sm leading-relaxed mb-5">{props.desc}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-stone-50 rounded-lg p-3 text-center">
          <p className="text-xs text-stone-400">Temperature</p>
          <p className="text-sm font-semibold text-stone-800">{props.temp}</p>
        </div>
        <div className="bg-stone-50 rounded-lg p-3 text-center">
          <p className="text-xs text-stone-400">Rainfall</p>
          <p className="text-sm font-semibold text-stone-800">{props.rain}</p>
        </div>
        <div className="bg-stone-50 rounded-lg p-3 text-center">
          <p className="text-xs text-stone-400">Crowds</p>
          <p className="text-sm font-semibold text-stone-800">{props.crowds}</p>
        </div>
        <div className="bg-stone-50 rounded-lg p-3 text-center">
          <p className="text-xs text-stone-400">Prices</p>
          <p className="text-sm font-semibold text-stone-800">{props.prices}</p>
        </div>
      </div>
    </div>
  );
}
