import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, ExternalLink, Globe, Clock, Shield, Mail, Phone, MapPin } from 'lucide-react';
import { CatalunyaCourseCard } from './CatalunyaCourseCard';
import { CatalunyaQuickView } from './CatalunyaQuickView';

const API = process.env.REACT_APP_BACKEND_URL;
const LOGO = 'https://customer-assets.emergentagent.com/job_booking-landing/artifacts/ot2drdmb_with_padding.png';
const HERO_BG = 'https://images.unsplash.com/photo-1602523234690-254793b8dd40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwyfHxnb2xmJTIwY291cnNlJTIwU3BhaW58ZW58MHx8fHwxNzc0Mzc3NTUzfDA&ixlib=rb-4.1.0&q=85&w=1920&h=900&fit=crop';

export default function GolfgateCatalunyaPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewItem, setQuickViewItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'GOLFGATE Catalunya | Book Tee Times at 12 Premium Golf Courses';

    const setMeta = (attr, name, content) => {
      let el = document.querySelector('meta[' + attr + '="' + name + '"]');
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', 'Book tee times at 12 premier golf courses in Catalunya Spain. PGA Catalunya Resort to Costa Brava coastal courses. Green fees from EUR45. Instant confirmation.');
    setMeta('name', 'keywords', 'golf Catalunya, tee times Catalunya, golf courses Barcelona, PGA Catalunya, golf Costa Brava, golf Girona, book tee times Spain');
    setMeta('property', 'og:title', 'GOLFGATE Catalunya | Book Tee Times at Premium Golf Courses');
    setMeta('property', 'og:description', 'Book tee times at 12 premier golf courses across Catalunya. Instant confirmation best rates.');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:image', LOGO);

    var schema = document.getElementById('golfgate-schema');
    if (!schema) { schema = document.createElement('script'); schema.id = 'golfgate-schema'; schema.type = 'application/ld+json'; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'GOLFGATE Catalunya',
      description: 'Book tee times at 12 premier golf courses in Catalunya Spain.',
      url: window.location.href,
      provider: {
        '@type': 'Organization',
        name: 'GOLFGATE Catalunya'
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        lowPrice: '45',
        highPrice: '120',
        offerCount: '12'
      }
    });

    axios.get(API + '/api/catalunya-courses')
      .then(function(res) { setCourses(res.data); })
      .catch(function(err) { console.error('Error fetching courses:', err); })
      .finally(function() { setLoading(false); });

    return function() {
      var s = document.getElementById('golfgate-schema');
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream" data-testid="golfgate-catalunya-page">

      {/* Navbar */}
      <nav className="bg-[#fdee6c] sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/golfgate-catalunya" className="flex items-center gap-3">
            <img src={LOGO} alt="GOLFGATE Catalunya" className="h-12 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#f53d7d]">
            <a href="#courses" className="hover:opacity-70 transition-opacity">Courses</a>
            <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
            <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
          </div>
          <a href="#courses" className="bg-[#f53d7d] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#e0356f] transition-all shadow-sm">
            Book Now
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" data-testid="golfgate-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Golf Course Catalunya" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36 text-center">
          <img src={LOGO} alt="GOLFGATE Catalunya" className="h-28 md:h-40 w-auto mx-auto mb-6 drop-shadow-2xl" />
          <p className="text-white/90 text-lg md:text-xl font-body max-w-2xl mx-auto mb-8 drop-shadow-lg">
            Book tee times at Catalunya's finest golf courses. From championship layouts near Barcelona to stunning coastal courses on the Costa Brava.
          </p>
          <a href="#courses" className="inline-flex items-center gap-2 bg-[#f53d7d] text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-[#e0356f] transition-all shadow-lg hover:shadow-xl">
            Explore Courses &amp; Book <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20" data-testid="golfgate-about">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-4">Your Gateway to Golf in Catalunya</h2>
          <div className="w-16 h-1 bg-[#f53d7d] mx-auto rounded-full mb-6" />
          <p className="text-stone-500 text-lg max-w-3xl mx-auto leading-relaxed">
            Catalunya is home to some of Europe's most spectacular golf courses, from the world-renowned PGA Catalunya Resort to hidden gems nestled along the Costa Brava coastline. With 12 premier courses spanning Barcelona, Girona, and the Pyrenees, we make booking your perfect round effortless.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureBox icon={<Globe className="w-7 h-7" />} title="12 Premier Courses" text="Championship courses, coastal layouts, and mountain retreats across Catalunya." />
          <FeatureBox icon={<Clock className="w-7 h-7" />} title="Instant Confirmation" text="Book online and receive instant confirmation. No waiting, no phone calls." />
          <FeatureBox icon={<Shield className="w-7 h-7" />} title="Best Rate Guarantee" text="We negotiate directly with courses to offer the best green fee rates. From EUR 45." />
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="bg-white py-16 md:py-20" data-testid="golfgate-courses">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-4">Golf Courses in Catalunya</h2>
            <div className="w-16 h-1 bg-[#f53d7d] mx-auto rounded-full mb-6" />
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              From Barcelona to the Pyrenees, discover and book tee times at the finest courses in the region. Hover the cards for details and booking links.
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-stone-300 border-t-[#f53d7d] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(function(course) {
                return <CatalunyaCourseCard key={course.id} course={course} onQuickView={setQuickViewItem} />;
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#fdee6c] py-16 md:py-20" data-testid="golfgate-cta">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-4">Ready to Play?</h2>
          <p className="text-stone-700 text-lg mb-8 max-w-2xl mx-auto">
            Choose from 12 premier courses across Catalunya. Instant confirmation, best rates, and local expertise to help you plan the perfect golf day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#courses" className="inline-flex items-center gap-2 bg-[#f53d7d] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#e0356f] transition-all shadow-lg">
              Book a Tee Time <ExternalLink className="w-4 h-4" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 border-2 border-stone-800 text-stone-800 px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-stone-800 hover:text-white transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20" data-testid="golfgate-contact">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-4">Get in Touch</h2>
          <div className="w-16 h-1 bg-[#f53d7d] mx-auto rounded-full mb-6" />
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Need help choosing a course or planning a golf trip in Catalunya? Our team is here to help.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <ContactBox icon={<Mail className="w-6 h-6" />} title="Email" value="contact@golfgatecatalunya.com" href="mailto:contact@golfgatecatalunya.com" />
          <ContactBox icon={<Phone className="w-6 h-6" />} title="Phone" value="+34 620 987 575" href="tel:+34620987575" />
          <ContactBox icon={<MapPin className="w-6 h-6" />} title="Location" value="Barcelona, Catalunya, Spain" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <img src={LOGO} alt="GOLFGATE Catalunya" className="h-14 w-auto mb-4" />
              <p className="text-stone-400 text-sm leading-relaxed">
                The premier tee time booking service for golf courses across Catalunya, Spain. From Barcelona to the Costa Brava and the Pyrenees.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-300 mb-4">Featured Courses</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><a href="#courses" className="hover:text-[#f53d7d] transition-colors">PGA Catalunya - Stadium</a></li>
                <li><a href="#courses" className="hover:text-[#f53d7d] transition-colors">Real Club de Golf El Prat</a></li>
                <li><a href="#courses" className="hover:text-[#f53d7d] transition-colors">Club de Golf Terramar</a></li>
                <li><a href="#courses" className="hover:text-[#f53d7d] transition-colors">Club de Golf Emporda</a></li>
                <li><a href="#courses" className="hover:text-[#f53d7d] transition-colors">Golf d'Aro - Mas Nou</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-300 mb-4">Golf Regions</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>Barcelona and Surroundings</li>
                <li>Costa Brava</li>
                <li>Girona Province</li>
                <li>Pyrenees</li>
                <li>Sitges and Garraf Coast</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-stone-500 text-xs">2025 GOLFGATE Catalunya. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs text-stone-500">
              <Link to="/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {quickViewItem && <CatalunyaQuickView course={quickViewItem} onClose={function() { setQuickViewItem(null); }} />}
    </div>
  );
}

function FeatureBox({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm text-center">
      <div className="w-14 h-14 bg-[#fdee6c] rounded-xl flex items-center justify-center text-[#f53d7d] mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-heading text-lg text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-500 text-sm">{text}</p>
    </div>
  );
}

function ContactBox({ icon, title, value, href }) {
  var content = href ? (
    <a href={href} className="text-stone-500 text-sm hover:text-[#f53d7d] transition-colors">{value}</a>
  ) : (
    <p className="text-stone-500 text-sm">{value}</p>
  );
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm text-center">
      <div className="w-12 h-12 bg-[#fdee6c] rounded-xl flex items-center justify-center text-[#f53d7d] mx-auto mb-3">
        {icon}
      </div>
      <h3 className="font-heading text-base text-stone-900 mb-1">{title}</h3>
      {content}
    </div>
  );
}
