import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';

const GolfgateCatalunyaPage = React.lazy(() => import('./components/GolfgateCatalunyaPage'));
const TermsPage = React.lazy(() => import('./components/TermsPage'));
const PrivacyPage = React.lazy(() => import('./components/PrivacyPage'));

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-stone-300 border-t-[#f53d7d] rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <GolfgateCatalunyaPage />
          </React.Suspense>
        } />
        <Route path="/golfgate-catalunya" element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <GolfgateCatalunyaPage />
          </React.Suspense>
        } />
        <Route path="/privacy" element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <PrivacyPage />
          </React.Suspense>
        } />
        <Route path="/terms" element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <TermsPage />
          </React.Suspense>
        } />
        <Route path="*" element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <GolfgateCatalunyaPage />
          </React.Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
