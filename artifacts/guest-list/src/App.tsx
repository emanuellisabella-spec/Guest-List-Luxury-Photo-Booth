import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Instagram, Menu, Music2, Play, Sparkles, X } from 'lucide-react';
import { Route, Switch } from 'wouter';

type Language = 'en' | 'es';
type PackageKey = 'social' | 'signature' | 'celebration';

const translations = {
  en: {
    nav: { about: 'The experience', packages: 'Packages', gallery: 'In the wild', faq: 'FAQ', book: 'Book your date', language: 'ES' },
    hero: {
      eyebrow: 'Atlanta • iPad photo booth rental',
      title: 'The guest list\nstarts here.',
      body: 'A digital photo booth that feels like part of the party — not an afterthought. Designed for the moments your people will replay.',
      primary: 'Check availability',
      secondary: 'How it works',
      scroll: 'Scroll to explore',
    },
    about: {
      label: 'More than a photo booth',
      title: 'A little black box\nof instant joy.',
      body: 'Guest List brings the energy of the room into focus. Our sleek iPad setup slips beautifully into your celebration, then turns every laugh, toast and late-night dance into a shareable keepsake.',
      detail: 'Curated in Atlanta for weddings, brand events, birthdays and every reason worth gathering.',
      stat1: '01', stat1Label: 'Set up with intention',
      stat2: '02', stat2Label: 'Capture without interrupting',
      stat3: '03', stat3Label: 'Share before the night is over',
      cta: 'Meet the experience',
    },
    packages: {
      label: 'Pick your mood',
      title: 'The right package\nfor your people.',
      body: 'Everything you need for an effortless guest experience, wrapped in a setup that looks as good as your event.',
      included: 'What’s included',
      popular: 'Most booked',
      book: 'Book now',
      note: 'Every package includes delivery, setup, breakdown and a polished attendant-free experience.',
      social: { name: 'The Social', price: '$399', duration: '2 hours', description: 'An effortless, elevated photo experience for your celebration. Guests step up, strike a pose, and walk away with instant digital keepsakes.', items: ['2 hours on-site with your dedicated Guest List host', 'Digital photos, GIFs & boomerangs', 'One curated backdrop', 'Custom-designed template', 'Instant sharing via text/email/QR', 'Private online gallery delivered same night'] },
      signature: { name: 'The Signature', price: '$549', duration: '3 hours', description: 'Our most-booked experience — built for hosts who want the night to feel as good as it looks.', items: ['3 hours on-site with your dedicated Guest List host', 'Digital photos, GIFs & boomerangs', 'Premium backdrop selection', 'Custom-designed template', 'Instant sharing via text/email/QR', 'Private online gallery delivered same night', 'Guest lead capture'] },
      celebration: { name: 'The Celebration', price: '$749', duration: '4 hours', description: 'The full Guest List experience. Four hours of uninterrupted coverage, a fully branded setup, and every detail styled to match the caliber of your event.', items: ['4 hours on-site with your dedicated Guest List host', 'Digital photos, GIFs & boomerangs', 'Premium backdrop selection', 'Fully custom template & branded start screen', 'Curated prop styling', 'Instant sharing via text/email/QR', 'Private online gallery delivered same night', 'Guest lead capture'] },
    },
    gallery: {
      label: 'The evidence',
      title: 'Good nights look\nbetter in replay.',
      body: 'From first toast to final song, we make room for the in-between moments — the ones that become your favorites.',
      alt1: 'Guests laughing together at an Atlanta event',
      alt2: 'Friends posing at a wedding photo booth',
      alt3: 'The Guest List photo booth setup',
      alt4: 'A joyful celebration captured on camera',
      alt5: 'A toast shared between friends',
      alt6: 'Guests celebrating under warm lights',
    },
    booking: {
      label: 'Make it official',
      title: 'Save your date.',
      body: 'Choose a package to see availability. You can change your mind right up until you book.',
      fallback: 'Open booking in a new tab',
      selected: 'Selected package',
      loading: 'Loading availability',
      note: 'You are booking a complimentary date check — no payment is required here.',
    },
    testimonial: {
      quote: 'Guest List was the one detail everyone kept talking about. It looked beautiful, it was incredibly easy, and we got to relive the whole night the next morning.',
      name: 'Jasmine R.',
      event: 'Wedding reception · Atlanta, GA',
      label: 'From the guest book',
    },
    faq: {
      label: 'Good to know',
      title: 'Questions, answered.',
      items: [
        ['What areas do you serve?', 'We are based in Atlanta and serve the greater metro area, including Buckhead, Midtown, Decatur, Marietta, Alpharetta and surrounding venues. A travel fee may apply outside our core service area.'],
        ['Do you need Wi-Fi at my event?', 'No. Our booth is designed to keep the line moving even when venue Wi-Fi is not. Guests can share by text or email when a connection is available, and every gallery is backed up for delivery.'],
        ['Can the experience be customized?', 'Absolutely. Your event overlay, welcome screen and gallery are styled to feel like you. Tell us the mood and we will take care of the details.'],
        ['How far in advance should I book?', 'We recommend 4–8 weeks for most celebrations. Popular Saturdays fill quickly, so reach out as soon as your date is set.'],
        ['How long does setup take?', 'We arrive early enough to make setup feel invisible, usually allowing 45–60 minutes before your start time. Your experience begins ready, polished and on time.'],
        ['Is a deposit required?', 'Your date is held once the booking is confirmed through Cal.com. The calendar will show the current deposit and payment details for your selected package.'],
      ],
    },
    footer: {
      kicker: 'For the nights worth remembering.',
      body: 'Luxury digital photo booth experiences for Atlanta gatherings and the people who make them matter.',
      area: 'Serving Atlanta, Buckhead, Marietta, Smyrna & surrounding areas',
      contact: 'Have a question? Say hello.',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      email: 'Email us',
      phone: 'Call (404) 555-0148',
      privacy: 'Privacy',
      terms: 'Terms',
      copyright: '© 2025 Guest List. Made for good company.',
    },
  },
  es: {
    nav: { about: 'La experiencia', packages: 'Paquetes', gallery: 'Galería', faq: 'Preguntas', book: 'Reserva tu fecha', language: 'EN' },
    hero: {
      eyebrow: 'Atlanta • alquiler de fotomatón iPad',
      title: 'La lista de invitados\nempieza aquí.',
      body: 'Un fotomatón digital que se siente parte de la fiesta. Diseñado para esos momentos que tus invitados volverán a disfrutar.',
      primary: 'Ver paquetes',
      secondary: 'Cómo funciona',
      scroll: 'Desplázate para explorar',
    },
    about: {
      label: 'Más que un fotomatón',
      title: 'Una pequeña caja negra\nde alegría instantánea.',
      body: 'Guest List convierte la energía de tu evento en recuerdos. Nuestro elegante iPad se integra en tu celebración y transforma cada risa, brindis y baile en un recuerdo para compartir.',
      detail: 'Creado en Atlanta para bodas, eventos de marca, cumpleaños y cada motivo que merece reunirse.',
      stat1: '01', stat1Label: 'Montaje con intención',
      stat2: '02', stat2Label: 'Captura sin interrumpir',
      stat3: '03', stat3Label: 'Comparte antes de que termine la noche',
      cta: 'Conoce la experiencia',
    },
    packages: {
      label: 'Elige tu ambiente',
      title: 'El paquete perfecto\npara tu gente.',
      body: 'Todo lo necesario para una experiencia sencilla y memorable, con un montaje tan bonito como tu evento.',
      included: 'Qué incluye',
      popular: 'Más reservado',
      book: 'Reservar ahora',
      note: 'Todos los paquetes incluyen entrega, montaje, desmontaje y una experiencia elegante sin asistente.',
      social: { name: 'The Social', price: '$399', duration: '2 horas', description: 'Una experiencia fotográfica elevada y sin esfuerzo para tu celebración. Tus invitados posan y se llevan recuerdos digitales al instante.', items: ['2 horas en el evento con tu anfitrión Guest List', 'Fotos digitales, GIFs y boomerangs', 'Un fondo seleccionado', 'Plantilla diseñada a medida', 'Compartir al instante por texto/email/QR', 'Galería privada entregada esa misma noche'] },
      signature: { name: 'The Signature', price: '$549', duration: '3 horas', description: 'Nuestra experiencia más reservada, creada para anfitriones que quieren que la noche se sienta tan bien como se ve.', items: ['3 horas en el evento con tu anfitrión Guest List', 'Fotos digitales, GIFs y boomerangs', 'Selección de fondos premium', 'Plantilla diseñada a medida', 'Compartir al instante por texto/email/QR', 'Galería privada entregada esa misma noche', 'Captura de datos de invitados'] },
      celebration: { name: 'The Celebration', price: '$749', duration: '4 horas', description: 'La experiencia Guest List completa. Cuatro horas de cobertura, un montaje totalmente personalizado y cada detalle a la altura de tu evento.', items: ['4 horas en el evento con tu anfitrión Guest List', 'Fotos digitales, GIFs y boomerangs', 'Selección de fondos premium', 'Plantilla totalmente personalizada y pantalla de inicio con marca', 'Accesorios seleccionados', 'Compartir al instante por texto/email/QR', 'Galería privada entregada esa misma noche', 'Captura de datos de invitados'] },
    },
    gallery: {
      label: 'La prueba',
      title: 'Las buenas noches\nse ven mejor después.',
      body: 'Del primer brindis a la última canción, hacemos espacio para esos momentos espontáneos que se vuelven tus favoritos.',
      alt1: 'Invitados riendo en un evento de Atlanta',
      alt2: 'Amigos posando en un fotomatón de boda',
      alt3: 'El montaje del fotomatón Guest List',
      alt4: 'Una celebración capturada en cámara',
      alt5: 'Un brindis compartido entre amigos',
      alt6: 'Invitados celebrando bajo luces cálidas',
    },
    booking: {
      label: 'Hazlo oficial',
      title: 'Guarda tu fecha.',
      body: 'Elige un paquete para ver disponibilidad. Puedes cambiar de opinión hasta el momento de reservar.',
      fallback: 'Abrir reserva en una nueva pestaña',
      selected: 'Paquete seleccionado',
      loading: 'Cargando disponibilidad',
      note: 'Esta es una consulta de fecha sin compromiso — no se requiere pago aquí.',
    },
    testimonial: {
      quote: 'Guest List fue el detalle del que todos hablaban. Se veía increíble, fue muy fácil y pudimos revivir toda la noche a la mañana siguiente.',
      name: 'Jasmine R.',
      event: 'Recepción de boda · Atlanta, GA',
      label: 'Del libro de invitados',
    },
    faq: {
      label: 'Para saber',
      title: 'Preguntas frecuentes.',
      items: [
        ['¿Qué zonas cubren?', 'Estamos en Atlanta y servimos el área metropolitana, incluyendo Buckhead, Midtown, Decatur, Marietta, Alpharetta y lugares cercanos. Puede aplicarse un cargo de viaje fuera de nuestra zona principal.'],
        ['¿Necesitan Wi-Fi?', 'No. Nuestro fotomatón mantiene la fila en movimiento incluso sin Wi-Fi. Los invitados pueden compartir por texto o email cuando haya conexión y cada galería se respalda para su entrega.'],
        ['¿Puedo personalizar la experiencia?', 'Por supuesto. El diseño, la pantalla de bienvenida y la galería se adaptan a tu evento para que todo se sienta tuyo.'],
        ['¿Con cuánta anticipación debo reservar?', 'Recomendamos de 4 a 8 semanas. Los sábados populares se llenan rápido, así que escríbenos cuando tengas tu fecha.'],
        ['¿Cuánto tarda el montaje?', 'Llegamos con tiempo para que el montaje sea invisible, normalmente entre 45 y 60 minutos antes de la hora de inicio. Tu experiencia comienza lista, cuidada y a tiempo.'],
        ['¿Se requiere un depósito?', 'Tu fecha queda reservada cuando confirmas la reserva en Cal.com. El calendario mostrará los detalles actuales del depósito y pago para el paquete elegido.'],
      ],
    },
    footer: {
      kicker: 'Para las noches que merecen recordarse.',
      body: 'Experiencias de fotomatón digital de lujo para las reuniones de Atlanta y las personas que las hacen importantes.',
      area: 'Sirviendo Atlanta, Buckhead, Marietta, Smyrna y zonas cercanas',
      contact: '¿Tienes una pregunta? Saluda.',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      email: 'Escríbenos',
      phone: 'Llama al (404) 555-0148',
      privacy: 'Privacidad',
      terms: 'Términos',
      copyright: '© 2025 Guest List. Hecho para buena compañía.',
    },
  },
} as const;

