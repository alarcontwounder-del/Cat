import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, ExternalLink, Globe, Clock, Shield, Mail, Phone, MapPin, Instagram, Facebook, Settings, ChevronDown } from 'lucide-react';
import { CatalunyaCourseCard } from './CatalunyaCourseCard';
import { CatalunyaQuickView } from './CatalunyaQuickView';
import { CatalunyaWeather } from './CatalunyaWeather';
import TRANSLATIONS from './translations';

var API = process.env.REACT_APP_BACKEND_URL;
var LOGO = '/golfgate-logo-transparent.png';
var HERO_BG = 'https://res.cloudinary.com/greenfee365/image/upload/w_1920,h_900,c_fill/courses/camiral-golf-wellness-stadium/camiral-golf-wellness-stadium';

var LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Espanol' },
  { code: 'ca', label: 'CA', name: 'Catala' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'fr', label: 'FR', name: 'Francais' },
  { code: 'sv', label: 'SE', name: 'Svenska' }
];

function XIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
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
  var langState = useState(localStorage.getItem('golfgate_lang') || 'en');
  var lang = langState[0];
  var setLang = langState[1];
  var langDropdownState = useState(false);
  var langDropdown = langDropdownState[0];
  var setLangDropdown = langDropdownState[1];
  var hotelsState = useState([]);
  var hotels = hotelsState[0];
  var setHotels = hotelsState[1];
  var hotelsLoadingState = useState(true);
  var hotelsLoading = hotelsLoadingState[0];
  var setHotelsLoading = hotelsLoadingState[1];
  var blogPostsState = useState([]);
  var blogPosts = blogPostsState[0];
  var setBlogPosts = blogPostsState[1];

  var t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  function changeLang(code) {
    setLang(code);
    localStorage.setItem('golfgate_lang', code);
    setLangDropdown(false);
  }

  useEffect(function() {
    window.scrollTo(0, 0);
    document.title = 'Golf Catalunya | Book Tee Times at 20 Golf Courses in Catalunya, Spain';

    var setMeta = function(attr, name, content) {
      var el = document.querySelector('meta[' + attr + '="' + name + '"]');
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', 'Book tee times online at 20 golf courses in Catalunya, Spain. Golf near Barcelona, Costa Brava, Girona and Tarragona. Green fees from EUR35. Instant confirmation. Camiral, El Prat, Infinitum, Emporda and more.');
    setMeta('name', 'keywords', 'golf catalunya, golf catalonia, book tee times catalonia, golf courses near barcelona, golf costa brava, golf girona spain, catalonia golf holidays, golf holidays catalonia, play golf catalonia, golf resorts catalonia, golf near barcelona, best golf courses catalonia, golf travel catalonia, catalonia golf green fees, online tee times catalonia, golf day trips from barcelona');
    setMeta('property', 'og:title', 'Golf Catalunya | Book Tee Times at 20 Premier Golf Courses');
    setMeta('property', 'og:description', 'Book tee times online at 20 golf courses across Catalunya, Spain. Golf near Barcelona, Costa Brava, Girona. Green fees from EUR35.');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'GOLFGATE Catalunya');
    setMeta('name', 'robots', 'index, follow');
    setMeta('name', 'geo.region', 'ES-CT');
    setMeta('name', 'geo.placename', 'Catalunya');

    var schema = document.getElementById('golfgate-schema');
    if (!schema) { schema = document.createElement('script'); schema.id = 'golfgate-schema'; schema.type = 'application/ld+json'; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'WebSite', name: 'GOLFGATE Catalunya',
      description: 'Book tee times online at 20 premier golf courses in Catalunya, Spain. Golf near Barcelona, Costa Brava, Girona and Tarragona.',
      url: window.location.href,
      provider: { '@type': 'Organization', name: 'GOLFGATE Catalunya', areaServed: 'Catalunya, Spain' },
      offers: { '@type': 'AggregateOffer', priceCurrency: 'EUR', lowPrice: '35', highPrice: '137', offerCount: '20' }
    });

    axios.get(API + '/api/catalunya-courses')
      .then(function(res) { setCourses(res.data); })
      .catch(function(err) { console.error('Error fetching courses:', err); })
      .finally(function() { setLoading(false); });

    axios.get(API + '/api/catalunya-hotels')
      .then(function(res) { setHotels(res.data); })
      .catch(function() {})
      .finally(function() { setHotelsLoading(false); });

    axios.get(API + '/api/blog-posts')
      .then(function(res) { setBlogPosts(res.data); })
      .catch(function() {});

    return function() {
      var s = document.getElementById('golfgate-schema');
      if (s) s.remove();
    };
  }, []);

  // Scroll-triggered animations
  useEffect(function() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up, .stagger-children, .accent-line').forEach(function(el) {
      observer.observe(el);
    });
    return function() { observer.disconnect(); };
  }, [loading]);

  var currentLang = LANGUAGES.find(function(l) { return l.code === lang; }) || LANGUAGES[0];

  return (
    <div className="min-h-screen bg-white" data-testid="golfgate-catalunya-page">

      {/* Navbar - GIM style: logo, links, language, weather, admin, CTA */}
      <nav className="sticky top-0 z-40 shadow-md" style={{ backgroundColor: '#CCFF00' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/golfgate-logo-nav.png" alt="GOLFGATE Catalunya" className="h-12 md:h-20 w-auto" />
          </Link>

          {/* Nav links with separator */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-black/80">
            <a href="#courses" className="hover:text-[#f6416c] transition-colors">{t.nav.courses}</a>
            <Link to="/hotels" className="hover:text-[#f6416c] transition-colors">Hotels</Link>
            <Link to="/compare" className="hover:text-[#f6416c] transition-colors">Compare</Link>
            <span className="w-px h-5 bg-black/20 rounded-full" />
            <a href="#about" className="hover:text-[#f6416c] transition-colors">{t.nav.about}</a>
            <a href="#contact" className="hover:text-[#f6416c] transition-colors">{t.nav.contact}</a>
            <Link to="/blog" className="hover:text-[#f6416c] transition-colors">{t.nav.blog}</Link>
          </div>

          {/* Right side: Language + Weather + Admin */}
          <div className="flex items-center gap-3">
            {/* Language dropdown - GIM exact structure */}
            <div className="relative" onMouseEnter={function() { setLangDropdown(true); }} onMouseLeave={function() { setLangDropdown(false); }}>
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border transition-colors duration-300 text-sm border-black/30 text-black/80 hover:border-black/50"
                data-testid="language-selector"
              >
                <span className="text-sm font-semibold">{currentLang.label}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {langDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-black/60 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 py-1 min-w-[140px] z-50">
                  {LANGUAGES.map(function(l) {
                    return (
                      <button
                        key={l.code}
                        onClick={function() { changeLang(l.code); }}
                        className={'w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors flex items-center justify-between ' + (lang === l.code ? 'text-[#CCFF00] font-semibold' : 'text-white/80')}
                      >
                        <span>{l.name}</span>
                        <span className="text-xs text-white/40">{l.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <CatalunyaWeather />

            {/* Admin/Settings icon */}
            <Link
              to="/admin"
              className="hidden sm:flex items-center justify-center text-black hover:text-black/70 transition-colors"
              title="Admin Panel"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" data-testid="golfgate-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Golf Course Catalunya" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-40 text-center">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-2xl leading-tight">
            {t.hero.title1}<br />{t.hero.title2}
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-body max-w-2xl mx-auto mb-10 drop-shadow-lg">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://golfinmallorca.greenfee365.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl" style={{ backgroundColor: '#f6416c' }}>
              {t.nav.bookCta} <ExternalLink className="w-4 h-4" />
            </a>
            <a href="#courses" onClick={function(e) { e.preventDefault(); document.getElementById('courses')?.scrollIntoView({behavior: 'smooth'}); }} className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-white/15 backdrop-blur-md text-white border border-white/30 hover:bg-white/25 transition-all duration-300 shadow-lg">
              {t.hero.cta} <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        {/* Scroll indicator - GIM style */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
          <span className="text-white/60 text-xs tracking-[0.3em] uppercase font-light">{t.scroll}</span>
          <div className="scroll-mouse">
            <div className="scroll-mouse-dot" />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20" data-testid="golfgate-about" style={{ background: 'linear-gradient(180deg, white 0%, #FAFFF0 100%)' }}>
        <div className="text-center mb-12 fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-4">{t.about.subtitle}</h2>
          <div className="h-1 mx-auto rounded-full mb-6 accent-line" style={{ background: 'linear-gradient(90deg, #CCFF00, #FFFF00, #DFFF00)' }} />
          <p className="text-stone-600 text-lg max-w-3xl mx-auto leading-relaxed">
            {t.about.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          <FeatureBox icon={<Globe className="w-7 h-7" />} title={t.about.feat1Title} text={t.about.feat1Text} color="#CCFF00" />
          <FeatureBox icon={<Clock className="w-7 h-7" />} title={t.about.feat2Title} text={t.about.feat2Text} color="#DFFF00" />
          <FeatureBox icon={<Shield className="w-7 h-7" />} title={t.about.feat3Title} text={t.about.feat3Text} color="#FFFF00" />
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-16 md:py-20" data-testid="golfgate-courses">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-4">{t.courses.title}</h2>
            <div className="h-1 mx-auto rounded-full mb-6 accent-line" style={{ background: 'linear-gradient(90deg, #CCFF00, #FFFF00, #DFFF00)' }} />
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              {t.courses.subtitle}
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-stone-300 border-t-[#89F336] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map(function(course) {
                return <CatalunyaCourseCard key={course.id} course={course} onQuickView={setQuickViewItem} />;
              })}
            </div>
          )}
        </div>
      </section>

      {/* Hotels Section - on homepage */}
      <section id="hotels" className="py-16 md:py-20 bg-stone-50" data-testid="golfgate-hotels">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12 fade-in-up">
            <p className="text-stone-500 text-sm uppercase tracking-[0.2em] mb-4">Golf Resorts & Hotels</p>
            <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-4">Luxury Golf Hotels in Catalunya</h2>
            <div className="h-1 mx-auto rounded-full mb-6 accent-line" style={{ background: 'linear-gradient(90deg, #CCFF00, #FFFF00, #DFFF00)' }} />
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">Stay and play at Catalunya's finest golf hotels and resorts. Book your stay at exclusive rates near the best courses in the region.</p>
          </div>
          {hotelsLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-8 h-8 border-4 border-stone-300 border-t-[#89F336] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.slice(0, 3).map(function(hotel) {
                return (
                  <Link to="/hotels" key={hotel.id} className="bg-white border border-stone-100 rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow card-hover-lift">
                    <div className="h-48 overflow-hidden">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-lg text-stone-900 mb-1">{hotel.name}</h3>
                      <p className="text-stone-400 text-xs mb-2">{hotel.location}</p>
                      <p className="text-stone-500 text-sm" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{hotel.description}</p>
                      <p className="mt-3"><span className="text-xs uppercase tracking-wider text-stone-400">From </span><span className="text-lg font-semibold text-stone-800">&euro;{hotel.price_from}</span><span className="text-xs text-stone-400">/night</span></p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/hotels" className="inline-flex items-center gap-2 bg-black text-[#CCFF00] px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-all">
              View All Hotels <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20" style={{ background: 'linear-gradient(135deg, #CCFF00 0%, #DFFF00 50%, #FFFF00 100%)' }} data-testid="golfgate-cta">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-black mb-4">{t.cta.title}</h2>
          <p className="text-black/70 text-lg mb-8 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#courses" className="inline-flex items-center gap-2 bg-black text-[#CCFF00] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-black/80 transition-all shadow-lg">
              {t.cta.bookBtn} <ExternalLink className="w-4 h-4" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 border-2 border-black text-black px-8 py-3.5 rounded-full font-bold text-sm hover:bg-black hover:text-[#CCFF00] transition-all">
              {t.cta.contactBtn}
            </a>
          </div>
        </div>
      </section>

      {/* Play Golf Wherever You Are - Banner (exact GIM code) */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-10" data-testid="worldwide-banner">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/3129262/pexels-photo-3129262.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(45,45,45,0.95), rgba(45,45,45,0.85), rgba(45,45,45,0.70))' }} />
          <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                <Globe className="w-4 h-4" style={{ color: '#c8983c' }} />
                <span className="text-white/90 text-sm font-medium">Worldwide Tee Times</span>
              </div>
              <h3 className="font-heading text-3xl md:text-4xl text-white mb-4">Play Golf Wherever You Are</h3>
              <p className="text-white/80 text-lg leading-relaxed">Planning your trip? Book tee times in your home country, destination city, or almost anywhere in the world &ndash; before or during your travels.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <a href="https://greenfee365.com/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 bg-white text-stone-800 px-6 py-3 rounded-full font-semibold text-sm hover:bg-stone-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span>Explore Courses &amp; Book Tee Times Worldwide</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <span className="text-white/60 text-sm">Over 3,000 courses available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      {blogPosts.length > 0 && (
        <section id="blog" className="py-16 md:py-20" data-testid="golfgate-blog">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12 fade-in-up">
              <p className="text-stone-500 text-sm uppercase tracking-[0.2em] mb-4">{t.blog.subtitle}</p>
              <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-4">{t.blog.title}</h2>
              <div className="h-1 mx-auto rounded-full mb-6 accent-line" style={{ background: 'linear-gradient(90deg, #CCFF00, #FFFF00, #DFFF00)' }} />
              <p className="text-stone-500 text-lg max-w-2xl mx-auto">{t.blog.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map(function(post) {
                return (
                  <Link to={'/blog/' + post.id} key={post.id} className="bg-white border border-stone-100 rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow card-hover-lift">
                    {post.image && (
                      <div className="overflow-hidden aspect-[3/2]">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-stone-400 text-xs mb-2">{post.category}</p>
                      <h3 className="font-heading text-lg text-stone-900 mb-2 group-hover:text-stone-600 transition-colors" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</h3>
                      <p className="text-stone-500 text-sm" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.content && post.content.substring(0, 120) + '...'}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Link to="/blog" className="inline-flex items-center gap-2 bg-black text-[#CCFF00] px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-all">
                {t.blog.readMore} <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20" data-testid="golfgate-contact">
        <div className="text-center mb-10 fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-4">{t.contact.title}</h2>
          <div className="h-1 mx-auto rounded-full mb-6 accent-line" style={{ background: 'linear-gradient(90deg, #CCFF00, #FFFF00, #DFFF00)' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <ContactBox icon={<Mail className="w-6 h-6" />} title={t.contact.email} value="contact@golfgatecatalunya.es" href="mailto:contact@golfgatecatalunya.es" color="#CCFF00" />
          <ContactBox icon={<Phone className="w-6 h-6" />} title={t.contact.phone} value="+34 620 987 575" href="tel:+34620987575" color="#DFFF00" />
          <ContactBox icon={<MapPin className="w-6 h-6" />} title={t.contact.location} value="Barcelona, Catalunya, Spain" color="#FFFF00" />
        </div>
      </section>

      {/* Footer - GIM 3-column layout, BLACK background */}
      <footer className="text-white/80 py-14" style={{ backgroundColor: '#1a1a1a' }} data-testid="footer">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Main grid: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Column 1: Logo + Description + Social */}
            <div>
              <img src="/golfgate-logo-footer.png" alt="GOLFGATE Catalunya" className="h-10 w-auto mb-4" />
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {t.footer.description}
              </p>
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all" aria-label="Facebook">
                  <Facebook className="w-4 h-4 text-white/70" />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all" aria-label="Instagram">
                  <Instagram className="w-4 h-4 text-white/70" />
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all" aria-label="X">
                  <XIcon />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-heading text-white text-base mb-4">{t.footer.quickLinks}</h4>
              <ul className="space-y-2.5">
                <li><a href="#hero" className="text-white/50 text-sm hover:text-white transition-colors">{t.footer.home}</a></li>
                <li><Link to="/courses" className="text-white/50 text-sm hover:text-white transition-colors">{t.footer.golfCourses} Info</Link></li>
                <li><Link to="/blog" className="text-white/50 text-sm hover:text-white transition-colors">{t.nav.blog}</Link></li>
                <li><Link to="/compare" className="text-white/50 text-sm hover:text-white transition-colors">Compare Courses</Link></li>
                <li><a href="#about" className="text-white/50 text-sm hover:text-white transition-colors">{t.nav.about}</a></li>
                <li><a href="#contact" className="text-white/50 text-sm hover:text-white transition-colors">{t.nav.contact}</a></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h4 className="font-heading text-white text-base mb-4">{t.footer.services}</h4>
              <ul className="space-y-2.5">
                <li><a href="#courses" className="text-white/50 text-sm hover:text-white transition-colors">{t.footer.bookTee}</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info section */}
          <div className="mb-8">
            <h4 className="font-heading text-white text-base mb-4">{t.footer.contactInfo}</h4>
            <div className="space-y-2">
              <p className="text-white/50 text-sm">+34 620 987 575</p>
              <a href="mailto:contact@golfgatecatalunya.es" className="text-white/50 text-sm hover:text-white transition-colors block">contact@golfgatecatalunya.es</a>
              <p className="text-white/50 text-sm">Barcelona, CT, Spain</p>
              <p className="text-sm">Website: <a href="https://golfgatecatalunya.es" target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:text-[#DFFF00] transition-colors">golfgatecatalunya.es</a></p>
            </div>
          </div>

          {/* Divider + Copyright */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} Golfgatecatalunya.es&reg;. {t.footer.copyright}</p>
            <div className="flex items-center gap-6 text-xs text-white/30">
              <Link to="/privacy" className="hover:text-white/60 transition-colors">{t.footer.privacy}</Link>
              <Link to="/terms" className="hover:text-white/60 transition-colors">{t.footer.terms}</Link>
            </div>
          </div>
        </div>
      </footer>

      {quickViewItem && <CatalunyaQuickView course={quickViewItem} onClose={function() { setQuickViewItem(null); }} />}

      {/* Cookie Consent - Glass effect */}
      <CookieConsent />
    </div>
  );
}

function FeatureBox(props) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm text-center card-hover-lift">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-black mx-auto mb-4" style={{ backgroundColor: props.color || '#CCFF00' }}>
        {props.icon}
      </div>
      <h3 className="font-heading text-lg text-stone-900 mb-2">{props.title}</h3>
      <p className="text-stone-500 text-sm">{props.text}</p>
    </div>
  );
}

function ContactBox(props) {
  var content = props.href ? (
    <a href={props.href} className="text-stone-500 text-sm hover:text-[#f6416c] transition-colors">{props.value}</a>
  ) : (
    <p className="text-stone-500 text-sm">{props.value}</p>
  );
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm text-center card-hover-lift">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-black mx-auto mb-3" style={{ backgroundColor: props.color || '#CCFF00' }}>
        {props.icon}
      </div>
      <h3 className="font-heading text-base text-stone-900 mb-1">{props.title}</h3>
      {content}
    </div>
  );
}


function CookieConsent() {
  var showState = useState(false);
  var show = showState[0];
  var setShow = showState[1];
  var currentLang = localStorage.getItem('golfgate_lang') || 'en';
  var t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  useEffect(function() {
    var accepted = localStorage.getItem('golfgate_cookies');
    if (!accepted) {
      var timer = setTimeout(function() { setShow(true); }, 800);
      return function() { clearTimeout(timer); };
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9999]" data-testid="cookie-consent">
      <div className="w-[260px] bg-black/50 backdrop-blur-md rounded-2xl shadow-lg border border-white/15 p-5 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white mx-auto mb-3">
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
          <path d="M8.5 8.5v.01" /><path d="M16 15.5v.01" /><path d="M12 12v.01" /><path d="M11 17v.01" /><path d="M7 14v.01" />
        </svg>
        <p className="text-white/90 text-[13px] leading-relaxed mb-1">{t.cookie.text}</p>
        <a href="/privacy" className="text-white/50 text-[11px] underline underline-offset-2 hover:text-white/80 transition-colors" data-testid="cookie-learn-more">{t.cookie.learn}</a>
        <button
          onClick={function() { localStorage.setItem('golfgate_cookies', 'true'); setShow(false); }}
          className="w-full mt-4 border border-white/40 text-white hover:bg-white/15 text-sm font-semibold py-2.5 rounded-lg transition-all duration-200"
          data-testid="cookie-accept-btn"
        >{t.cookie.accept}</button>
        <button
          onClick={function() { localStorage.setItem('golfgate_cookies', 'declined'); setShow(false); }}
          className="w-full mt-2 text-white/50 hover:text-white/80 text-xs font-medium py-1.5 transition-colors"
        >{t.cookie.prefs}</button>
      </div>
    </div>
  );
}
