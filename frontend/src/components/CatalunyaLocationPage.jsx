import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, ArrowLeft, ArrowRight, ExternalLink, ChevronRight } from 'lucide-react';

var API = process.env.REACT_APP_BACKEND_URL;

var REGIONS = {
  barcelona: {
    name: 'Barcelona',
    title: 'Golf Courses Near Barcelona',
    subtitle: 'Golf Near Barcelona',
    description: 'Play golf near Barcelona at some of Catalunya\'s finest courses. From Greg Norman\'s El Prat to the coastal charm of Terramar in Sitges, discover championship golf just minutes from the city. Book tee times online with instant confirmation.',
    metaTitle: 'Golf Near Barcelona | Book Tee Times at Golf Courses Near Barcelona',
    metaDesc: 'Book tee times at golf courses near Barcelona, Spain. El Prat, Terramar Sitges, Vallromanes and more. Green fees from EUR65. Golf day trips from Barcelona. Instant confirmation.',
    metaKeywords: 'golf near barcelona, golf courses near barcelona, barcelona golf tee times, golf day trips from barcelona, best golf courses near barcelona, play golf near barcelona city, golf weekend barcelona, barcelona golf packages',
    filter: ['Barcelona', 'Sitges', 'Sant Esteve Sesrovires', 'El Prat']
  },
  'costa-brava': {
    name: 'Costa Brava',
    title: 'Golf Courses on the Costa Brava',
    subtitle: 'Golf Costa Brava',
    description: 'The Costa Brava is one of Europe\'s most sought-after luxury golf destinations. From the world-renowned Camiral Resort (PGA Catalunya) to the stunning Emporda Forest Course, experience championship golf surrounded by Mediterranean beauty.',
    metaTitle: 'Golf Costa Brava | Book Tee Times at Costa Brava Golf Courses',
    metaDesc: 'Book tee times at Costa Brava golf courses. Camiral Resort (PGA Catalunya), Emporda, Peralada and more. Luxury golf holidays on the Costa Brava. Green fees from EUR60.',
    metaKeywords: 'golf costa brava, best golf courses costa brava, costa brava golf holidays, golf resorts costa brava, luxury golf costa brava, costa brava golf packages, golf hotels costa brava',
    filter: ['Caldes de Malavella', 'Girona', 'Gualta', 'Peralada', 'Santa Cristina', 'Pals']
  },
  girona: {
    name: 'Girona',
    title: 'Golf Courses in Girona',
    subtitle: 'Golf Girona Spain',
    description: 'Girona is home to Catalunya\'s finest championship golf, with easy access via Girona-Costa Brava International Airport. The region boasts Camiral Resort, Emporda, and a collection of stunning courses set among Mediterranean landscapes.',
    metaTitle: 'Golf Girona Spain | Book Tee Times at Girona Golf Courses',
    metaDesc: 'Book tee times at golf courses in Girona, Spain. Camiral Resort, Emporda, Peralada and more. Golf holidays Girona with international airport access. Green fees from EUR55.',
    metaKeywords: 'golf girona spain, golf resorts girona, golf courses girona, play golf girona, girona golf holidays, golf hotels girona, best golf girona',
    filter: ['Caldes de Malavella', 'Girona', 'Gualta', 'Peralada', 'Santa Cristina', 'Pals']
  },
  tarragona: {
    name: 'Tarragona',
    title: 'Golf Courses in Tarragona',
    subtitle: 'Golf Tarragona & Costa Daurada',
    description: 'Tarragona and the Costa Daurada offer world-class golf at Infinitum Resort, home to 45 holes of championship golf and host of European Tour events. Combine your round with ancient Roman ruins and golden Mediterranean beaches.',
    metaTitle: 'Golf Tarragona | Book Tee Times at Tarragona & Costa Daurada Golf Courses',
    metaDesc: 'Book tee times at golf courses in Tarragona, Spain. Infinitum Resort (45 holes, European Tour venue), Bonmont and more. Golf on the Costa Daurada from EUR55.',
    metaKeywords: 'golf tarragona, golf costa daurada, infinitum golf, golf courses tarragona, golf resorts tarragona',
    filter: ['Tarragona', 'Salou', 'Reus', 'Mont-roig']
  }
};

