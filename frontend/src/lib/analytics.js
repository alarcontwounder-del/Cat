/**
 * Lightweight helper for Google Analytics gtag custom events.
 * Safe to call before GA loads — uses dataLayer fallback.
 */
export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window === 'undefined') return;
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
      return;
    }
    // Fallback: push directly to dataLayer if gtag.js still loading
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
  } catch (e) {
    console.warn('[GA] trackEvent failed:', e);
  }
}
