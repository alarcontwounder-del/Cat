import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  useEffect(function() {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service | GOLFGATE Catalunya';
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
          <span className="text-stone-700">Terms of Service</span>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl text-stone-900 mb-2">Terms of Service</h1>
        <p className="text-stone-400 text-sm mb-10">Last updated: March 2026</p>

        <div className="prose prose-stone max-w-none">
          <p>These terms and conditions apply to all services provided directly or indirectly by golfgatecatalunya.com, including those made available online, through any mobile device, by email, or by telephone. By accessing, browsing, and using our website and/or by completing a booking or inquiry, you acknowledge and agree to have read, understood, and agreed to the terms and conditions set out below, including our Privacy Policy.</p>
          <p>golfgatecatalunya.com operates as a golf travel consultancy and booking service based in Catalunya, Spain. Our website and services are provided for your personal, non-commercial use only.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">1. Scope of Our Service</h2>
          <p>Through our platform, we provide a golf travel consultancy service through which golf courses, hotels, and related service providers ("Suppliers") can offer their products and services, and through which visitors can make inquiries, request quotes, and complete bookings.</p>
          <p>When you make a booking through golfgatecatalunya.com, you may enter into a direct contractual relationship with the Supplier. In such cases, we act as an intermediary, facilitating the connection between you and the Supplier.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">2. Bookings and Payments</h2>
          <p>Bookings can be made through our website, by contacting us directly via email or phone, or through our booking partners. All prices are displayed in Euros (EUR) unless otherwise stated.</p>
          <p>Tee time bookings are processed through our partner Greenfee365. By making a booking, you confirm that you are authorized to use the payment method provided.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">3. Cancellation and Refund Policy</h2>
          <p>Cancellation policies vary depending on the Supplier and the type of service booked. The applicable cancellation policy will be communicated to you at the time of booking.</p>
          <p>General guidelines:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cancellations made more than 72 hours before the scheduled service are generally eligible for a full refund, minus any processing fees</li>
            <li>Cancellations made within 72 hours may be subject to partial or no refund, depending on the Supplier's policy</li>
            <li>No-shows are not eligible for refunds</li>
          </ul>
          <p className="mt-4">If you wish to cancel or modify a booking, please contact us at <a href="mailto:contact@golfgatecatalunya.com" className="text-[#f6416c] hover:underline">contact@golfgatecatalunya.com</a> or call <a href="tel:+34620987575" className="text-[#f6416c] hover:underline">+34 620 987 575</a>.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">4. Third-Party Suppliers</h2>
          <p>golfgatecatalunya.com partners with golf courses, hotels, and other providers in Catalunya. While we carefully select our partners, each Supplier is independently responsible for the quality and delivery of their services.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">5. Limitation of Liability</h2>
          <p>To the extent permitted by law, golfgatecatalunya.com shall only be liable for direct damages actually suffered due to a proven shortcoming in our services, up to the total amount paid for the relevant booking.</p>
          <p>We shall not be liable for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Services rendered directly by Suppliers (golf courses, hotels)</li>
            <li>Inaccuracies in information provided by Suppliers</li>
            <li>Force majeure events (weather, natural disasters, strikes, pandemics)</li>
            <li>Any indirect, consequential, or punitive damages</li>
          </ul>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">6. Intellectual Property</h2>
          <p>All content on golfgatecatalunya.com, including text, images, logos, design, and software, is protected by intellectual property rights. You may not reproduce, distribute, or use any content without our prior written consent.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">7. Applicable Law</h2>
          <p>These Terms of Service are governed by and construed in accordance with the laws of Spain. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Barcelona, Spain.</p>

          <h2 className="font-heading text-2xl text-stone-900 mt-10 mb-4">8. Contact</h2>
          <p>For any questions regarding these Terms of Service, please contact us at <a href="mailto:contact@golfgatecatalunya.com" className="text-[#f6416c] hover:underline">contact@golfgatecatalunya.com</a> or call <a href="tel:+34620987575" className="text-[#f6416c] hover:underline">+34 620 987 575</a>.</p>
        </div>
      </div>
    </div>
  );
}
