import React, { useEffect, useState } from 'react';
import { Download, X, Share, Plus } from 'lucide-react';

const STORAGE_KEY = 'golfgate_pwa_install_dismissed_at';
const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const COPY = {
  en: {
    title: 'Install GOLFGATE Catalunya',
    subtitle: 'Add to your home screen for quick access to tee time bookings.',
    install: 'Install',
    later: 'Not now',
    iosHint: 'Tap',
    iosThen: 'then',
    iosAdd: 'Add to Home Screen',
  },
  es: {
    title: 'Instalar GOLFGATE Catalunya',
    subtitle: 'Añade el acceso directo a tu pantalla de inicio para reservar más rápido.',
    install: 'Instalar',
    later: 'Ahora no',
    iosHint: 'Pulsa',
    iosThen: 'luego',
    iosAdd: 'Añadir a pantalla de inicio',
  },
  ca: {
    title: 'Instal·lar GOLFGATE Catalunya',
    subtitle: 'Afegeix l\'accés directe a la pantalla d\'inici per reservar més ràpid.',
    install: 'Instal·lar',
    later: 'Ara no',
    iosHint: 'Toca',
    iosThen: 'i després',
    iosAdd: 'Afegir a la pantalla d\'inici',
  },
  de: {
    title: 'GOLFGATE Catalunya installieren',
    subtitle: 'Zum Startbildschirm hinzufügen für schnellen Zugriff auf Tee Time-Buchungen.',
    install: 'Installieren',
    later: 'Später',
    iosHint: 'Tippe auf',
    iosThen: 'dann',
    iosAdd: 'Zum Home-Bildschirm',
  },
  fr: {
    title: 'Installer GOLFGATE Catalunya',
    subtitle: 'Ajoutez le raccourci à votre écran d\'accueil pour réserver plus vite.',
    install: 'Installer',
    later: 'Plus tard',
    iosHint: 'Appuyez sur',
    iosThen: 'puis',
    iosAdd: 'Sur l\'écran d\'accueil',
  },
  sv: {
    title: 'Installera GOLFGATE Catalunya',
    subtitle: 'Lägg till på hemskärmen för snabb åtkomst till tee time-bokningar.',
    install: 'Installera',
    later: 'Inte nu',
    iosHint: 'Tryck på',
    iosThen: 'sedan',
    iosAdd: 'Lägg till på hemskärmen',
  },
};

function detectLanguage() {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('lang');
    if (fromUrl && COPY[fromUrl]) return fromUrl;
    const fromStorage = window.localStorage.getItem('selectedLanguage');
    if (fromStorage && COPY[fromStorage]) return fromStorage;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    if (COPY[nav]) return nav;
  } catch (e) {
    console.warn('[PWA] localStorage read failed for language detection:', e);
    /* ignore */
  }
  return 'en';
}

function isIos() {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  const isiOSDevice = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  // iPadOS 13+ reports as Mac; detect via touch points
  const isiPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return isiOSDevice || isiPadOS;
}

function isStandalone() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

function wasRecentlyDismissed() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (!v) return false;
    const ts = parseInt(v, 10);
    if (Number.isNaN(ts)) return false;
    return Date.now() - ts < DISMISS_DURATION_MS;
  } catch (e) {
    console.warn('[PWA] localStorage read failed for dismissal check:', e);
    return false;
  }
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    setLang(detectLanguage());

    // Don't show on admin route or if already installed/dismissed
    if (typeof window === 'undefined') return;
    if (window.location.pathname.startsWith('/admin')) return;
    if (isStandalone()) return;
    if (wasRecentlyDismissed()) return;

    const onBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show after a small delay so it's not jarring on first paint
      setTimeout(() => setVisible(true), 4000);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);

    // iOS Safari: beforeinstallprompt never fires, so show our own hint
    if (isIos()) {
      const t = setTimeout(() => {
        setShowIosHint(true);
        setVisible(true);
      }, 6000);
      return () => {
        clearTimeout(t);
        window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      };
    }

    const onInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch (e) {
      console.warn('[PWA] localStorage write failed on dismiss:', e);
    }
  };

  const install = async () => {
    if (!deferredPrompt) return;
    try {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setVisible(false);
      if (choice && choice.outcome !== 'accepted') {
        // user dismissed prompt
        try {
          window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch (e) {
          console.warn('[PWA] localStorage write failed after prompt dismissal:', e);
        }
      }
    } catch (e) {
      console.warn('[PWA] Install prompt failed:', e);
      setVisible(false);
    }
  };

  if (!visible) return null;
  const t = COPY[lang] || COPY.en;

  return (
    <div
      data-testid="pwa-install-banner"
      className="fixed left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 bottom-3 z-[60] max-w-sm sm:max-w-md mx-auto sm:mx-0 animate-[fadeInUp_400ms_ease-out]"
      style={{ animation: 'pwaSlideUp 420ms cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <style>{`
        @keyframes pwaSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="relative rounded-2xl shadow-2xl border border-black/10 bg-black text-white overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: 'linear-gradient(90deg, #CCFF00, #FFFF00, #DFFF00)' }}
        />

        <button
          onClick={dismiss}
          aria-label={t.later}
          data-testid="pwa-install-dismiss"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-5 pr-12">
          <div className="flex items-start gap-3">
            <div
              className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: '#CCFF00' }}
            >
              <Download className="w-5 h-5 text-black" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold leading-tight">{t.title}</h3>
              <p className="text-xs text-white/70 mt-1 leading-snug">{t.subtitle}</p>
            </div>
          </div>

          {showIosHint ? (
            <div className="mt-4 flex items-center gap-2 flex-wrap text-xs text-white/80">
              <span>{t.iosHint}</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10">
                <Share className="w-3.5 h-3.5" />
              </span>
              <span>{t.iosThen}</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10">
                <Plus className="w-3.5 h-3.5" />
                {t.iosAdd}
              </span>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={install}
                data-testid="pwa-install-accept"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-black hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#CCFF00' }}
              >
                <Download className="w-4 h-4" strokeWidth={2.5} />
                {t.install}
              </button>
              <button
                onClick={dismiss}
                data-testid="pwa-install-later"
                className="px-4 py-2.5 rounded-full text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                {t.later}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
