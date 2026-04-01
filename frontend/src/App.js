import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
import { ScrollIndicator } from './components/ScrollIndicator';

var GolfgateCatalunyaPage = React.lazy(function() { return import('./components/GolfgateCatalunyaPage'); });
var CatalunyaCoursePage = React.lazy(function() { return import('./components/CatalunyaCoursePage'); });
var CatalunyaAdminPanel = React.lazy(function() { return import('./components/CatalunyaAdminPanel'); });
var CatalunyaBlogPage = React.lazy(function() { return import('./components/CatalunyaBlogPage'); });
var CatalunyaBlogPostPage = React.lazy(function() { return import('./components/CatalunyaBlogPostPage'); });
var CatalunyaCoursesListPage = React.lazy(function() { return import('./components/CatalunyaCoursesListPage'); });
var CatalunyaHotelsPage = React.lazy(function() { return import('./components/CatalunyaHotelsPage'); });
var CatalunyaLocationPage = React.lazy(function() { return import('./components/CatalunyaLocationPage'); });
var CatalunyaComparePage = React.lazy(function() { return import('./components/CatalunyaComparePage'); });
var BestTimePage = React.lazy(function() { return import('./components/BestTimePage'); });
var TermsPage = React.lazy(function() { return import('./components/TermsPage'); });
var PrivacyPage = React.lazy(function() { return import('./components/PrivacyPage'); });

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-stone-300 border-t-[#EF476F] rounded-full animate-spin" />
    </div>
  );
}

function Wrap(props) {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      {props.children}
    </React.Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollIndicator />
      <Routes>
        <Route path="/" element={<Wrap><GolfgateCatalunyaPage /></Wrap>} />
        <Route path="/courses" element={<Wrap><CatalunyaCoursesListPage /></Wrap>} />
        <Route path="/hotels" element={<Wrap><CatalunyaHotelsPage /></Wrap>} />
        <Route path="/golf/:region" element={<Wrap><CatalunyaLocationPage /></Wrap>} />
        <Route path="/compare" element={<Wrap><CatalunyaComparePage /></Wrap>} />
        <Route path="/best-time-to-play" element={<Wrap><BestTimePage /></Wrap>} />
        <Route path="/courses/:courseId" element={<Wrap><CatalunyaCoursePage /></Wrap>} />
        <Route path="/blog" element={<Wrap><CatalunyaBlogPage /></Wrap>} />
        <Route path="/blog/:postId" element={<Wrap><CatalunyaBlogPostPage /></Wrap>} />
        <Route path="/admin" element={<Wrap><CatalunyaAdminPanel /></Wrap>} />
        <Route path="/privacy" element={<Wrap><PrivacyPage /></Wrap>} />
        <Route path="/terms" element={<Wrap><TermsPage /></Wrap>} />
        <Route path="*" element={<Wrap><GolfgateCatalunyaPage /></Wrap>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
