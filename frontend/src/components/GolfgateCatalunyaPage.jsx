import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, ExternalLink, Globe, Clock, Shield, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { CatalunyaCourseCard } from './CatalunyaCourseCard';
import { CatalunyaQuickView } from './CatalunyaQuickView';

var API = process.env.REACT_APP_BACKEND_URL;
var LOGO = 'https://customer-assets.emergentagent.com/job_booking-landing/artifacts/ot2drdmb_with_padding.png';
var HERO_BG = 'https://res.cloudinary.com/greenfee365/image/upload/w_1920,h_900,c_fill/courses/camiral-golf-wellness-stadium/camiral-golf-wellness-stadium';

function XIcon() {
  return (
    <svg className="w-5 h-5 text-white/80 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LogoImage(props) {
  var size = props.size || 'nav';
  var isNav = size === 'nav';
  var cls = isNav ? 'h-14 md:h-18 w-auto' : 'h-14 w-auto';
  return (
    <img
      src={LOGO}
      alt="GOLFGATE Catalunya"
      className={cls}
      style={{ mixBlendMode: 'multiply', filter: 'brightness(1.08) contrast(1.1)' }}
    />
  );
}

export default function GolfgateCatalunyaPage() {
  var coursesState = useState([]);
  var courses = coursesState[0];
  var setCourses = coursesState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];
  var quickViewState = useState(null);
  var quickViewItem = quickViewState[0];
  var setQuickViewItem = quickViewState[1];

  useEffect(function() {
    window.scrollTo(0, 0);
    document.title = 'GOLFGATE Catalunya | Book Tee Times at 20 Premium Golf Courses in Catalunya';

    var setMeta = function(attr, name, content) {
      var el = document.querySelector('meta[' + attr + '="' + name + '"]');
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', 'Book tee times at 20 premier golf courses in Catalunya Spain. Camiral Resort, El Prat, Infinitum, Emporda and more. Green fees from EUR35. Instant confirmation.');
    setMeta('name', 'keywords', 'golf Catalunya, tee times Catalunya, golf courses Barcelona, PGA Catalunya, golf Costa Brava, golf Girona, book tee times Spain, Camiral Golf, Infinitum Golf');
    setMeta('property', 'og:title', 'GOLFGATE Catalunya | Book Tee Times');
    setMeta('property', 'og:description', 'Book tee times at 20 premier golf courses across Catalunya. Instant confirmation, best rates.');
    setMeta('property', 'og:type', 'website');

    var schema = document.getElementById('golfgate-schema');
    if (!schema) { schema = document.createElement('script'); schema.id = 'golfgate-schema'; schema.type = 'application/ld+json'; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'GOLFGATE Catalunya',
      description: 'Book tee times at 20 premier golf courses in Catalunya Spain.',
      url: window.location.href,
      provider: { '@type': 'Organization', name: 'GOLFGATE Catalunya' },
      offers: { '@type': 'AggregateOffer', priceCurrency: 'EUR', lowPrice: '35', highPrice: '137', offerCount: '20' }
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

  var currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white" data-testid="golfgate-catalunya-page">

      {/* Navbar - taller, text logo on left, no image box */}
      <nav className="sticky top-0 z-40 shadow-md" style={{ backgroundColor: '#CCFF00' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <LogoImage size="nav" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-black/80">
            <a href="#courses" className="hover:text-[#38A711] transition-colors">Courses</a>
            <a href="#about" className="hover:text-[#38A711] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#38A711] transition-colors">Contact</a>
          </div>
          <a href="#courses" className="bg-black text-[#CCFF00] px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black/80 transition-all shadow-sm">
            Book Now
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" data-testid="golfgate-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Golf Course Catalunya" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-44 text-center">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-2xl leading-tight">
            Book Golf Tee Times<br />in Catalunya
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-body max-w-2xl mx-auto mb-10 drop-shadow-lg">
            20 premier courses from Barcelona to Costa Brava. Championship layouts, coastal gems, and mountain retreats. Green fees from EUR 35.
          </p>
          <a href="#courses" className="inline-flex items-center gap-2 bg-[#CCFF00] text-black px-8 py-4 rounded-full font-bold text-base hover:bg-[#DFFF00] transition-all shadow-lg hover:shadow-xl">
            Explore Courses &amp; Book <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20" data-testid="golfgate-about">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-4">Your Gateway to Golf in Catalunya</h2>
          <div className="w-16 h-1 bg-[#89F336] mx-auto rounded-full mb-6" />
          <p className="text-stone-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Catalunya is home to some of Europe's most spectacular golf courses, from the world-renowned Camiral Resort (formerly PGA Catalunya) to hidden gems nestled along the Costa Brava coastline. With 20 courses spanning Barcelona, Girona, Tarragona, and the Pyrenees, we make booking your perfect round effortless.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureBox icon={<Globe className="w-7 h-7" />} title="20 Premier Courses" text="Championship courses, coastal layouts, and mountain retreats across Catalunya." />
          <FeatureBox icon={<Clock className="w-7 h-7" />} title="Instant Confirmation" text="Book online and receive instant confirmation. No waiting, no phone calls." />
          <FeatureBox icon={<Shield className="w-7 h-7" />} title="Best Rate Guarantee" text="We negotiate directly with courses to offer the best green fee rates. From EUR 35." />
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-16 md:py-20" style={{ backgroundColor: '#ffffff' }} data-testid="golfgate-courses">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-4">Golf Courses in Catalunya</h2>
            <div className="w-16 h-1 bg-[#89F336] mx-auto rounded-full mb-6" />
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              From Barcelona to the Pyrenees, discover and book tee times at the finest courses in the region. Hover the cards for details and booking links.
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-stone-300 border-t-[#89F336] rounded-full animate-spin" />
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
      <section className="py-16 md:py-20" style={{ backgroundColor: '#CCFF00' }} data-testid="golfgate-cta">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-black mb-4">Ready to Play?</h2>
          <p className="text-black/70 text-lg mb-8 max-w-2xl mx-auto">
            Choose from 20 premier courses across Catalunya. Instant confirmation, best rates, and local expertise to help you plan the perfect golf day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#courses" className="inline-flex items-center gap-2 bg-black text-[#CCFF00] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-black/80 transition-all shadow-lg">
              Book a Tee Time <ExternalLink className="w-4 h-4" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 border-2 border-black text-black px-8 py-3.5 rounded-full font-bold text-sm hover:bg-black hover:text-[#CCFF00] transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20" data-testid="golfgate-contact">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-4">Get in Touch</h2>
          <div className="w-16 h-1 bg-[#89F336] mx-auto rounded-full mb-6" />
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

      {/* Footer - GIM style */}
      <footer className="bg-[#1a1a1a] text-white py-16" data-testid="footer">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <img src={LOGO} alt="GOLFGATE Catalunya" className="h-14 w-auto" style={{ filter: 'brightness(10) contrast(1.5)' }} />
              <p className="text-white/60 max-w-md mt-4 mb-6 text-sm leading-relaxed">
                The premier tee time booking service for golf courses across Catalunya, Spain. From Barcelona to the Costa Brava and the Pyrenees.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#CCFF00] hover:text-black transition-all group" aria-label="Facebook">
                  <Facebook className="w-5 h-5 text-white/80 group-hover:text-black" />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#CCFF00] hover:text-black transition-all group" aria-label="Instagram">
                  <Instagram className="w-5 h-5 text-white/80 group-hover:text-black" />
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#CCFF00] hover:text-black transition-all group" aria-label="X">
                  <XIcon />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/90">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#courses" className="text-white/60 hover:text-[#CCFF00] transition-colors text-sm">Golf Courses</a></li>
                <li><a href="#about" className="text-white/60 hover:text-[#CCFF00] transition-colors text-sm">About Us</a></li>
                <li><a href="#contact" className="text-white/60 hover:text-[#CCFF00] transition-colors text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/90">Contact Info</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><a href="tel:+34620987575" className="hover:text-[#CCFF00] transition-colors">+34 620 987 575</a></li>
                <li><a href="mailto:contact@golfgatecatalunya.com" className="hover:text-[#CCFF00] transition-colors">contact@golfgatecatalunya.com</a></li>
                <li>Barcelona, Catalunya, Spain</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs">{currentYear} GOLFGATE Catalunya. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-white/40">
              <Link to="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {quickViewItem && <CatalunyaQuickView course={quickViewItem} onClose={function() { setQuickViewItem(null); }} />}
    </div>
  );
}

function FeatureBox(props) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm text-center">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-black mx-auto mb-4" style={{ backgroundColor: '#CCFF00' }}>
        {props.icon}
      </div>
      <h3 className="font-heading text-lg text-stone-900 mb-2">{props.title}</h3>
      <p className="text-stone-500 text-sm">{props.text}</p>
    </div>
  );
}

function ContactBox(props) {
  var content = props.href ? (
    <a href={props.href} className="text-stone-500 text-sm hover:text-[#38A711] transition-colors">{props.value}</a>
  ) : (
    <p className="text-stone-500 text-sm">{props.value}</p>
  );
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm text-center">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-black mx-auto mb-3" style={{ backgroundColor: '#CCFF00' }}>
        {props.icon}
      </div>
      <h3 className="font-heading text-base text-stone-900 mb-1">{props.title}</h3>
      {content}
    </div>
  );
}
