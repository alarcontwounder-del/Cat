import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Flag, Trophy, ChevronRight, ExternalLink, Navigation, Star } from 'lucide-react';
import axios from 'axios';

var API = process.env.REACT_APP_BACKEND_URL;
var LOGO = 'https://customer-assets.emergentagent.com/job_booking-landing/artifacts/e45y2a1q_my-project-page-1.png';

function getDesc(c) {
  if (!c || !c.description) return '';
  if (typeof c.description === 'string') return c.description;
  return c.description.en || '';
}

export default function CatalunyaCoursePage() {
  var params = useParams();
  var courseId = params.courseId;
  var navigate = useNavigate();
  var courseState = useState(null);
  var course = courseState[0];
  var setCourse = courseState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  useEffect(function() {
    window.scrollTo(0, 0);
    setLoading(true);
    axios.get(API + '/api/catalunya-courses/' + courseId)
      .then(function(res) { setCourse(res.data); })
      .catch(function() { navigate('/'); })
      .finally(function() { setLoading(false); });
  }, [courseId, navigate]);

  useEffect(function() {
    if (!course) return;
    document.title = course.name + ' | GOLFGATE Catalunya';
  }, [course]);

  if (loading) return <Spinner />;
  if (!course) return null;

  var desc = getDesc(course);
  var mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(course.full_address || course.name + ' Catalunya Spain');

  return (
    <div className="min-h-screen bg-white">
      <NavBarSimple />
      <BreadcrumbHero course={course} />
      <ContentArea course={course} desc={desc} mapsUrl={mapsUrl} />
      <SimpleFooter />
    </div>
  );
}

function Spinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-stone-300 border-t-[#EF476F] rounded-full animate-spin" />
    </div>
  );
}

function NavBarSimple() {
  return (
    <nav className="sticky top-0 z-40 shadow-md" style={{ backgroundColor: '#CCFF00' }}>
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <Link to="/">
          <img src={LOGO} alt="GOLFGATE Catalunya" className="h-14 md:h-20 w-auto" style={{ mixBlendMode: 'multiply', filter: 'brightness(1.08) contrast(1.1)' }} />
        </Link>
        <Link to="/#courses" className="bg-black text-[#CCFF00] px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black/80 transition-all">
          Book a Tee Time Now
        </Link>
      </div>
    </nav>
  );
}

function BreadcrumbHero(props) {
  var c = props.course;
  return (
    <div className="bg-stone-50 pt-6 pb-6">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <nav className="flex items-center gap-2 text-stone-400 text-xs mb-4">
          <Link to="/" className="hover:text-stone-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-stone-700">{c.name}</span>
        </nav>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-stone-900 mb-2">{c.name}</h1>
        <div className="flex flex-wrap items-center gap-4 text-stone-500 text-sm mb-5">
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{c.location}</span>
          <span className="flex items-center gap-1.5"><Flag className="w-4 h-4" />{c.holes} Holes | Par {c.par}</span>
          {c.price_from && <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4" />From &euro;{c.price_from}</span>}
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img src={c.image} alt={c.name} className="w-full h-auto block max-h-[520px] object-cover" />
        </div>
      </div>
    </div>
  );
}

function ContentArea(props) {
  var c = props.course;
  var desc = props.desc;
  var mapsUrl = props.mapsUrl;
  return (
    <main className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="font-heading text-2xl md:text-3xl text-stone-900 mb-4">About {c.name}</h2>
            <p className="text-stone-600 text-base leading-relaxed">{desc}</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl text-stone-900 mb-6">Course Details</h2>
            <div className="grid grid-cols-3 gap-4">
              <InfoCard label="Holes" val={String(c.holes)} />
              <InfoCard label="Par" val={String(c.par)} />
              <InfoCard label="Green Fee" val={'EUR' + c.price_from} />
            </div>
          </section>
          <FeatsSection feats={c.features} />
        </div>
        <div className="space-y-6">
          <BookingCard course={c} />
          <LocationCard course={c} mapsUrl={mapsUrl} />
        </div>
      </div>
    </main>
  );
}

function InfoCard(props) {
  return (
    <div className="bg-white rounded-xl p-4 border border-stone-100 shadow-sm">
      <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">{props.label}</p>
      <p className="text-stone-900 font-semibold">{props.val}</p>
    </div>
  );
}

function FeatsSection(props) {
  if (!props.feats || props.feats.length === 0) return null;
  var items = props.feats;
  return (
    <section>
      <h2 className="font-heading text-2xl text-stone-900 mb-6">Facilities</h2>
      <div className="flex flex-wrap gap-3">
        {items.map(function(f, i) {
          return <span key={i} className="px-4 py-2 bg-white border border-stone-200 rounded-full text-stone-700 text-sm font-medium shadow-sm">{f}</span>;
        })}
      </div>
    </section>
  );
}

function BookingCard(props) {
  var c = props.course;
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm sticky top-24">
      <h3 className="font-heading text-xl text-stone-900 mb-2">Book Your Tee Time</h3>
      {c.price_from && (
        <div className="bg-stone-50 rounded-xl p-4 mb-4">
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Green Fee From</p>
          <p className="text-3xl font-bold text-stone-900">&euro;{c.price_from}</p>
          <p className="text-xs text-stone-500 mt-1">per person</p>
        </div>
      )}
      <a href={c.booking_url} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-black text-[#CCFF00] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black/80 transition-all shadow-md">
        Book a Tee Time Now <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function LocationCard(props) {
  var c = props.course;
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
      <h3 className="font-heading text-lg text-stone-900 mb-3">Location</h3>
      <div className="flex items-start gap-3 mb-4">
        <Navigation className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-stone-700 font-medium">{c.location}</p>
          {c.full_address && <p className="text-stone-500 text-sm mt-1">{c.full_address}</p>}
        </div>
      </div>
      <a href={props.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900">
        <MapPin className="w-4 h-4" /> Open in Google Maps
      </a>
    </div>
  );
}

function SimpleFooter() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-xs">{new Date().getFullYear()} GOLFGATE Catalunya.</p>
        <div className="flex gap-6 text-xs text-white/40">
          <Link to="/privacy" className="hover:text-white/70">Privacy</Link>
          <Link to="/terms" className="hover:text-white/70">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
