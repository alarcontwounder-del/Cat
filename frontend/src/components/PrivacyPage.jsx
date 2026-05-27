import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  useEffect(function() {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy | GOLFGATE Catalunya';
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-40 shadow-md" style={{ backgroundColor: '#CCFF00' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0"><img src="/golfgate-logo-nav.png" alt="GOLFGATE Catalunya" className="h-12 md:h-20 w-auto" /></Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#f6416c' }}><ArrowLeft className="w-4 h-4" /> Home</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <nav className="flex items-center gap-2 text-stone-400 text-xs mb-6">
          <Link to="/" className="hover:text-stone-700">Home</Link>
          <span>&rsaquo;</span>
          <span className="text-stone-700">Privacy Policy</span>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl text-stone-900 mb-2">Privacy Policy</h1>
        <p className="text-stone-400 text-sm mb-10">Last updated: March 2026</p>

        <div className="prose prose-stone max-w-none">
          <p>golfgatecatalunya.com ("we", "us", "our") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and share your information when you visit our website or use our services, in compliance with the General Data Protection Regulation (GDPR - EU 2016/679) and the Spanish Organic Law 3/2018 on Data Protection (LOPDGDD).</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">1. Data Controller</h2>
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-100 mb-6">
            <p className="font-semibold mb-1">golfgatecatalunya.com</p>
            <p>Email: <a href="mailto:contact@golfgatecatalunya.com" className="text-[#f6416c] hover:underline">contact@golfgatecatalunya.com</a></p>
            <p>Phone: <a href="tel:+34620987575" className="text-[#f6416c] hover:underline">+34 620 987 575</a></p>
            <p>Location: Barcelona, Catalunya, Spain</p>
          </div>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">2. Information We Collect</h2>
          <p>We collect the following types of personal data:</p>
          <p className="font-semibold mt-4">Information you provide directly:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Contact inquiries:</strong> Name, email address, phone number, country, and message content when you use our contact forms</li>
            <li><strong>Tee time bookings:</strong> Name, email, phone, travel dates, golf preferences, and group size</li>
            <li><strong>Newsletter:</strong> Email address when you subscribe to our newsletter</li>
          </ul>
          <p className="font-semibold mt-4">Information collected automatically:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential cookies:</strong> Session cookies for site functionality and admin authentication</li>
            <li><strong>Local storage:</strong> Language preferences and cookie consent status</li>
          </ul>
          <p className="mt-4">We do not use Google Analytics, Facebook Pixel, or any third-party tracking, advertising, or profiling cookies.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">3. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to your inquiries (legal basis: legitimate interest, Art. 6(1)(f) GDPR)</li>
            <li>To process bookings (legal basis: contract performance, Art. 6(1)(b) GDPR)</li>
            <li>To send booking confirmations (legal basis: contract performance)</li>
            <li>To send newsletters you have subscribed to (legal basis: consent, Art. 6(1)(a) GDPR)</li>
            <li>To maintain site security and functionality (legal basis: legitimate interest, Art. 6(1)(f) GDPR)</li>
          </ul>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">4. Data Sharing</h2>
          <p>We may share your personal data with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Golf courses and hotels in Catalunya to fulfil your booking (only the data necessary for the reservation)</li>
            <li>Greenfee365 for tee time booking processing</li>
          </ul>
          <p className="mt-4">We do not sell, rent, or trade your personal data to any third party for marketing purposes.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">5. Data Retention</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact inquiries: Up to 24 months after last communication</li>
            <li>Booking records: Up to 5 years for legal and tax compliance</li>
            <li>Newsletter subscriptions: Until you unsubscribe</li>
          </ul>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">6. Your Rights</h2>
          <p>Under GDPR, you have the following rights:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Right of access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong>Right to rectification:</strong> Request correction of inaccurate or incomplete data</li>
            <li><strong>Right to erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Right to restrict processing:</strong> Request limitation of how we use your data</li>
            <li><strong>Right to data portability:</strong> Receive your data in a structured, machine-readable format</li>
            <li><strong>Right to object:</strong> Object to processing based on legitimate interest</li>
            <li><strong>Right to withdraw consent:</strong> Withdraw consent for newsletter or marketing at any time</li>
          </ul>
          <p className="mt-4">To exercise any of these rights, contact us at <a href="mailto:contact@golfgatecatalunya.com" className="text-[#f6416c] hover:underline">contact@golfgatecatalunya.com</a>. We will respond within 30 days.</p>
          <p>You also have the right to lodge a complaint with the Spanish Data Protection Agency (AEPD) at <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#f6416c] hover:underline">www.aepd.es</a>.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">7. Cookies</h2>
          <p>Our website uses only essential cookies necessary for the site to function:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Session cookies:</strong> For admin authentication (strictly necessary)</li>
            <li><strong>Local storage:</strong> Language preference and cookie consent choice</li>
          </ul>
          <p className="mt-4">We do not use advertising, analytics, or third-party tracking cookies of any kind.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">8. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal data, including HTTPS encryption, restricted access to personal data, and regular security reviews.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Significant changes will be communicated through our website.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">10. Contact</h2>
          <p>For any questions regarding this Privacy Policy, please contact us at <a href="mailto:contact@golfgatecatalunya.com" className="text-[#f6416c] hover:underline">contact@golfgatecatalunya.com</a> or call <a href="tel:+34620987575" className="text-[#f6416c] hover:underline">+34 620 987 575</a>.</p>
        </div>
      </div>
    </div>
  );
}