export default function CatalunyaLocationPage() {
  var params = useParams();
  var region = REGIONS[params.region];
  var coursesState = useState([]);
  var courses = coursesState[0];
  var setCourses = coursesState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  useEffect(function() {
    window.scrollTo(0, 0);
    if (!region) return;
    document.title = region.metaTitle;

    var setMeta = function(attr, name, content) {
      var el = document.querySelector('meta[' + attr + '="' + name + '"]');
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', region.metaDesc);
    setMeta('name', 'keywords', region.metaKeywords);
    setMeta('property', 'og:title', region.metaTitle);
    setMeta('property', 'og:description', region.metaDesc);

    axios.get(API + '/api/catalunya-courses')
      .then(function(res) {
        var filtered = res.data.filter(function(c) {
          return region.filter.some(function(f) {
            return c.location && c.location.toLowerCase().includes(f.toLowerCase());
          });
        });
        if (filtered.length === 0) filtered = res.data.slice(0, 6);
        setCourses(filtered);
      })
      .catch(function() {})
      .finally(function() { setLoading(false); });
  }, [params.region]);

  if (!region) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-stone-500 text-lg mb-4">Region not found.</p>
        <Link to="/" className="text-stone-800 font-medium hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" data-testid="location-page">
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
          <p className="text-stone-500 text-sm uppercase tracking-[0.2em] mb-4">{region.subtitle}</p>
          <h1 className="font-heading text-4xl md:text-5xl text-stone-900 mb-6">{region.title}</h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">{region.description}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(function(course) {
                return (
                  <div key={course.id} className="bg-white border border-stone-100 rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow">
                    <Link to={'/courses/' + course.id} className="block">
                      <div className="overflow-hidden aspect-[3/2]">
                        <img src={course.image} alt={course.name + ' - Golf ' + region.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    </Link>
                    <div className="p-5">
                      <div className="flex items-center gap-1 text-stone-400 text-xs mb-1.5">
                        <MapPin className="w-3 h-3" /><span>{course.location}</span>
                      </div>
                      <Link to={'/courses/' + course.id}>
                        <h3 className="font-heading text-lg text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">{course.name}</h3>
                      </Link>
                      <p className="text-stone-500 text-sm mb-3 line-clamp-2">{typeof course.description === 'object' ? course.description.en : course.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <span>{course.holes} Holes</span>
                          <span className="text-stone-300">|</span>
                          <span>Par {course.par}</span>
                        </div>
                        {course.price_from && <span className="text-sm font-semibold text-stone-800">From &euro;{course.price_from}</span>}
                      </div>
                      <a href={course.booking_url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-black text-[#CCFF00] px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-black/90 transition-all">
                        Book Tee Time <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-stone-900 mb-4">Explore More Golf in Catalunya</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {Object.keys(REGIONS).map(function(key) {
              if (key === params.region) return null;
              return (
                <Link key={key} to={'/golf/' + key} className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-stone-200 rounded-full text-sm font-medium text-stone-700 hover:border-[#CCFF00] hover:bg-[#CCFF00]/10 transition-all">
                  Golf {REGIONS[key].name} <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              );
            })}
            <Link to="/courses" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-black text-[#CCFF00] rounded-full text-sm font-semibold hover:bg-black/80 transition-all">
              All 20 Courses <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="text-center py-8 border-t border-stone-100">
        <Link to="/" className="text-stone-500 text-sm hover:text-stone-800 transition-colors">&larr; Back to GOLFGATE Catalunya</Link>
      </div>
    </div>
  );
}
