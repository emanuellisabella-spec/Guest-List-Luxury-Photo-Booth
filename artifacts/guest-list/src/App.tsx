import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Instagram, Menu, Music2, Sparkles, X } from 'lucide-react';
import { Route, Switch } from 'wouter';

type Language = 'en' | 'es';
type PackageKey = 'social' | 'signature' | 'celebration';

const translations = {
  en: {
    nav: { about: 'How it works', packages: 'Packages', gallery: 'In the wild', faq: 'FAQ', book: 'Book your date', language: 'ES' },
    hero: {
      title: 'The guest list\nstarts here.',
      body: 'Sleek iPad photo booth rentals designed to blend seamlessly into your event and capture the moments your guests will replay.',
      primary: 'Check availability',
      secondary: 'How it works',
    },
    about: {
      label: 'How it works',
      title: 'From booking to\nthe last photo.',
      body: 'Pick your date and we handle the rest. Here is what happens, from the moment you book to the morning after your event.',
      steps: [
        ['Pick your date', 'Choose a package and a date above, then pay a flat deposit to hold it. Online bookings need at least 48 hours’ notice.'],
        ['Fill in your event form', 'After you book, we reach out and you fill in our event form with your venue, timing and details. All we need is enough space and a standard outlet.'],
        ['Set up, snap, share', 'We arrive early and set up before your guests do. They tap the screen, a countdown starts, and they get photos, GIFs and boomerangs right away by text, email or QR code, with your Guest List host on hand. Your private online gallery is ready the same night.'],
      ],
      imageAlt: 'Guests using the white Guest List iPad photo booth kiosk at an event',
      cta: 'Meet the experience',
    },
    packages: {
      label: 'Pick your mood',
      title: 'The right package\nfor your people.',
      included: 'What’s included',
      popular: 'Most booked',
      book: 'Book now',
      social: { name: 'The Social', price: '$399', duration: '2 hours', description: 'An effortless, elevated photo experience for your celebration. Guests step up, strike a pose, and walk away with instant digital keepsakes.', items: ['2 hours on-site with your dedicated Guest List host', 'Digital photos, GIFs & boomerangs', 'Custom-designed template', 'Instant sharing via text/email/QR', 'Private online gallery delivered same night'] },
      signature: { name: 'The Signature', price: '$549', duration: '3 hours', description: 'Our most-booked experience — built for hosts who want the night to feel as good as it looks.', items: ['3 hours on-site with your dedicated Guest List host', 'Priority date hold', 'Digital photos, GIFs & boomerangs', 'Custom-designed template', 'Instant sharing via text/email/QR', 'Private online gallery delivered same night', 'Guest lead capture'] },
      celebration: { name: 'The Celebration', price: '$749', duration: '4 hours', description: 'The full Guest List experience. Four hours of uninterrupted coverage, a fully branded setup, and every detail styled to match the caliber of your event.', items: ['4 hours on-site with your dedicated Guest List host', 'Priority date hold', 'Digital photos, GIFs & boomerangs', 'Fully custom template & branded start screen', 'Curated prop styling', 'Instant sharing via text/email/QR', 'Private online gallery delivered same night', 'Guest lead capture'] },
    },
    gallery: {
      label: 'The evidence',
      title: 'Good nights look\nbetter in replay.',
      body: 'From first toast to final song, we make room for the in-between moments — the ones that become your favorites.',
      alt1: 'Guests laughing together at an Atlanta event',
      alt2: 'Two women laughing as they look at their photo on the booth screen',
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
    },
    testimonial: {
      quote: 'Guest List was the one detail everyone kept talking about. It looked beautiful, it was incredibly easy, and we got to relive the whole night the next morning.',
      name: 'Jasmine R.',
      event: 'Wedding reception · Atlanta, GA',
      label: 'From the guest book',
    },
    faq: {
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
    leadQuince: {
      title: 'Free Download: The Quinceañera Photo Timeline Checklist',
      body: 'Never miss a moment — plan your photo booth timing around your reception, not just your ceremony.',
      firstNameLabel: 'First name',
      lastNameLabel: 'Last name',
      emailLabel: 'Email address',
      placeholder: 'you@email.com',
      submit: 'Send me the checklist',
      sending: 'Sending…',
      consentBefore: 'I agree to the ',
      privacyLabel: 'Privacy Policy',
      consentMid: ' and ',
      termsLabel: 'Terms of Use',
      consentAfter: ', and I consent to receive occasional emails from Guest List. I can unsubscribe at any time.',
      error: 'Something went wrong. Please try again in a moment.',
      successTitle: 'Your checklist is ready.',
      successBody: 'Download it below and keep it handy while you plan.',
      download: 'Download the checklist',
    },
          leadWedding: {
        title: 'Free Download: The Wedding Reception Photo Timeline',
        body: 'A simple guide to placing your photo booth at the right moment, so it adds to the night instead of competing with it.',
        firstNameLabel: 'First name',
        lastNameLabel: 'Last name',
        emailLabel: 'Email address',
        placeholder: 'you@email.com',
        submit: 'Send me the timeline',
        sending: 'Sending…',
        consentBefore: 'I agree to the ',
        privacyLabel: 'Privacy Policy',
        consentMid: ' and ',
        termsLabel: 'Terms of Use',
        consentAfter: ', and I consent to receive occasional emails from Guest List. I can unsubscribe at any time.',
        error: 'Something went wrong. Please try again in a moment.',
        successTitle: 'Your timeline is ready.',
        successBody: 'Download it below and share it with your planner or coordinator.',
        download: 'Download the timeline',
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
    nav: { about: 'Cómo funciona', packages: 'Paquetes', gallery: 'Galería', faq: 'Preguntas', book: 'Reserva tu fecha', language: 'EN' },
    hero: {
      title: 'La lista de invitados\nempieza aquí.',
      body: 'Alquiler de fotomatones iPad elegantes, diseñados para integrarse a tu evento y capturar los momentos que tus invitados querrán revivir.',
      primary: 'Ver paquetes',
      secondary: 'Cómo funciona',
    },
    about: {
      label: 'Cómo funciona',
      title: 'De la reserva\na la última foto.',
      body: 'Elige tu fecha y nosotros nos encargamos del resto. Esto es lo que pasa desde que reservas hasta la mañana siguiente a tu evento.',
      steps: [
        ['Elige tu fecha', 'Escoge un paquete y una fecha arriba, y paga un depósito fijo para reservarla. Las reservas en línea requieren al menos 48 horas de anticipación.'],
        ['Llena el formulario del evento', 'Después de reservar, nos ponemos en contacto contigo y llenas el formulario de tu evento con los detalles de tu lugar y horario. Solo necesitamos espacio suficiente y un enchufe estándar.'],
        ['Instalamos, posan y comparten', 'Llegamos temprano para instalar todo antes de que lleguen tus invitados. Se acercan, tocan la pantalla, empieza la cuenta regresiva y reciben sus fotos, GIFs y boomerangs al instante por texto, email o código QR, con tu anfitrión de Guest List a mano. Tu galería privada en línea está lista esa misma noche.'],
      ],
      imageAlt: 'Invitados usando el fotomatón iPad blanco de Guest List en un evento',
      cta: 'Conoce la experiencia',
    },
    packages: {
      label: 'Elige tu ambiente',
      title: 'El paquete perfecto\npara tu gente.',
      included: 'Qué incluye',
      popular: 'Más reservado',
      book: 'Reservar ahora',
      social: { name: 'Paquete Fiesta', price: '$399', duration: '2 horas', description: 'Una experiencia fotográfica elevada y sin esfuerzo para tu celebración. Tus invitados posan y se llevan recuerdos digitales al instante.', items: ['2 horas en el evento con tu anfitrión Guest List', 'Fotos digitales, GIFs y boomerangs', 'Plantilla diseñada a medida', 'Compartir al instante por texto/email/QR', 'Galería privada entregada esa misma noche'] },
      signature: { name: 'Paquete Fiesta Grande', price: '$549', duration: '3 horas', description: 'Nuestra experiencia más reservada, creada para anfitriones que quieren que la noche se sienta tan bien como se ve.', items: ['3 horas en el evento con tu anfitrión Guest List', 'Reserva prioritaria de fecha', 'Fotos digitales, GIFs y boomerangs', 'Plantilla diseñada a medida', 'Compartir al instante por texto/email/QR', 'Galería privada entregada esa misma noche', 'Captura de datos de invitados'] },
      celebration: { name: 'Paquete Fiesta Real', price: '$749', duration: '4 horas', description: 'La experiencia Guest List completa. Cuatro horas de cobertura, un montaje totalmente personalizado y cada detalle a la altura de tu evento.', items: ['4 horas en el evento con tu anfitrión Guest List', 'Reserva prioritaria de fecha', 'Fotos digitales, GIFs y boomerangs', 'Plantilla totalmente personalizada y pantalla de inicio con marca', 'Accesorios seleccionados', 'Compartir al instante por texto/email/QR', 'Galería privada entregada esa misma noche', 'Captura de datos de invitados'] },
    },
    gallery: {
      label: 'La prueba',
      title: 'Las buenas noches\nse ven mejor después.',
      body: 'Del primer brindis a la última canción, hacemos espacio para esos momentos espontáneos que se vuelven tus favoritos.',
      alt1: 'Invitados riendo en un evento de Atlanta',
      alt2: 'Dos mujeres riendo mientras ven su foto en la pantalla del fotomatón',
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
    },
    testimonial: {
      quote: 'Guest List fue el detalle del que todos hablaban. Se veía increíble, fue muy fácil y pudimos revivir toda la noche a la mañana siguiente.',
      name: 'Jasmine R.',
      event: 'Recepción de boda · Atlanta, GA',
      label: 'Del libro de invitados',
    },
    faq: {
      title: 'Preguntas frecuentes.',
      items: [
        ['¿Qué zonas cubren?', 'Estamos en Atlanta y servimos el área metropolitana, incluyendo Fair Oaks, Mableton, Buckhead, Midtown, Decatur, Marietta, Alpharetta y lugares cercanos. Puede aplicarse un cargo de viaje fuera de nuestra zona principal.'],
        ['¿Necesitan Wi-Fi?', 'No. Nuestro fotomatón mantiene la fila en movimiento incluso sin Wi-Fi. Los invitados pueden compartir por texto o email cuando haya conexión y cada galería se respalda para su entrega.'],
        ['¿Puedo personalizar la experiencia?', 'Por supuesto. El diseño, la pantalla de bienvenida y la galería se adaptan a tu evento para que todo se sienta tuyo.'],
        ['¿Con cuánta anticipación debo reservar?', 'Recomendamos de 4 a 8 semanas. Los sábados populares se llenan rápido, así que escríbenos cuando tengas tu fecha.'],
        ['¿Cuánto tarda el montaje?', 'Llegamos con tiempo para que el montaje sea invisible, normalmente entre 45 y 60 minutos antes de la hora de inicio. Tu experiencia comienza lista, cuidada y a tiempo.'],
        ['¿Se requiere un depósito?', 'Tu fecha queda reservada cuando confirmas la reserva en Cal.com. El calendario mostrará los detalles actuales del depósito y pago para el paquete elegido.'],
      ],
    },
    leadQuince: {
      title: 'Descarga Gratis: Lista de Verificación de Momentos Fotográficos de Quinceañera',
      body: 'No te pierdas ningún momento — planifica el horario de tu cabina según tu recepción, no solo tu ceremonia.',
      firstNameLabel: 'Nombre',
      lastNameLabel: 'Apellido',
      emailLabel: 'Correo electrónico',
      placeholder: 'tu@correo.com',
      submit: 'Enviarme la lista',
      sending: 'Enviando…',
      consentBefore: 'Acepto la ',
      privacyLabel: 'Política de Privacidad',
      consentMid: ' y los ',
      termsLabel: 'Términos de Uso',
      consentAfter: ', y doy mi consentimiento para recibir correos ocasionales de Guest List. Puedo darme de baja en cualquier momento.',
      error: 'Algo salió mal. Inténtalo de nuevo en un momento.',
      successTitle: 'Tu lista está lista.',
      successBody: 'Descárgala aquí abajo y tenla a mano mientras planificas.',
      download: 'Descargar la lista',
    },
          leadWedding: {
        title: 'Descarga Gratis: El Horario de Fotos para tu Recepción de Boda',
        body: 'Una guía sencilla para ubicar tu cabina de fotos en el momento preciso, para que se sume a la noche en lugar de competir con ella.',
        firstNameLabel: 'Nombre',
        lastNameLabel: 'Apellido',
        emailLabel: 'Correo electrónico',
        placeholder: 'tu@correo.com',
        submit: 'Enviarme el horario',
        sending: 'Enviando…',
        consentBefore: 'Acepto la ',
        privacyLabel: 'Política de Privacidad',
        consentMid: ' y los ',
        termsLabel: 'Términos de Uso',
        consentAfter: ', y doy mi consentimiento para recibir correos ocasionales de Guest List. Puedo darme de baja en cualquier momento.',
        error: 'Algo salió mal. Inténtalo de nuevo en un momento.',
        successTitle: 'Tu horario está listo.',
        successBody: 'Descárgalo aquí abajo y compártelo con tu wedding planner o coordinador.',
        download: 'Descargar el horario',
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
// Order of the pricing cards (highest price first, for price anchoring). The booking tabs keep the packageKeys order above.
const cardOrder: PackageKey[] = ['social', 'signature', 'celebration'];
const slugs: Record<Language, Record<PackageKey, string>> = {
  en: {
    social: 'the-social-package-selfie-booth',
    signature: 'the-signature-package-selfie-booth',
    celebration: 'the-celebration-package-selfie-booth',
  },
  es: {
    social: 'paquete-fiesta-dos-horas',
    signature: 'paquete-fiesta-grande-tres-horas',
    celebration: 'paquete-fiesta-real-cuatro-horas',
  },
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
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'light' },
        calLink: `guestlistbooth/${slug}`,
      });
      namespace('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
        theme: 'light',
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
    <div className="relative min-h-[420px] overflow-hidden border border-[#d7c8a7] bg-[#f7f1e6]">
      <div ref={embedRef} className="min-h-[420px]" data-testid="cal-embed-selected" />
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

// ─────────────────────────────────────────────────────────────────────────────
// LEAD MAGNET — email capture
//
// Posts the sign-up straight from the visitor's browser to the Zoho Campaigns
// form (the same way Zoho's own embed code does), tagged with Source and Language.
// Each lead magnet has its own Zoho form and mailing list: the English wedding
// timeline, and the Spanish quinceañera checklist (its own Spanish campaign).
// These identifiers are public: they appear in any page that embeds the Zoho form.
// ─────────────────────────────────────────────────────────────────────────────
const ZOHO_FORM = {
  action: 'https://zgnp-zngp.maillist-manage.com/weboptin.zc',
  hidden: {
    zc_trackCode: '',
    viewFrom: 'URL_ACTION',
    submitType: 'optinCustomView',
    emailReportId: '',
    zx: '12921b4de',
    zcvers: '3.0',
    oldListIds: '',
    mode: 'OptinCreateView',
    zctd: '',
    PRIVACY_POLICY: 'PRIVACY_AGREED',
    // Matches Zoho's "No Script" embed, which is the variant meant for plain form posts.
    // (That embed also has a zc_spmSubmit bot-trap field that its script removes; we never send it.)
    scriptless: 'yes',
  } as Record<string, string>,
  lists: {
    // English: "The Wedding Reception Photo Timeline"
    wedding: {
      lD: '117d7e7358a05c771',
      zcld: '117d7e7358a05c771',
      zc_formIx: '3z819d0a1b9bb968330498d1a2eca125b5131f7982b3c22c34db73b622a5cc5890',
    },
    // Spanish: "Lista de Verificación de Momentos Fotográficos de Quinceañera"
    quince: {
      lD: '117d7e7358a060a6a',
      zcld: '117d7e7358a060a6a',
      zc_formIx: '3z32d0faf70b715bc27d3ebc40a330134e6f3cdb81c889652469a7416e4738cb03',
    },
  } as Record<'wedding' | 'quince', Record<string, string>>,
};

// Submits a hidden <form> into a hidden <iframe>. Zoho's response can't be read cross-origin,
// so we wait for the frame to load (or a short timeout) and treat that as sent.
function postToZoho(fields: Record<string, string>, list: 'wedding' | 'quince') {
  return new Promise<void>((resolve) => {
    const frameName = `zc-signup-${Date.now()}`;
    const iframe = document.createElement('iframe');
    iframe.name = frameName;
    iframe.title = 'Sign-up';
    iframe.setAttribute('aria-hidden', 'true');
    iframe.style.display = 'none';
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = ZOHO_FORM.action;
    form.target = frameName;
    form.style.display = 'none';
    for (const [name, value] of Object.entries({ ...ZOHO_FORM.hidden, ...ZOHO_FORM.lists[list], ...fields })) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    }
    document.body.append(iframe, form);
    const startedAt = Date.now();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setTimeout(resolve, Math.max(0, 1500 - (Date.now() - startedAt)));
    };
    form.submit();
    iframe.addEventListener('load', finish);
    setTimeout(finish, 6000);
    // Keep the frame around long enough for the request to complete before cleaning up.
    setTimeout(() => { iframe.remove(); form.remove(); }, 20000);
  });
}

type LeadCopy = {
  title: string;
  body: string;
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  placeholder: string;
  submit: string;
  sending: string;
  consentBefore: string;
  privacyLabel: string;
  consentMid: string;
  termsLabel: string;
  consentAfter: string;
  error: string;
  successTitle: string;
  successBody: string;
  download: string;
};

function LeadMagnet({ copy, language, pdfPath, source, zohoList }: { copy: LeadCopy; language: Language; pdfPath: string; source: string; zohoList: 'wedding' | 'quince' }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [honey, setHoney] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const submit = async () => {
    if (status === 'sending' || !agreed) return;
    // Bots tend to fill the hidden field; quietly ignore them.
    if (honey) {
      setStatus('success');
      return;
    }
    setStatus('sending');
    try {
      await postToZoho({
        FIRSTNAME: firstName.trim(),
        LASTNAME: lastName.trim(),
        CONTACT_EMAIL: email.trim(),
        CONTACT_CF1: source,
        CONTACT_CF2: language === 'es' ? 'Spanish' : 'English',
      }, zohoList);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="checklist" className="bg-[#1c1712] px-5 py-20 text-[#f5eee2] md:px-10 md:py-28" data-testid="section-lead-magnet">
      <div className="mx-auto grid max-w-[1320px] gap-10 md:grid-cols-[1.15fr_.85fr] md:items-center md:gap-16">
        <div>
          <span className="block h-px w-14 bg-[#c9a75d]" aria-hidden="true" />
          <h2 className="mt-8 max-w-[680px] font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[.98] tracking-[-.04em] text-[#f5eee2]">{copy.title}</h2>
          <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-[#e7dcca] md:text-[17px]">{copy.body}</p>
        </div>
        <div className="border border-[#c9a75d]/40 bg-[#241d16] p-6 md:p-9">
          {status === 'success' ? (
            <div role="status" data-testid="lead-success">
              <span className="flex h-10 w-10 items-center justify-center border border-[#c9a75d] text-[#d9b76a]"><Check size={18} /></span>
              <p className="mt-5 font-display text-3xl leading-tight text-[#f5eee2]">{copy.successTitle}</p>
              <p className="mt-3 text-[15px] leading-7 text-[#e7dcca]">{copy.successBody}</p>
              <a href={pdfPath} download className="group mt-7 inline-flex items-center gap-4 bg-[#c9a75d] px-6 py-4 text-[11px] font-bold uppercase tracking-[.15em] text-[#20170e] transition hover:bg-[#ecd28f]" data-testid="link-lead-download">{copy.download}<ArrowDown size={15} /></a>
            </div>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); void submit(); }} data-testid="form-lead">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="lead-first-name" className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#d9b76a]">{copy.firstNameLabel}</label>
                  <input id="lead-first-name" name="firstName" type="text" required maxLength={100} autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} className="mt-3 w-full border border-[#c9a75d]/50 bg-transparent px-4 py-4 text-[15px] text-[#f5eee2] outline-none transition placeholder:text-[#8f826d] focus:border-[#ecd28f]" data-testid="input-lead-first-name" />
                </div>
                <div>
                  <label htmlFor="lead-last-name" className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#d9b76a]">{copy.lastNameLabel}</label>
                  <input id="lead-last-name" name="lastName" type="text" required maxLength={50} autoComplete="family-name" value={lastName} onChange={(event) => setLastName(event.target.value)} className="mt-3 w-full border border-[#c9a75d]/50 bg-transparent px-4 py-4 text-[15px] text-[#f5eee2] outline-none transition placeholder:text-[#8f826d] focus:border-[#ecd28f]" data-testid="input-lead-last-name" />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="lead-email" className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#d9b76a]">{copy.emailLabel}</label>
                <input id="lead-email" name="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={copy.placeholder} className="mt-3 w-full border border-[#c9a75d]/50 bg-transparent px-4 py-4 text-[15px] text-[#f5eee2] outline-none transition placeholder:text-[#8f826d] focus:border-[#ecd28f]" data-testid="input-lead-email" />
              </div>
              <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#cbbda7]">
                <input type="checkbox" name="consent" required checked={agreed} onChange={(event) => setAgreed(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#c9a75d]" data-testid="checkbox-lead-consent" />
                <span>{copy.consentBefore}<a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline decoration-[#c9a75d]/60 underline-offset-2 hover:text-[#ecd28f]">{copy.privacyLabel}</a>{copy.consentMid}<a href="/terms" target="_blank" rel="noopener noreferrer" className="underline decoration-[#c9a75d]/60 underline-offset-2 hover:text-[#ecd28f]">{copy.termsLabel}</a>{copy.consentAfter}</span>
              </label>
              <div className="hidden" aria-hidden="true">
                <label>Leave this field empty<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={honey} onChange={(event) => setHoney(event.target.value)} /></label>
              </div>
              <button type="submit" disabled={status === 'sending'} className="mt-4 inline-flex w-full items-center justify-center bg-[#c9a75d] px-6 py-4 text-[11px] font-bold uppercase tracking-[.15em] text-[#20170e] transition hover:bg-[#ecd28f] disabled:cursor-wait disabled:opacity-60" data-testid="button-lead-submit">{status === 'sending' ? copy.sending : copy.submit}</button>
              {status === 'error' ? <p role="alert" className="mt-4 text-sm leading-6 text-[#e9b7a3]">{copy.error}</p> : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function AppHome({ initialLanguage, leadMagnet }: { initialLanguage?: Language; leadMagnet: 'wedding' | 'quince' }) {
  const [language, setLanguage] = useState<Language>(initialLanguage ?? 'en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>('signature');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activePackage, setActivePackage] = useState(0);
  const packageRowRef = useRef<HTMLDivElement>(null);
  const onPackageScroll = () => {
    const row = packageRowRef.current;
    const first = row?.firstElementChild as HTMLElement | null;
    if (!row || !first) return;
    const step = first.offsetWidth + 12;
    setActivePackage(Math.min(cardOrder.length - 1, Math.max(0, Math.round(row.scrollLeft / step))));
  };
  const t = translations[language];
  const packageData = useMemo(() => packageKeys.map((key) => ({ key, ...t.packages[key] })), [t]);
  const cardData = useMemo(() => cardOrder.map((key) => ({ key, ...t.packages[key] })), [t]);
  const leadConfig = leadMagnet === 'quince'
    ? { copy: t.leadQuince, pdfPath: '/quinceanera-checklist.pdf', source: 'quinceanera-checklist', zohoList: 'quince' as const }
    : { copy: t.leadWedding, pdfPath: '/wedding-reception-timeline.pdf', source: 'wedding-reception-timeline', zohoList: 'wedding' as const };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 34);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
            <button onClick={() => jump('packages')} className="nav-link" data-testid="link-nav-packages">{t.nav.packages}</button>
            <button onClick={() => jump('experience')} className="nav-link" data-testid="link-nav-experience">{t.nav.about}</button>
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
            {[['packages', t.nav.packages], ['experience', t.nav.about], ['gallery', t.nav.gallery], ['faq', t.nav.faq], ['booking', t.nav.book]].map(([id, label]) => <button key={id} onClick={() => jump(id)} className="text-left text-xs uppercase tracking-[.18em] text-[#e9ddc5]" data-testid={`link-mobile-${id}`}>{label}</button>)}
          </div>
        </div>}
      </nav>

      <section id="top" className="relative flex min-h-[760px] items-end overflow-hidden bg-[#1c1712] pb-16 pt-36 md:min-h-[800px] md:pb-24">
        <img src={leadMagnet === 'quince' ? '/hero-quinceanera.webp' : '/hero-wedding.webp'} alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_30%] opacity-80" fetchPriority="high" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,18,13,.94)_0%,rgba(24,18,13,.64)_38%,rgba(24,18,13,.13)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,18,13,.78)_0%,transparent_42%)]" />
        <div className="relative mx-auto w-full max-w-[1320px] px-5 md:px-10">
          <div className="max-w-[680px]">
            
            <h1 className="reveal reveal-delay-1 whitespace-pre-line font-display text-[clamp(4rem,12vw,9.5rem)] leading-[.87] tracking-[-.055em] text-[#f5eee2]" data-testid="text-hero-title">{t.hero.title}</h1>
            <p className="reveal reveal-delay-2 mt-7 max-w-[480px] text-[15px] leading-7 text-[#e7dcca] md:text-[17px]">{t.hero.body}</p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-5">
              <button onClick={() => jump('booking')} className="group inline-flex items-center gap-4 bg-[#c9a75d] px-6 py-4 text-[11px] font-bold uppercase tracking-[.15em] text-[#20170e] transition hover:bg-[#ecd28f]" data-testid="button-hero-packages">{t.hero.primary}<ArrowDown size={15} className="transition-transform group-hover:translate-y-1" /></button>
              <button onClick={() => jump('experience')} className="inline-flex items-center gap-2 border-b border-[#c9a75d] pb-1 text-[11px] font-semibold uppercase tracking-[.16em] text-[#f6ecdb] transition hover:text-[#d9b76a]" data-testid="button-hero-experience">{t.hero.secondary}<ArrowUpRight size={14} /></button>
            </div>
          </div>
          
        </div>
      </section>

      <section id="booking" className="bg-[#f0eadf] px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1160px]">
          <div className="grid gap-8 md:grid-cols-[.4fr_1.6fr] md:gap-12">
            <div><p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#9a6e22]">{t.booking.label}</p><h2 className="mt-4 font-display text-[clamp(2.6rem,4.2vw,3.8rem)] leading-[.9] tracking-[-.05em] text-[#30251a]">{t.booking.title}</h2><p className="mt-4 max-w-[310px] text-sm leading-6 text-[#665845]">{t.booking.body}</p></div>
            <div>
              <div className="mb-3 flex flex-wrap border-b border-[#ccbda4]" role="tablist" aria-label={t.booking.selected}>
                {packageData.map((item) => <button key={item.key} role="tab" aria-selected={selectedPackage === item.key} onClick={() => setSelectedPackage(item.key)} className={`relative px-3 py-3 text-[10px] font-bold uppercase tracking-[.12em] transition first:pl-0 sm:px-5 ${selectedPackage === item.key ? 'text-[#9a6e22]' : 'text-[#8a7a63] hover:text-[#30251a]'}`} data-testid={`tab-package-${item.key}`}>{item.name}{selectedPackage === item.key && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-[#b89044] first:inset-x-0 sm:inset-x-5" />}</button>)}
              </div>
              <BookingEmbed slug={slugs[language][selectedPackage]} label={t.booking.selected} fallback={t.booking.fallback} loading={t.booking.loading} />
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="bg-[#292017] px-5 py-12 text-[#f2e9da] md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-7 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end md:gap-8">
            <div><p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#d9b76a]">{t.packages.label}</p><h2 className="mt-4 whitespace-pre-line font-display text-[clamp(2.3rem,7vw,6.6rem)] leading-[.92] tracking-[-.05em] md:mt-6">{t.packages.title}</h2></div>
          </div>
          <div ref={packageRowRef} onScroll={onPackageScroll} className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-10 md:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0" data-testid="package-carousel">
            {cardData.map((item, index) => <article key={item.key} className={`relative flex w-[84%] shrink-0 snap-center flex-col border p-5 transition-transform duration-300 hover:-translate-y-1 sm:w-[55%] md:p-8 lg:w-auto ${item.key === 'signature' ? 'border-[#c9a75d] bg-[#453722]' : 'border-[#69583e] bg-[#32271b]'}`} data-testid={`card-package-${item.key}`}>
              {item.key === 'signature' && <span className="absolute right-5 top-5 font-mono-brand text-[9px] uppercase tracking-[.18em] text-[#d9b76a]">{t.packages.popular}</span>}
              <p className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#bca885]">0{index + 1}</p>
              <h3 className="mt-6 font-display text-3xl tracking-[-.03em] md:mt-12 md:text-4xl">{item.name}</h3>
              <p className="mt-3 text-[13px] leading-5 text-[#d5c8b5] md:mt-4 md:min-h-[72px] md:text-sm md:leading-6">{item.description}</p>
              <div className="mt-4 flex items-end gap-3 border-b border-[#756347] pb-4 md:mt-7 md:pb-6"><span className="font-display text-4xl">{item.price}</span><span className="mb-1 font-mono-brand text-[9px] uppercase tracking-[.13em] text-[#bca885]">{item.duration}</span></div>
              <p className="mt-4 font-mono-brand text-[9px] uppercase tracking-[.19em] text-[#d9b76a] md:mt-6">{t.packages.included}</p>
              <ul className="mt-3 flex flex-1 flex-col gap-2 md:mt-4 md:gap-3">{item.items.map((include) => <li key={include} className="flex gap-2.5 text-[13px] leading-5 text-[#e4d9c7] md:gap-3 md:text-sm"><Check size={15} className="mt-0.5 shrink-0 text-[#c9a75d]" />{include}</li>)}</ul>
              <button onClick={() => choosePackage(item.key)} className="mt-6 flex w-full items-center justify-between border border-[#c9a75d] px-5 py-3.5 md:mt-9 md:py-4 text-[10px] font-bold uppercase tracking-[.17em] text-[#e9d7af] transition hover:bg-[#c9a75d] hover:text-[#292017]" data-testid={`button-book-${item.key}`}>{t.packages.book}<ArrowUpRight size={15} /></button>
            </article>)}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 lg:hidden" aria-hidden="true">
            {cardData.map((item, index) => <span key={item.key} className={`h-1.5 rounded-full transition-all ${index === activePackage ? 'w-5 bg-[#c9a75d]' : 'w-1.5 bg-[#69583e]'}`} />)}
          </div>
        </div>
      </section>

      <section id="experience" className="bg-[#f0eadf] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1160px] gap-16 md:grid-cols-[.8fr_1.2fr] md:gap-24">
          <div>
            <p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#9a6e22]">{t.about.label}</p>
            <div className="mt-7 h-px w-16 bg-[#b89044]" />
            <figure className="mt-8 aspect-[4/3] max-w-[440px] overflow-hidden bg-[#e4dccb] md:aspect-[3/4]"><img loading="lazy" src="/booth-kiosk.webp" alt={t.about.imageAlt} width={1086} height={1448} className="h-full w-full object-cover object-[50%_32%]" /></figure>
          </div>
          <div>
            <h2 className="max-w-[700px] whitespace-pre-line font-display text-[clamp(2.8rem,5.2vw,5rem)] leading-[.95] tracking-[-.045em] text-[#30251a]">{t.about.title}</h2>
            <p className="mt-9 max-w-[620px] text-lg leading-8 text-[#665845]">{t.about.body}</p>
            <ol className="mt-12 border-t border-[#ccbda4]" data-testid="list-how-it-works">
              {t.about.steps.map(([title, text], index) => <li key={title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-[#ccbda4] py-6 sm:grid-cols-[4rem_1fr]">
                <span className="font-display text-3xl text-[#b89044]">{String(index + 1).padStart(2, '0')}</span>
                <div><h3 className="font-display text-2xl tracking-[-.02em] text-[#30251a]">{title}</h3><p className="mt-2 max-w-[560px] text-[15px] leading-7 text-[#665845]">{text}</p></div>
              </li>)}
            </ol>
          </div>
        </div>
      </section>

      <LeadMagnet copy={leadConfig.copy} pdfPath={leadConfig.pdfPath} source={leadConfig.source} zohoList={leadConfig.zohoList} language={language} />

      <section id="gallery" className="bg-[#e9e0d1] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#9a6e22]">{t.gallery.label}</p><h2 className="mt-6 whitespace-pre-line font-display text-[clamp(3.1rem,7vw,6.3rem)] leading-[.9] tracking-[-.05em] text-[#30251a]">{t.gallery.title}</h2></div><p className="max-w-[330px] text-sm leading-6 text-[#665845]">{t.gallery.body}</p></div>
          {/* Swap these generated editorial assets for real event images when available. */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
            <figure className="group relative col-span-2 aspect-[4/5] overflow-hidden md:col-span-5 md:aspect-[5/6]"><img loading="lazy" src="/gallery-good-company.webp" alt={t.gallery.alt1} className="h-full w-full object-cover object-[50%_35%] transition duration-700 group-hover:scale-105" /><figcaption className="absolute bottom-4 left-4 font-mono-brand text-[9px] uppercase tracking-[.16em] text-white/80">01 / good company</figcaption></figure>
            <figure className="group relative col-span-1 mt-10 aspect-[3/4] overflow-hidden md:col-span-3 md:mt-24 md:aspect-[3/4]"><img loading="lazy" src="/gallery-the-replay.webp" alt={t.gallery.alt2} className="h-full w-full object-cover object-[0%_30%] transition duration-700 group-hover:scale-105" /><figcaption className="absolute bottom-4 left-4 font-mono-brand text-[9px] uppercase tracking-[.16em] text-white/80">02 / the replay</figcaption></figure>
            <figure className="group relative col-span-1 aspect-[3/4] overflow-hidden md:col-span-4 md:mt-8 md:aspect-[3/4]"><img loading="lazy" src="/gallery-well-placed.webp" alt={t.gallery.alt3} className="h-full w-full object-cover object-[70%_50%] transition duration-700 group-hover:scale-105" /><figcaption className="absolute bottom-4 left-4 font-mono-brand text-[9px] uppercase tracking-[.16em] text-white/80">03 / well placed</figcaption></figure>
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

      <section id="faq" className="bg-[#ded2bf] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1160px] gap-14 md:grid-cols-[.75fr_1.25fr] md:gap-24"><div><h2 className="font-display text-[clamp(3.3rem,6vw,6rem)] leading-[.89] tracking-[-.05em] text-[#30251a]">{t.faq.title}</h2></div><div>{t.faq.items.map(([question, answer], index) => <div key={question} className="border-t border-[#bcae98] last:border-b"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left text-sm font-semibold text-[#30251a]" aria-expanded={openFaq === index} data-testid={`button-faq-${index}`}><span>{question}</span><ChevronDown size={17} className={`shrink-0 text-[#9a6e22] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button><div className={`grid transition-[grid-template-rows,opacity] duration-300 ${openFaq === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><p className="overflow-hidden pb-6 pr-10 text-sm leading-6 text-[#665845]">{answer}</p></div></div>)}</div></div>
      </section>

      <footer className="bg-[#1c1712] px-5 pb-7 pt-20 text-[#f0e7d8] md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-12 border-b border-[#6b5737] pb-16 md:grid-cols-[1.2fr_.8fr_.8fr]">
            <div><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center border border-[#c9a75d] text-[#c9a75d]"><span className="font-display text-xl italic">G</span></span><span className="text-xs font-semibold uppercase tracking-[.28em]">Guest List</span></div><h2 className="mt-10 max-w-[560px] font-display text-[clamp(3rem,6vw,6rem)] leading-[.9] tracking-[-.05em]">{t.footer.kicker}</h2></div>
            <div><p className="font-mono-brand text-[9px] uppercase tracking-[.2em] text-[#c9a75d]">{t.footer.area}</p><p className="mt-5 max-w-[220px] text-sm leading-6 text-[#bcae98]">{t.footer.body}</p></div>
            <div><p className="font-mono-brand text-[9px] uppercase tracking-[.2em] text-[#c9a75d]">{t.footer.contact}</p><div className="mt-5 flex flex-col items-start gap-3 text-sm"><a href="#" className="border-b border-[#6b5737] pb-1 transition hover:text-[#d9b76a]" data-testid="link-instagram"><Instagram size={14} className="mr-2 inline" />{t.footer.instagram}</a><a href="#" className="border-b border-[#6b5737] pb-1 transition hover:text-[#d9b76a]" data-testid="link-tiktok"><Music2 size={14} className="mr-2 inline" />{t.footer.tiktok}</a><a href="mailto:hello@guestlistbooth.com" className="border-b border-[#6b5737] pb-1 transition hover:text-[#d9b76a]" data-testid="link-email">{t.footer.email}</a><a href="tel:+14045550148" className="border-b border-[#6b5737] pb-1 transition hover:text-[#d9b76a]" data-testid="link-phone">{t.footer.phone}</a></div></div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-6 text-[10px] uppercase tracking-[.13em] text-[#8e7d65] sm:flex-row"><p>{t.footer.copyright}</p><div className="flex gap-5"><a href="/privacy" data-testid="link-privacy">{t.footer.privacy}</a><a href="/terms" data-testid="link-terms">{t.footer.terms}</a></div></div>
        </div>
      </footer>
    </main>
  );
}

const thankYouCopy = {
  en: {
    path: '/wedding-reception-timeline.pdf',
    title: 'You’re on the list.',
    body: 'Your Wedding Reception Photo Timeline is ready. Download it below and share it with your planner or coordinator.',
    download: 'Download the timeline',
    next: 'Planning your date?',
    cta: 'Check availability',
    ctaHref: '/',
    back: '← Back to main site',
    backHref: '/',
  },
  es: {
    path: '/quinceanera-checklist.pdf',
    title: 'Ya estás en la lista.',
    body: 'Tu lista de horarios fotográficos para la quinceañera está lista. Descárgala aquí y guárdala mientras planeas.',
    download: 'Descargar la lista',
    next: '¿Ya tienes fecha?',
    cta: 'Ver disponibilidad',
    ctaHref: '/es',
    back: '← Volver al sitio principal',
    backHref: '/es',
  },
} as const;

function ThankYou({ language }: { language: Language }) {
  const c = thankYouCopy[language];
  useEffect(() => {
    document.title = language === 'es' ? 'Gracias | Guest List' : 'Thank you | Guest List';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]') ?? document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'robots' }));
    const previous = meta.content;
    meta.content = 'noindex, follow';
    return () => { meta.content = previous || 'index, follow'; };
  }, [language]);
  return (
    <main className="flex min-h-screen flex-col bg-[#1c1712] px-5 py-10 text-[#f5eee2]" data-testid="page-thank-you">
      <a href={c.backHref} className="flex items-center gap-3 self-start" aria-label="Guest List">
        <span className="flex h-9 w-9 items-center justify-center border border-[#c9a75d] text-[#c9a75d]"><span className="font-display text-xl italic">G</span></span>
        <span className="text-xs font-semibold uppercase tracking-[.28em]">Guest List</span>
      </a>
      <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col justify-center py-16">
        <span className="flex h-10 w-10 items-center justify-center border border-[#c9a75d] text-[#d9b76a]"><Check size={18} /></span>
        <h1 className="mt-6 font-display text-[clamp(2.6rem,8vw,4.4rem)] leading-[.95] tracking-[-.04em]">{c.title}</h1>
        <p className="mt-5 text-[16px] leading-7 text-[#e7dcca]">{c.body}</p>
        <a href={c.path} download className="group mt-8 inline-flex w-full items-center justify-between bg-[#c9a75d] px-6 py-4 text-[11px] font-bold uppercase tracking-[.15em] text-[#20170e] transition hover:bg-[#ecd28f] sm:w-auto sm:gap-8" data-testid="link-thank-you-download">{c.download}<ArrowDown size={15} /></a>
        <div className="mt-12 border-t border-[#6b5737] pt-6">
          <p className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#d9b76a]">{c.next}</p>
          <a href={c.ctaHref} className="mt-3 inline-flex items-center gap-2 border-b border-[#c9a75d] pb-1 text-xs font-semibold uppercase tracking-[.14em] transition hover:text-[#d9b76a]">{c.cta} <ArrowUpRight size={13} /></a>
        </div>
      </div>
      <a href={c.backHref} className="self-start text-[10px] uppercase tracking-[.16em] text-[#bcae98] transition hover:text-[#d9b76a]">{c.back}</a>
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/thank-you" component={() => <ThankYou language="en" />} />
      <Route path="/gracias" component={() => <ThankYou language="es" />} />
      <Route path="/es" component={() => <AppHome initialLanguage="es" leadMagnet="quince" />} />
      <Route path="/" component={() => <AppHome leadMagnet="wedding" />} />
      <Route component={() => <AppHome leadMagnet="wedding" />} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}
