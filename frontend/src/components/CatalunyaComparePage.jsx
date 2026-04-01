import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ExternalLink, MapPin, X, Plus, ChevronDown } from 'lucide-react';

var API = process.env.REACT_APP_BACKEND_URL;

export default function CatalunyaComparePage() {
  var coursesState = useState([]);
  var courses = coursesState[0];
  var setCourses = coursesState[1];
  var selectedState = useState([]);
  var selected = selectedState[0];
  var setSelected = selectedState[1];
  var pickerState = useState(null);
  var pickerSlot = pickerState[0];
  var setPickerSlot = pickerState[1];

  useEffect(function() {
    window.scrollTo(0, 0);
    document.title = 'Compare Golf Courses | GOLFGATE Catalunya';
    var setMeta = function(a, n, c) { var el = document.querySelector('meta[' + a + '="' + n + '"]'); if (!el) { el = document.createElement('meta'); el.setAttribute(a, n); document.head.appendChild(el); } el.setAttribute('content', c); };
    setMeta('name', 'description', 'Compare golf courses in Catalunya side by side. Compare green fees, holes, par, location and features. Find the best course for your game.');
    axios.get(API + '/api/catalunya-courses').then(function(res) { setCourses(res.data); }).catch(function() {});
  }, []);

  function addCourse(course) {
    if (pickerSlot !== null) {
      var newSel = selected.slice();
      newSel[pickerSlot] = course;
      setSelected(newSel);
    } else if (selected.length < 3) {
      setSelected(selected.concat([course]));
    }
    setPickerSlot(null);
  }

  function removeCourse(index) {
    setSelected(selected.filter(function(c, i) { return i !== index; }));
  }

  var available = courses.filter(function(c) { return !selected.find(function(s) { return s.id === c.id; }); });

  return (
    <div className="min-h-screen" data-testid="compare-page">
      <nav className="sticky top-0 z-40 shadow-md" style={{ backgroundColor: '#CCFF00' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0"><img src="/golfgate-logo-nav.png" alt="GOLFGATE Catalunya" className="h-12 md:h-20 w-auto" /></Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#f6416c' }}><ArrowLeft className="w-4 h-4" /> Back to Home</Link>
        </div>
      </nav>

      <section className="py-12 md:py-16" >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-stone-500 text-sm uppercase tracking-[0.2em] mb-4">Course Comparison</p>
          <h1 className="font-heading text-4xl md:text-5xl text-stone-900 mb-4">Compare Golf Courses</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">Select up to 3 courses to compare side by side. Compare green fees, holes, par, and features to find your perfect round.</p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-6">
          {/* Selection slots */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[0, 1, 2].map(function(slot) {
              var course = selected[slot];
              if (course) {
                return (
                  <div key={slot} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                    <div className="relative h-36 overflow-hidden">
                      <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
                      <button onClick={function() { removeCourse(slot); }} className="absolute top-2 right-2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 text-sm">&times;</button>
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="font-heading text-sm text-stone-900 truncate">{course.name}</h3>
                      <p className="text-xs text-stone-400">{course.location}</p>
                    </div>
                  </div>
                );
              }
              return (
                <button key={slot} onClick={function() { setPickerSlot(slot); }} className="bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200 h-52 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer" style={{ }} onMouseEnter={function(e) { e.currentTarget.style.borderColor = 'rgba(246,65,108,0.5)'; e.currentTarget.style.backgroundColor = 'rgba(246,65,108,0.04)'; }} onMouseLeave={function(e) { e.currentTarget.style.borderColor = ''; e.currentTarget.style.backgroundColor = ''; }} data-testid={'add-slot-' + slot}>
                  <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center"><Plus className="w-5 h-5 text-stone-500" /></div>
                  <p className="text-sm text-stone-400 font-medium">Select Course {slot + 1}</p>
                </button>
              );
            })}
          </div>

          {/* Comparison table */}
          {selected.length >= 2 && <CompareTable courses={selected} />}

          {/* Picker modal */}
          {pickerSlot !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={function() { setPickerSlot(null); }}>
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto" onClick={function(e) { e.stopPropagation(); }}>
                <div className="sticky top-0 bg-white p-4 border-b border-stone-100 flex items-center justify-between">
                  <h3 className="font-heading text-lg text-stone-900">Select a Course</h3>
                  <button onClick={function() { setPickerSlot(null); }} className="text-stone-400 hover:text-stone-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-2">
                  {available.map(function(c) {
                    return (
                      <button key={c.id} onClick={function() { addCourse(c); }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors text-left">
                        <img src={c.image} alt="" className="w-12 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-stone-900 truncate">{c.name}</p>
                          <p className="text-xs text-stone-400">{c.location} &middot; {c.holes}H Par {c.par} &middot; From &euro;{c.price_from}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function CompareTable(props) {
  var courses = props.courses;
  var rows = [
    { label: 'Location', key: 'location' },
    { label: 'Holes', key: 'holes' },
    { label: 'Par', key: 'par' },
    { label: 'Green Fee From', key: 'price_from', prefix: '\u20ac' },
    { label: 'Slope Rating', key: 'slope_rating' },
    { label: 'Course Rating', key: 'course_rating' },
    { label: 'Difficulty', key: 'difficulty' },
    { label: 'Maintenance', key: 'maintenance' },
    { label: 'Ranking', key: 'ranking' },
    { label: 'Designer', key: 'designer' },
    { label: 'Features', key: 'features', type: 'features' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
      <table className="w-full" data-testid="compare-table">
        <thead>
          <tr className="border-b border-stone-100">
            <th className="p-4 text-left text-xs font-semibold text-stone-400 uppercase tracking-wider w-32"></th>
            {courses.map(function(c) {
              return (
                <th key={c.id} className="p-4 text-center">
                  <img src={c.image} alt="" className="w-full h-24 object-cover rounded-xl mb-2" />
                  <p className="font-heading text-base text-stone-900">{c.name}</p>
                  <p className="text-xs text-stone-400 flex items-center justify-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {c.location}</p>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map(function(row) {
            return (
              <tr key={row.key} className="border-b border-stone-50">
                <td className="p-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">{row.label}</td>
                {courses.map(function(c) {
                  var val = c[row.key];
                  if (row.type === 'features' && Array.isArray(val)) {
                    return <td key={c.id} className="p-4 text-center text-xs text-stone-600">{val.join(', ')}</td>;
                  }
                  return <td key={c.id} className="p-4 text-center text-sm font-medium text-stone-800">{row.prefix || ''}{val}</td>;
                })}
              </tr>
            );
          })}
          <tr>
            <td className="p-4"></td>
            {courses.map(function(c) {
              return (
                <td key={c.id} className="p-4 text-center">
                  <a href={c.booking_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-black text-[#CCFF00] px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-black/90 transition-all">
                    Book Tee Time <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