const packageKeys: PackageKey[] = ['social', 'signature', 'celebration'];
const slugs: Record<PackageKey, string> = {
  social: 'the-social-package-selfie-booth',
  signature: 'the-signature-package-selfie-booth',
  celebration: 'the-celebration-package-selfie-booth',
};

declare global {
  interface Window {
    Cal?: CalFunction;
    __guestListCalPromise?: Promise<void>;
  }
}

type CalNamespace = ((...args: unknown[]) => void) & { q?: unknown[] };
type CalFunction = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalNamespace>;
  q?: unknown[];
  config?: { forwardQueryParams?: boolean };
};

function ensureCalScript() {
  if (window.Cal?.loaded && window.Cal.ns) return Promise.resolve();
  if (window.__guestListCalPromise) return window.__guestListCalPromise;

  const p = (api: CalFunction | CalNamespace, args: unknown[]) => {
    api.q = api.q || [];
    api.q.push(args);
  };
  const cal = window.Cal = window.Cal || ((...args: unknown[]) => {
    const current = window.Cal as CalFunction;
    if (!current.loaded) {
      current.ns = {};
      current.q = current.q || [];
      const script = document.createElement('script');
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      document.head.appendChild(script);
      current.loaded = true;
    }
    if (args[0] === 'init') {
      const api = ((...namespaceArgs: unknown[]) => {
        p(api, namespaceArgs);
      }) as CalNamespace;
      const namespace = args[1];
      api.q = api.q || [];
      if (typeof namespace === 'string') {
        current.ns = current.ns || {};
        current.ns[namespace] = current.ns[namespace] || api;
        p(current.ns[namespace], args);
        p(current, ['initNamespace', namespace]);
      } else {
        p(current, args);
      }
      return;
    }
    p(current, args);
  }) as CalFunction;
  cal.config = cal.config || {};
  cal.config.forwardQueryParams = true;
  window.__guestListCalPromise = Promise.resolve();
  return window.__guestListCalPromise;
}

