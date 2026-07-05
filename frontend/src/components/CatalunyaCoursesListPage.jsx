import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { setSEO } from '../lib/seo';

var API = process.env.REACT_APP_BACKEND_URL;

export default function CatalunyaCoursesListPage() {
  var coursesState = useState([]);
  var courses = coursesState[0];
  var setCourses = coursesState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  useEffect(function() {
    window.scrollTo(0, 0);
    setSEO({
      title: 'All Golf Courses | GOLFGATE Catalunya',
      description: 'Explore all 20 premier golf courses in Catalunya, Spain. Barcelona, Costa Brava, Girona, Tarragona. Green fees from EUR35. Instant booking confirmation.',
      path: '/courses'
    });
    axios.get(API + '/api/catalunya-courses')
      .then(function(res) { setCourses(res.data); })
      .catch(function() {})
      .finally(function() { setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen" data-testid="courses-list-page">
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
          <p className="text-stone-500 text-sm uppercase tracking-[0.2em] mb-4">20 Premier Courses</p>
          <h1 className="font-heading text-4xl md:text-5xl text-stone-900 mb-4">Golf Courses in Catalunya</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">From Barcelona to the Pyrenees — explore detailed info, green fees, and book tee times at every course in the region.</p>
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
                  <Link to={'/courses/' + course.id} key={course.id} className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow" data-testid={'course-list-' + course.id}>
                    <div className="overflow-hidden aspect-[3/2]">
                      <img src={course.image} alt={course.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1 text-stone-400 text-xs mb-1.5">
                        <MapPin className="w-3 h-3" />
                        <span>{course.location}</span>
                      </div>
                      <h3 className="font-heading text-lg text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">{course.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <span>{course.holes} Holes</span>
                          <span className="text-stone-300">|</span>
                          <span>Par {course.par}</span>
                        </div>
                        {course.price_from && (
                          <span className="text-sm font-semibold text-stone-800">From &euro;{course.price_from}</span>
                        )}
                      </div>
                      <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-stone-500 group-hover:text-stone-800 transition-colors">
                        View Course Info <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                );
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