function BookingEmbed({ slug, label, fallback, loading }: { slug: string; label: string; fallback: string; loading: string }) {
  const [ready, setReady] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = embedRef.current;
    if (!element) return;
    const elementId = `my-cal-inline-${slug}`;
    element.id = elementId;
    setReady(false);
    element.innerHTML = '';
    const render = () => {
      const cal = window.Cal;
      if (!cal) return;
      const ns = `${slug}-${Date.now().toString(36)}`;
      cal('init', ns, { origin: 'https://app.cal.com' });
      const namespace = cal.ns?.[ns];
      if (!namespace) return;
      namespace('inline', {
        elementOrSelector: `#${elementId}`,
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'dark' },
        calLink: `guestlistbooth/${slug}`,
      });
      namespace('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
        theme: 'dark',
        styles: { branding: { brandColor: '#C9A24B' } },
      });
      setReady(true);
    };
    let cancelled = false;
    ensureCalScript()
      .then(() => {
        if (!cancelled) render();
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [slug]);
  return (
    <div className="relative min-h-[430px] overflow-hidden border border-[#d7c8a7] bg-[#f7f1e6]">
      <div ref={embedRef} className="min-h-[430px]" data-testid="cal-embed-selected" />
      <div className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-[#f7f1e6]/90 transition-opacity duration-500 ${ready ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-pulse rounded-full border border-[#b89044] border-t-transparent" />
          <p className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#73634b]">{loading}</p>
          <a className={`${ready ? 'pointer-events-none' : 'pointer-events-auto'} mt-5 inline-flex items-center gap-2 border-b border-[#b89044] pb-1 text-xs font-semibold uppercase tracking-[.14em] text-[#322619] transition-colors hover:text-[#9a6e22]`} href={`https://cal.com/guestlistbooth/${slug}`} target="_blank" rel="noreferrer" data-testid="link-booking-fallback">{fallback} <ArrowUpRight size={13} /></a>
        </div>
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}

function AppHome() {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('guest-list-language') as Language) || 'en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>('signature');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const t = translations[language];
  const packageData = useMemo(() => packageKeys.map((key) => ({ key, ...t.packages[key] })), [t]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 34);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => localStorage.setItem('guest-list-language', language), [language]);

  const jump = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const choosePackage = (key: PackageKey) => {
    setSelectedPackage(key);
    window.setTimeout(() => jump('booking'), 80);
  };

  return (
    <main className="noise overflow-hidden bg-[#f0eadf] text-[#211a12]">
      <nav className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-[#1c1712]/95 py-3 shadow-lg backdrop-blur-md' : 'bg-gradient-to-b from-[#17130f]/75 to-transparent py-5'}`} data-testid="nav-main">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 md:px-10">
          <button className="group flex items-center gap-3 text-left text-[#f4eddf]" onClick={() => jump('top')} data-testid="button-logo">
            <span className="flex h-8 w-8 items-center justify-center border border-[#c9a75d] text-[#c9a75d]"><span className="font-display text-lg italic">G</span></span>
            <span className="text-[11px] font-semibold uppercase tracking-[.28em]">Guest List</span>
          </button>
          <div className="hidden items-center gap-8 lg:flex">
            <button onClick={() => jump('experience')} className="nav-link" data-testid="link-nav-experience">{t.nav.about}</button>
            <button onClick={() => jump('packages')} className="nav-link" data-testid="link-nav-packages">{t.nav.packages}</button>
            <button onClick={() => jump('gallery')} className="nav-link" data-testid="link-nav-gallery">{t.nav.gallery}</button>
            <button onClick={() => jump('faq')} className="nav-link" data-testid="link-nav-faq">{t.nav.faq}</button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')} className="rounded-full border border-[#c9a75d]/60 px-3 py-1.5 font-mono-brand text-[10px] uppercase tracking-[.17em] text-[#f4eddf] transition hover:bg-[#c9a75d] hover:text-[#20170e]" data-testid="button-language">{t.nav.language}</button>
            <button className="hidden border border-[#c9a75d] bg-[#c9a75d] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#20170e] transition hover:bg-[#e2c37b] lg:block" onClick={() => jump('booking')} data-testid="button-nav-book">{t.nav.book}</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 text-[#f4eddf] lg:hidden" aria-label="Open menu" data-testid="button-menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </div>
        {menuOpen && <div className="border-t border-[#c9a75d]/25 bg-[#1c1712] px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {[['experience', t.nav.about], ['packages', t.nav.packages], ['gallery', t.nav.gallery], ['faq', t.nav.faq], ['booking', t.nav.book]].map(([id, label]) => <button key={id} onClick={() => jump(id)} className="text-left text-xs uppercase tracking-[.18em] text-[#e9ddc5]" data-testid={`link-mobile-${id}`}>{label}</button>)}
          </div>
        </div>}
      </nav>

      <section id="top" className="relative flex min-h-[760px] items-end overflow-hidden bg-[#1c1712] pb-16 pt-36 md:min-h-[800px] md:pb-24">
        <img src="/guest-list-hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-[63%] opacity-70" fetchPriority="high" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,18,13,.94)_0%,rgba(24,18,13,.64)_38%,rgba(24,18,13,.13)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,18,13,.78)_0%,transparent_42%)]" />
        <div className="relative mx-auto w-full max-w-[1320px] px-5 md:px-10">
          <div className="max-w-[680px]">
            <p className="reveal font-mono-brand text-[10px] uppercase tracking-[.25em] text-[#d9b76a]" data-testid="text-hero-eyebrow">{t.hero.eyebrow}</p>
            <h1 className="reveal reveal-delay-1 mt-5 whitespace-pre-line font-display text-[clamp(4rem,12vw,9.5rem)] leading-[.87] tracking-[-.055em] text-[#f5eee2]" data-testid="text-hero-title">{t.hero.title}</h1>
            <p className="reveal reveal-delay-2 mt-7 max-w-[480px] text-[15px] leading-7 text-[#e7dcca] md:text-[17px]">{t.hero.body}</p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-5">
              <button onClick={() => jump('packages')} className="group inline-flex items-center gap-4 bg-[#c9a75d] px-6 py-4 text-[11px] font-bold uppercase tracking-[.15em] text-[#20170e] transition hover:bg-[#ecd28f]" data-testid="button-hero-packages">{t.hero.primary}<ArrowDown size={15} className="transition-transform group-hover:translate-y-1" /></button>
              <button onClick={() => jump('experience')} className="inline-flex items-center gap-2 border-b border-[#c9a75d] pb-1 text-[11px] font-semibold uppercase tracking-[.16em] text-[#f6ecdb] transition hover:text-[#d9b76a]" data-testid="button-hero-experience">{t.hero.secondary}<ArrowUpRight size={14} /></button>
            </div>
          </div>
          <p className="absolute bottom-0 right-5 hidden rotate-90 origin-bottom-right font-mono-brand text-[9px] uppercase tracking-[.24em] text-[#e6d8bf]/70 md:block">{t.hero.scroll} &nbsp; — &nbsp;  ATL / 33.7490° N</p>
        </div>
      </section>

      <section id="experience" className="bg-[#f0eadf] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1160px] gap-16 md:grid-cols-[.8fr_1.2fr] md:gap-24">
          <div>
            <p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#9a6e22]">{t.about.label}</p>
            <div className="mt-7 h-px w-16 bg-[#b89044]" />
          </div>
          <div>
            <h2 className="max-w-[700px] whitespace-pre-line font-display text-[clamp(3.2rem,7vw,6.4rem)] leading-[.92] tracking-[-.045em] text-[#30251a]">{t.about.title}</h2>
            <p className="mt-9 max-w-[620px] text-lg leading-8 text-[#665845]">{t.about.body}</p>
            <p className="mt-6 max-w-[580px] font-display text-xl italic leading-8 text-[#9a6e22]">{t.about.detail}</p>
            <div className="mt-14 grid gap-7 border-t border-[#ccbda4] pt-7 sm:grid-cols-3">
              {[['stat1', 'stat1Label'], ['stat2', 'stat2Label'], ['stat3', 'stat3Label']].map(([num, label]) => <div key={num}><p className="font-display text-3xl text-[#b89044]">{t.about[num as 'stat1']}</p><p className="mt-2 max-w-[130px] text-xs leading-5 text-[#665845]">{t.about[label as 'stat1Label']}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="bg-[#292017] px-5 py-24 text-[#f2e9da] md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div><p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#d9b76a]">{t.packages.label}</p><h2 className="mt-6 whitespace-pre-line font-display text-[clamp(3.1rem,7vw,6.6rem)] leading-[.9] tracking-[-.05em]">{t.packages.title}</h2></div>
            <p className="max-w-[310px] text-sm leading-6 text-[#cbbda7]">{t.packages.body}</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {packageData.map((item, index) => <article key={item.key} className={`relative flex flex-col border p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8 ${item.key === 'signature' ? 'border-[#c9a75d] bg-[#453722]' : 'border-[#69583e] bg-[#32271b]'}`} data-testid={`card-package-${item.key}`}>
              {item.key === 'signature' && <span className="absolute right-5 top-5 font-mono-brand text-[9px] uppercase tracking-[.18em] text-[#d9b76a]">{t.packages.popular}</span>}
              <p className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#bca885]">0{index + 1}</p>
              <h3 className="mt-12 font-display text-4xl tracking-[-.03em]">{item.name}</h3>
              <p className="mt-4 min-h-[72px] text-sm leading-6 text-[#d5c8b5]">{item.description}</p>
              <div className="mt-7 flex items-end gap-3 border-b border-[#756347] pb-6"><span className="font-display text-4xl">{item.price}</span><span className="mb-1 font-mono-brand text-[9px] uppercase tracking-[.13em] text-[#bca885]">{item.duration}</span></div>
              <p className="mt-6 font-mono-brand text-[9px] uppercase tracking-[.19em] text-[#d9b76a]">{t.packages.included}</p>
              <ul className="mt-4 flex flex-1 flex-col gap-3">{item.items.map((include) => <li key={include} className="flex gap-3 text-sm text-[#e4d9c7]"><Check size={15} className="mt-0.5 shrink-0 text-[#c9a75d]" />{include}</li>)}</ul>
              <button onClick={() => choosePackage(item.key)} className="mt-9 flex w-full items-center justify-between border border-[#c9a75d] px-5 py-4 text-[10px] font-bold uppercase tracking-[.17em] text-[#e9d7af] transition hover:bg-[#c9a75d] hover:text-[#292017]" data-testid={`button-book-${item.key}`}>{t.packages.book}<ArrowUpRight size={15} /></button>
            </article>)}
          </div>
          <p className="mt-7 text-center font-mono-brand text-[9px] uppercase tracking-[.15em] text-[#a59479]">{t.packages.note}</p>
        </div>
      </section>

      <section id="gallery" className="bg-[#e9e0d1] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#9a6e22]">{t.gallery.label}</p><h2 className="mt-6 whitespace-pre-line font-display text-[clamp(3.1rem,7vw,6.3rem)] leading-[.9] tracking-[-.05em] text-[#30251a]">{t.gallery.title}</h2></div><p className="max-w-[330px] text-sm leading-6 text-[#665845]">{t.gallery.body}</p></div>
          {/* Swap these generated editorial assets for real event images when available. */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
            <figure className="group relative col-span-2 aspect-[4/5] overflow-hidden md:col-span-5 md:aspect-[5/6]"><img loading="lazy" src="/guest-list-gallery-1.jpg" alt={t.gallery.alt1} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><figcaption className="absolute bottom-4 left-4 font-mono-brand text-[9px] uppercase tracking-[.16em] text-white/80">01 / good company</figcaption></figure>
            <figure className="group relative col-span-1 mt-10 aspect-[3/4] overflow-hidden md:col-span-3 md:mt-24 md:aspect-[3/4]"><img loading="lazy" src="/guest-list-gallery-2.jpg" alt={t.gallery.alt2} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><figcaption className="absolute bottom-4 left-4 font-mono-brand text-[9px] uppercase tracking-[.16em] text-white/80">02 / the replay</figcaption></figure>
            <figure className="group relative col-span-1 aspect-[3/4] overflow-hidden md:col-span-4 md:mt-8 md:aspect-[3/4]"><img loading="lazy" src="/guest-list-gallery-3.jpg" alt={t.gallery.alt3} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><figcaption className="absolute bottom-4 left-4 font-mono-brand text-[9px] uppercase tracking-[.16em] text-white/80">03 / well placed</figcaption></figure>
             <figure className="group relative col-span-1 aspect-[3/4] overflow-hidden md:col-span-3 md:mt-[-4rem] md:aspect-[3/4]"><img loading="lazy" src="/guest-list-hero.jpg" alt={t.gallery.alt4} className="h-full w-full object-cover object-[62%] transition duration-700 group-hover:scale-105" /><figcaption className="absolute bottom-4 left-4 font-mono-brand text-[9px] uppercase tracking-[.16em] text-white/80">04 / after dark</figcaption></figure>
             <figure className="group relative col-span-1 mt-10 aspect-[3/4] overflow-hidden md:col-span-4 md:mt-8 md:aspect-[3/4]"><img loading="lazy" src="/guest-list-gallery-1.jpg" alt={t.gallery.alt5} className="h-full w-full object-cover object-[35%] transition duration-700 group-hover:scale-105" /><figcaption className="absolute bottom-4 left-4 font-mono-brand text-[9px] uppercase tracking-[.16em] text-white/80">05 / raise a glass</figcaption></figure>
             <figure className="group relative col-span-2 aspect-[4/5] overflow-hidden md:col-span-5 md:mt-[-3rem] md:aspect-[5/6]"><img loading="lazy" src="/guest-list-gallery-2.jpg" alt={t.gallery.alt6} className="h-full w-full object-cover object-[68%] transition duration-700 group-hover:scale-105" /><figcaption className="absolute bottom-4 left-4 font-mono-brand text-[9px] uppercase tracking-[.16em] text-white/80">06 / one more</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="bg-[#b9934c] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1160px] gap-12 md:grid-cols-[.65fr_1.35fr] md:items-center">
          <div className="flex items-center gap-3"><Sparkles size={18} /><p className="font-mono-brand text-[10px] uppercase tracking-[.22em]">{t.testimonial.label}</p></div>
          <div><blockquote className="font-display text-[clamp(2rem,4.5vw,4.2rem)] leading-[1.05] tracking-[-.035em]">“{t.testimonial.quote}”</blockquote><div className="mt-7 flex items-center gap-3 text-xs uppercase tracking-[.13em]"><span className="h-px w-8 bg-[#30251a]/60" />{t.testimonial.name} <span className="text-[#5b451f]">/</span> <span className="text-[#5b451f]">{t.testimonial.event}</span></div></div>
        </div>
      </section>

      <section id="booking" className="bg-[#f0eadf] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1160px]">
          <div className="grid gap-12 md:grid-cols-[.7fr_1.3fr] md:gap-24">
            <div><p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#9a6e22]">{t.booking.label}</p><h2 className="mt-6 font-display text-[clamp(3.5rem,6vw,6rem)] leading-[.88] tracking-[-.05em] text-[#30251a]">{t.booking.title}</h2><p className="mt-7 max-w-[310px] text-sm leading-6 text-[#665845]">{t.booking.body}</p><div className="mt-10 flex items-start gap-3 border-t border-[#ccbda4] pt-5 text-xs leading-5 text-[#665845]"><Play size={13} className="mt-1 shrink-0 fill-[#b89044] text-[#b89044]" />{t.booking.note}</div></div>
            <div>
              <div className="mb-6 flex flex-wrap border-b border-[#ccbda4]" role="tablist" aria-label={t.booking.selected}>
                {packageData.map((item) => <button key={item.key} role="tab" aria-selected={selectedPackage === item.key} onClick={() => setSelectedPackage(item.key)} className={`relative px-3 py-4 text-[10px] font-bold uppercase tracking-[.12em] transition first:pl-0 sm:px-5 ${selectedPackage === item.key ? 'text-[#9a6e22]' : 'text-[#8a7a63] hover:text-[#30251a]'}`} data-testid={`tab-package-${item.key}`}>{item.name}{selectedPackage === item.key && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-[#b89044] first:inset-x-0 sm:inset-x-5" />}</button>)}
              </div>
              <BookingEmbed slug={slugs[selectedPackage]} label={t.booking.selected} fallback={t.booking.fallback} loading={t.booking.loading} />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#ded2bf] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1160px] gap-14 md:grid-cols-[.75fr_1.25fr] md:gap-24"><div><p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#9a6e22]">{t.faq.label}</p><h2 className="mt-6 font-display text-[clamp(3.3rem,6vw,6rem)] leading-[.89] tracking-[-.05em] text-[#30251a]">{t.faq.title}</h2></div><div>{t.faq.items.map(([question, answer], index) => <div key={question} className="border-t border-[#bcae98] last:border-b"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left text-sm font-semibold text-[#30251a]" aria-expanded={openFaq === index} data-testid={`button-faq-${index}`}><span>{question}</span><ChevronDown size={17} className={`shrink-0 text-[#9a6e22] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button><div className={`grid transition-[grid-template-rows,opacity] duration-300 ${openFaq === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><p className="overflow-hidden pb-6 pr-10 text-sm leading-6 text-[#665845]">{answer}</p></div></div>)}</div></div>
      </section>

      <footer className="bg-[#1c1712] px-5 pb-7 pt-20 text-[#f0e7d8] md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-12 border-b border-[#6b5737] pb-16 md:grid-cols-[1.2fr_.8fr_.8fr]">
            <div><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center border border-[#c9a75d] text-[#c9a75d]"><span className="font-display text-xl italic">G</span></span><span className="text-xs font-semibold uppercase tracking-[.28em]">Guest List</span></div><h2 className="mt-10 max-w-[560px] font-display text-[clamp(3rem,6vw,6rem)] leading-[.9] tracking-[-.05em]">{t.footer.kicker}</h2></div>
            <div><p className="font-mono-brand text-[9px] uppercase tracking-[.2em] text-[#c9a75d]">{t.footer.area}</p><p className="mt-5 max-w-[220px] text-sm leading-6 text-[#bcae98]">{t.footer.body}</p></div>
            <div><p className="font-mono-brand text-[9px] uppercase tracking-[.2em] text-[#c9a75d]">{t.footer.contact}</p><div className="mt-5 flex flex-col items-start gap-3 text-sm"><a href="#" className="border-b border-[#6b5737] pb-1 transition hover:text-[#d9b76a]" data-testid="link-instagram"><Instagram size={14} className="mr-2 inline" />{t.footer.instagram}</a><a href="#" className="border-b border-[#6b5737] pb-1 transition hover:text-[#d9b76a]" data-testid="link-tiktok"><Music2 size={14} className="mr-2 inline" />{t.footer.tiktok}</a><a href="mailto:hello@guestlistbooth.com" className="border-b border-[#6b5737] pb-1 transition hover:text-[#d9b76a]" data-testid="link-email">{t.footer.email}</a><a href="tel:+14045550148" className="border-b border-[#6b5737] pb-1 transition hover:text-[#d9b76a]" data-testid="link-phone">{t.footer.phone}</a></div></div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-6 text-[10px] uppercase tracking-[.13em] text-[#8e7d65] sm:flex-row"><p>{t.footer.copyright}</p><div className="flex gap-5"><a href="#" data-testid="link-privacy">{t.footer.privacy}</a><a href="#" data-testid="link-terms">{t.footer.terms}</a></div></div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return <Switch><Route path="/" component={AppHome} /><Route component={AppHome} /></Switch>;
}

export default function App() {
  return <Router />;
}
