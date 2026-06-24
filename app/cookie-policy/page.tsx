"use client"

import '../privacy/legal.css'
import { LegalHeader } from '../privacy/legal-header'
import { LegalFooter } from '../privacy/legal-footer'
import { LegalLoader } from '../privacy/legal-loader'
import { LanguageProvider, useLanguage } from '@/lib/language-context'

export default function CookiePolicyPage() {
  return (
    <LanguageProvider>
      <CookiePolicyContent />
    </LanguageProvider>
  )
}

function CookiePolicyContent() {
  const { locale } = useLanguage()
  const t = locale === "es" ? es : en

  return (
    <div className="min-h-screen bg-white">
      <LegalLoader color="#FEA060" />
      <LegalHeader />

      <div className="legal-page pt-18" style={{"--accent": "#FEA060"} as React.CSSProperties}>
        <header className="legal-header">
          <span className="legal-badge">{t.badge}</span>
          <h1>{t.title}</h1>
          <p className="legal-subtitle">{t.subtitle}</p>
          <div className="legal-meta">
            <span>{t.version}</span>
            <span className="legal-meta-dot" />
            <span>{t.lastUpdated}</span>
            <span className="legal-meta-dot" />
            <span>{t.effective}</span>
          </div>
        </header>

        <div className="legal-grid">
          <aside className="legal-toc">
            <p className="legal-toc-title">{t.onThisPage}</p>
            <ol>
              {t.toc.map((item, i) => (
                <li key={i}><a href={item.href}>{item.label}</a></li>
              ))}
            </ol>
          </aside>

          <main className="legal-content">
            <p className="legal-intro">{t.intro}</p>

            <section id="what-are-cookies">
              <h2>{t.sections.whatAreCookies.title}</h2>
              <p>{t.sections.whatAreCookies.desc}</p>
              <p>{t.sections.whatAreCookies.desc2}</p>
              <ul>
                {t.sections.whatAreCookies.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section id="legal-basis">
              <h2>{t.sections.legalBasis.title}</h2>
              <p>{t.sections.legalBasis.desc}</p>
              <ul>
                {t.sections.legalBasis.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <div className="legal-callout legal-callout-warning">
                <strong>{t.sections.legalBasis.callout}</strong>
              </div>
            </section>

            <section id="cookie-categories">
              <h2>{t.sections.categories.title}</h2>
              <p>{t.sections.categories.desc}</p>

              <h3>{t.sections.categories.essential.title}</h3>
              <p>{t.sections.categories.essential.desc}</p>
              <div className="legal-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{t.sections.categories.thName}</th>
                      <th>{t.sections.categories.thPurpose}</th>
                      <th>{t.sections.categories.thRetention}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.sections.categories.essential.cookies.map((row, i) => (
                      <tr key={i}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3>{t.sections.categories.analytics.title}</h3>
              <p>{t.sections.categories.analytics.desc}</p>
              <div className="legal-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{t.sections.categories.thName}</th>
                      <th>{t.sections.categories.thPurpose}</th>
                      <th>{t.sections.categories.thRetention}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.sections.categories.analytics.cookies.map((row, i) => (
                      <tr key={i}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3>{t.sections.categories.functional.title}</h3>
              <p>{t.sections.categories.functional.desc}</p>
              <div className="legal-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{t.sections.categories.thName}</th>
                      <th>{t.sections.categories.thPurpose}</th>
                      <th>{t.sections.categories.thRetention}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.sections.categories.functional.cookies.map((row, i) => (
                      <tr key={i}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3>{t.sections.categories.marketing.title}</h3>
              <p>{t.sections.categories.marketing.desc}</p>
              <div className="legal-callout legal-callout-success">
                <strong>{t.sections.categories.marketing.callout}</strong>
              </div>
            </section>

            <section id="consent">
              <h2>{t.sections.consent.title}</h2>
              <p>{t.sections.consent.desc}</p>
              <ul>
                {t.sections.consent.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p>{t.sections.consent.withdraw}</p>
            </section>

            <section id="third-parties">
              <h2>{t.sections.thirdParties.title}</h2>
              <p>{t.sections.thirdParties.desc}</p>
              <div className="legal-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{t.sections.thirdParties.thProvider}</th>
                      <th>{t.sections.thirdParties.thPurpose}</th>
                      <th>{t.sections.thirdParties.thPolicy}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.sections.thirdParties.rows.map((row, i) => (
                      <tr key={i}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td><a href={row[3]} target="_blank" rel="noopener noreferrer">{row[2]}</a></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="manage">
              <h2>{t.sections.manage.title}</h2>
              <p>{t.sections.manage.desc}</p>

              <h3>{t.sections.manage.banner.title}</h3>
              <p>{t.sections.manage.banner.desc}</p>

              <h3>{t.sections.manage.browser.title}</h3>
              <p>{t.sections.manage.browser.desc}</p>
              <ul>
                {t.sections.manage.browser.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <div className="legal-callout legal-callout-warning">
                <strong>{t.sections.manage.warning}</strong>
              </div>
            </section>

            <section id="retention">
              <h2>{t.sections.retention.title}</h2>
              <p>{t.sections.retention.desc}</p>
              <div className="legal-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{t.sections.retention.thCategory}</th>
                      <th>{t.sections.retention.thPeriod}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.sections.retention.rows.map((row, i) => (
                      <tr key={i}><td>{row[0]}</td><td>{row[1]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>{t.sections.retention.note}</p>
            </section>

            <section id="transfers">
              <h2>{t.sections.transfers.title}</h2>
              <p>{t.sections.transfers.desc}</p>
              <ul>
                {t.sections.transfers.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section id="rights">
              <h2>{t.sections.rights.title}</h2>
              <p>{t.sections.rights.desc}</p>
              <div className="legal-rights-grid">
                {t.sections.rights.items.map((item, i) => (
                  <div key={i} className="legal-right-item">
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                ))}
              </div>
              <p>{t.sections.rights.exercise}</p>
              <p>{t.sections.rights.authority}</p>
            </section>

            <section id="children">
              <h2>{t.sections.children.title}</h2>
              <p>{t.sections.children.desc}</p>
            </section>

            <section id="changes">
              <h2>{t.sections.changes.title}</h2>
              <p>{t.sections.changes.desc}</p>
              <ul>
                {t.sections.changes.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section id="contact">
              <h2>{t.sections.contact.title}</h2>
              <p>{t.sections.contact.desc}</p>
              <div className="legal-card">
                <ul>
                  <li><strong>Pixpel LDA</strong></li>
                  <li>Rua das Merces 41, Funchal, Madeira, Portugal 9000-224</li>
                  <li>{t.sections.contact.email}: <a href="mailto:contact@noahlife.io">contact@noahlife.io</a></li>
                  <li>DPO: <a href="mailto:contact@noahlife.io">contact@noahlife.io</a></li>
                  <li>{t.sections.contact.postal}: Rua das Merces 41, Funchal, Madeira, Portugal 9000-224</li>
                </ul>
              </div>
              <p>{t.sections.contact.authority} <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a></p>
            </section>
          </main>
        </div>
      </div>

      <LegalFooter />
    </div>
  )
}

const en = {
  badge: "Cookie Policy",
  title: "Cookie Policy",
  subtitle: "How we use cookies and similar technologies on noahlife.io, and how you can control them.",
  version: "Version 1.0",
  lastUpdated: "Last updated: June 24, 2026",
  effective: "Effective: June 24, 2026",
  onThisPage: "On this page",
  toc: [
    { href: "#what-are-cookies", label: "What are cookies" },
    { href: "#legal-basis", label: "Legal basis" },
    { href: "#cookie-categories", label: "Cookie categories" },
    { href: "#consent", label: "Consent management" },
    { href: "#third-parties", label: "Third-party cookies" },
    { href: "#manage", label: "Managing cookies" },
    { href: "#retention", label: "Retention periods" },
    { href: "#transfers", label: "International transfers" },
    { href: "#rights", label: "Your rights" },
    { href: "#children", label: "Children" },
    { href: "#changes", label: "Changes" },
    { href: "#contact", label: "Contact" },
  ],
  intro: "This Cookie Policy explains how Noah Life (\"we\", \"us\", or \"our\") uses cookies and similar tracking technologies when you visit our website at noahlife.io. This policy should be read alongside our Privacy Policy and Terms of Use. We are committed to protecting your privacy and ensuring transparency about the technologies we use.",
  sections: {
    whatAreCookies: {
      title: "1. What are cookies and similar technologies",
      desc: "Cookies are small text files placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work efficiently, provide a better user experience, and supply information to site owners.",
      desc2: "In addition to cookies, we may use similar technologies including:",
      items: [
        "Local Storage,data stored in your browser that persists until explicitly cleared",
        "Session Storage,temporary data stored for the duration of your browser session",
        "Pixels/web beacons,tiny transparent images used to track page visits and interactions",
        "Scripts,code that runs on your device to enable website functionality and analytics",
      ],
    },
    legalBasis: {
      title: "2. Legal basis for cookie use",
      desc: "Under EU Regulation 2009/136/EC (ePrivacy Directive) as transposed into Spanish law (LSSI-CE, Art. 22.2) and supplemented by the General Data Protection Regulation (GDPR, Art. 6), we process cookie data on the following legal bases:",
      items: [
        "Strictly necessary cookies,Legitimate interest / contract performance (Art. 6(1)(b)(f) GDPR). No consent required per Art. 5(3) ePrivacy Directive.",
        "Analytics cookies,Your explicit, informed, freely-given consent (Art. 6(1)(a) GDPR).",
        "Functional cookies,Your explicit consent (Art. 6(1)(a) GDPR).",
        "Marketing/advertising cookies,Your explicit consent (Art. 6(1)(a) GDPR). Currently not used.",
      ],
      callout: "We never set non-essential cookies until you provide affirmative consent via our cookie banner. Pre-ticked boxes do not constitute valid consent.",
    },
    categories: {
      title: "3. Cookie categories",
      desc: "We classify cookies into four categories based on their purpose. Below is a detailed inventory of the cookies we use.",
      thName: "Cookie name",
      thPurpose: "Purpose",
      thRetention: "Retention",
      essential: {
        title: "Strictly necessary cookies",
        desc: "These cookies are essential for the website to function correctly. They enable core features such as security, session management, and accessibility preferences. You cannot opt out of these cookies as the website cannot function properly without them.",
        cookies: [
          ["__Host-session", "Maintains your authenticated session state securely", "Session (browser close)"],
          ["csrf_token", "Protects against cross-site request forgery attacks", "Session"],
          ["cookie_consent", "Stores your cookie preference choices", "12 months"],
          ["locale", "Remembers your selected language (EN/ES)", "12 months"],
        ],
      },
      analytics: {
        title: "Analytics cookies",
        desc: "These cookies help us understand how visitors interact with our website by collecting information anonymously. They allow us to measure and improve the performance of our site. These cookies are only set with your explicit consent.",
        cookies: [
          ["_va", "Vercel Analytics,anonymous page view and performance metrics", "24 hours"],
          ["_vas", "Vercel Analytics session identifier,groups page views into sessions", "30 minutes"],
        ],
      },
      functional: {
        title: "Functional cookies",
        desc: "Functional cookies enable enhanced features and personalisation. While not strictly necessary, they improve your experience on our website. These are only set with your explicit consent.",
        cookies: [
          ["theme_pref", "Remembers your display theme preference (light/dark)", "6 months"],
          ["font_scale", "Stores your preferred font size for accessibility", "6 months"],
          ["recent_activity", "Remembers your last viewed sections for navigation convenience", "Session"],
        ],
      },
      marketing: {
        title: "Marketing / advertising cookies",
        desc: "Marketing cookies are used to track visitors across websites to display relevant advertisements.",
        callout: "Noah Life does not currently use any marketing, advertising, or behavioural tracking cookies. We do not sell your data or serve targeted advertisements. If this changes in the future, we will update this policy and seek your explicit consent before deploying any such cookies.",
      },
    },
    consent: {
      title: "4. Consent management",
      desc: "When you first visit our website, a cookie consent banner is displayed. You have the following options:",
      items: [
        "Accept all,enables all cookie categories (analytics and functional)",
        "Reject all,only strictly necessary cookies are set",
        "Customise,choose which optional categories to enable or disable individually",
      ],
      withdraw: "You may withdraw or modify your consent at any time by clicking the \"Cookie Settings\" link in our website footer, or by clearing your browser cookies. Withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal.",
    },
    thirdParties: {
      title: "5. Third-party cookies",
      desc: "Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. Below are the third-party providers we use:",
      thProvider: "Provider",
      thPurpose: "Purpose",
      thPolicy: "Privacy policy",
      rows: [
        ["Vercel", "Website hosting, analytics, and performance monitoring", "View policy", "https://vercel.com/legal/privacy-policy"],
        ["Supabase", "Authentication and session management", "View policy", "https://supabase.com/privacy"],
        ["Google Fonts", "Web font delivery (no cookies, but IP may be logged)", "View policy", "https://policies.google.com/privacy"],
      ],
    },
    manage: {
      title: "6. How to manage cookies",
      desc: "You have several options to control and manage cookies:",
      banner: {
        title: "Cookie consent banner",
        desc: "Use our cookie consent banner (displayed on first visit) or access your preferences at any time via the \"Cookie Settings\" link in the website footer.",
      },
      browser: {
        title: "Browser settings",
        desc: "Most browsers allow you to manage cookies through their settings. Here are instructions for common browsers:",
        items: [
          "Google Chrome: Settings → Privacy and security → Cookies and other site data",
          "Mozilla Firefox: Settings → Privacy & Security → Cookies and Site Data",
          "Safari: Preferences → Privacy → Manage Website Data",
          "Microsoft Edge: Settings → Cookies and site permissions → Manage and delete cookies",
        ],
      },
      warning: "Disabling or deleting cookies may affect website functionality. Strictly necessary cookies cannot be disabled without potentially breaking core features such as authentication and language preferences.",
    },
    retention: {
      title: "7. Retention periods",
      desc: "Cookie data is retained only for as long as necessary to fulfil its purpose:",
      thCategory: "Category",
      thPeriod: "Maximum retention period",
      rows: [
        ["Strictly necessary", "Session to 12 months (varies by cookie)"],
        ["Analytics", "24 hours to 30 minutes (session-scoped)"],
        ["Functional", "Session to 6 months"],
        ["Marketing", "Not applicable (none currently used)"],
        ["Consent record", "12 months (then re-prompted)"],
      ],
      note: "When a cookie expires, it is automatically deleted by your browser. We review our cookie inventory quarterly and remove any cookies that are no longer necessary.",
    },
    transfers: {
      title: "8. International data transfers",
      desc: "Some of our third-party providers may process cookie data outside the European Economic Area (EEA). Where this occurs, we ensure appropriate safeguards are in place:",
      items: [
        "Standard Contractual Clauses (SCCs) approved by the European Commission",
        "EU-U.S. Data Privacy Framework adequacy decision (where applicable)",
        "Providers certified under recognised data protection frameworks",
        "Data Processing Agreements (DPAs) with all sub-processors",
      ],
    },
    rights: {
      title: "9. Your rights",
      desc: "Under the GDPR (Articles 15-22) and Spanish LOPDGDD, you have the following rights regarding your personal data processed through cookies:",
      items: [
        { title: "Right of access", desc: "Request a copy of the data collected about you via cookies" },
        { title: "Right to rectification", desc: "Request correction of inaccurate cookie-derived data" },
        { title: "Right to erasure", desc: "Request deletion of cookie data (\"right to be forgotten\")" },
        { title: "Right to restriction", desc: "Request limitation of how your cookie data is processed" },
        { title: "Right to object", desc: "Object to processing based on legitimate interests" },
        { title: "Right to withdraw consent", desc: "Withdraw cookie consent at any time without detriment" },
        { title: "Right to portability", desc: "Receive your data in a structured, machine-readable format" },
        { title: "Right to lodge a complaint", desc: "File a complaint with the Spanish AEPD or your local DPA" },
      ],
      exercise: "To exercise any of these rights, contact us at contact@noahlife.io. We will respond within 30 days (extendable by two further months for complex requests, per Art. 12(3) GDPR).",
      authority: "If you are unsatisfied with our response, you may lodge a complaint with the Agencia Española de Protección de Datos (AEPD):",
    },
    children: {
      title: "10. Children's privacy",
      desc: "Our website and services are not directed at children under 14 years of age (the digital consent age in Spain under Art. 7 LOPDGDD). We do not knowingly set non-essential cookies for users we identify as being under this age. If you believe we have inadvertently collected data from a minor, please contact us immediately at contact@noahlife.io and we will take steps to delete that data.",
    },
    changes: {
      title: "11. Changes to this policy",
      desc: "We may update this Cookie Policy periodically to reflect changes in our practices, technology, or legal obligations. When we make changes:",
      items: [
        "The \"Last updated\" date at the top will be revised",
        "Material changes will be communicated via a prominent notice on our website",
        "Where required, we will re-seek your consent for any new cookie categories",
        "Previous versions will remain available upon request",
      ],
    },
    contact: {
      title: "12. Contact us",
      desc: "If you have any questions about this Cookie Policy or wish to exercise your rights, you may contact us at:",
      email: "Email",
      postal: "Postal",
      authority: "Supervisory authority:",
    },
  },
}

const es = {
  badge: "Política de Cookies",
  title: "Política de Cookies",
  subtitle: "Cómo utilizamos cookies y tecnologías similares en noahlife.io, y cómo puedes controlarlas.",
  version: "Versión 1.0",
  lastUpdated: "Última actualización: 24 de junio de 2026",
  effective: "Vigente desde: 24 de junio de 2026",
  onThisPage: "En esta página",
  toc: [
    { href: "#what-are-cookies", label: "Qué son las cookies" },
    { href: "#legal-basis", label: "Base legal" },
    { href: "#cookie-categories", label: "Categorías de cookies" },
    { href: "#consent", label: "Gestión del consentimiento" },
    { href: "#third-parties", label: "Cookies de terceros" },
    { href: "#manage", label: "Gestionar cookies" },
    { href: "#retention", label: "Períodos de retención" },
    { href: "#transfers", label: "Transferencias internacionales" },
    { href: "#rights", label: "Tus derechos" },
    { href: "#children", label: "Menores" },
    { href: "#changes", label: "Cambios" },
    { href: "#contact", label: "Contacto" },
  ],
  intro: "Esta Política de Cookies explica cómo Noah Life (\"nosotros\" o \"nuestro\") utiliza cookies y tecnologías de seguimiento similares cuando visitas nuestro sitio web en noahlife.io. Esta política debe leerse junto con nuestra Política de Privacidad y Condiciones de Uso. Nos comprometemos a proteger tu privacidad y garantizar la transparencia sobre las tecnologías que utilizamos.",
  sections: {
    whatAreCookies: {
      title: "1. Qué son las cookies y tecnologías similares",
      desc: "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o teléfono móvil) cuando visitas un sitio web. Se utilizan ampliamente para que los sitios web funcionen de forma eficiente, proporcionar una mejor experiencia de usuario y suministrar información a los propietarios del sitio.",
      desc2: "Además de las cookies, podemos utilizar tecnologías similares que incluyen:",
      items: [
        "Almacenamiento local (Local Storage),datos almacenados en tu navegador que persisten hasta ser eliminados explícitamente",
        "Almacenamiento de sesión (Session Storage),datos temporales almacenados durante la sesión del navegador",
        "Píxeles/balizas web,pequeñas imágenes transparentes utilizadas para rastrear visitas e interacciones",
        "Scripts,código que se ejecuta en tu dispositivo para habilitar funcionalidades del sitio web y análisis",
      ],
    },
    legalBasis: {
      title: "2. Base legal para el uso de cookies",
      desc: "De acuerdo con el Reglamento UE 2009/136/CE (Directiva ePrivacy) transpuesto al derecho español (LSSI-CE, Art. 22.2) y complementado por el Reglamento General de Protección de Datos (RGPD, Art. 6), procesamos los datos de cookies con las siguientes bases legales:",
      items: [
        "Cookies estrictamente necesarias,Interés legítimo / ejecución del contrato (Art. 6(1)(b)(f) RGPD). No requieren consentimiento según el Art. 5(3) de la Directiva ePrivacy.",
        "Cookies analíticas,Tu consentimiento explícito, informado y libremente otorgado (Art. 6(1)(a) RGPD).",
        "Cookies funcionales,Tu consentimiento explícito (Art. 6(1)(a) RGPD).",
        "Cookies de marketing/publicidad,Tu consentimiento explícito (Art. 6(1)(a) RGPD). Actualmente no se utilizan.",
      ],
      callout: "Nunca establecemos cookies no esenciales hasta que proporcionas un consentimiento afirmativo a través de nuestro banner de cookies. Las casillas premarcadas no constituyen un consentimiento válido.",
    },
    categories: {
      title: "3. Categorías de cookies",
      desc: "Clasificamos las cookies en cuatro categorías según su propósito. A continuación se detalla un inventario de las cookies que utilizamos.",
      thName: "Nombre de la cookie",
      thPurpose: "Propósito",
      thRetention: "Retención",
      essential: {
        title: "Cookies estrictamente necesarias",
        desc: "Estas cookies son esenciales para que el sitio web funcione correctamente. Habilitan funciones principales como la seguridad, la gestión de sesiones y las preferencias de accesibilidad. No puedes desactivar estas cookies ya que el sitio web no puede funcionar correctamente sin ellas.",
        cookies: [
          ["__Host-session", "Mantiene el estado de tu sesión autenticada de forma segura", "Sesión (cierre del navegador)"],
          ["csrf_token", "Protección contra ataques de falsificación de solicitud entre sitios", "Sesión"],
          ["cookie_consent", "Almacena tus preferencias de cookies", "12 meses"],
          ["locale", "Recuerda tu idioma seleccionado (EN/ES)", "12 meses"],
        ],
      },
      analytics: {
        title: "Cookies analíticas",
        desc: "Estas cookies nos ayudan a comprender cómo los visitantes interactúan con nuestro sitio web recopilando información de forma anónima. Nos permiten medir y mejorar el rendimiento de nuestro sitio. Estas cookies solo se establecen con tu consentimiento explícito.",
        cookies: [
          ["_va", "Vercel Analytics,métricas anónimas de visitas y rendimiento de páginas", "24 horas"],
          ["_vas", "Identificador de sesión de Vercel Analytics,agrupa visitas en sesiones", "30 minutos"],
        ],
      },
      functional: {
        title: "Cookies funcionales",
        desc: "Las cookies funcionales permiten características mejoradas y personalización. Aunque no son estrictamente necesarias, mejoran tu experiencia en nuestro sitio web. Solo se establecen con tu consentimiento explícito.",
        cookies: [
          ["theme_pref", "Recuerda tu preferencia de tema visual (claro/oscuro)", "6 meses"],
          ["font_scale", "Almacena tu tamaño de fuente preferido para accesibilidad", "6 meses"],
          ["recent_activity", "Recuerda tus últimas secciones visitadas para facilitar la navegación", "Sesión"],
        ],
      },
      marketing: {
        title: "Cookies de marketing / publicidad",
        desc: "Las cookies de marketing se utilizan para rastrear a los visitantes en diferentes sitios web para mostrar anuncios relevantes.",
        callout: "Noah Life no utiliza actualmente ninguna cookie de marketing, publicidad o seguimiento comportamental. No vendemos tus datos ni mostramos publicidad dirigida. Si esto cambia en el futuro, actualizaremos esta política y solicitaremos tu consentimiento explícito antes de implementar dichas cookies.",
      },
    },
    consent: {
      title: "4. Gestión del consentimiento",
      desc: "Cuando visitas nuestro sitio web por primera vez, se muestra un banner de consentimiento de cookies. Tienes las siguientes opciones:",
      items: [
        "Aceptar todas,habilita todas las categorías de cookies (analíticas y funcionales)",
        "Rechazar todas,solo se establecen las cookies estrictamente necesarias",
        "Personalizar,elige qué categorías opcionales habilitar o deshabilitar individualmente",
      ],
      withdraw: "Puedes retirar o modificar tu consentimiento en cualquier momento haciendo clic en el enlace \"Configuración de Cookies\" en el pie de página de nuestro sitio web, o borrando las cookies de tu navegador. La retirada del consentimiento no afecta a la licitud del tratamiento basado en el consentimiento antes de su retirada.",
    },
    thirdParties: {
      title: "5. Cookies de terceros",
      desc: "Algunas cookies son establecidas por servicios de terceros que aparecen en nuestras páginas. No controlamos estas cookies. A continuación se indican los proveedores de terceros que utilizamos:",
      thProvider: "Proveedor",
      thPurpose: "Propósito",
      thPolicy: "Política de privacidad",
      rows: [
        ["Vercel", "Alojamiento web, análisis y monitorización del rendimiento", "Ver política", "https://vercel.com/legal/privacy-policy"],
        ["Supabase", "Autenticación y gestión de sesiones", "Ver política", "https://supabase.com/privacy"],
        ["Google Fonts", "Entrega de fuentes web (sin cookies, pero la IP puede registrarse)", "Ver política", "https://policies.google.com/privacy"],
      ],
    },
    manage: {
      title: "6. Cómo gestionar las cookies",
      desc: "Tienes varias opciones para controlar y gestionar las cookies:",
      banner: {
        title: "Banner de consentimiento de cookies",
        desc: "Utiliza nuestro banner de consentimiento de cookies (mostrado en la primera visita) o accede a tus preferencias en cualquier momento a través del enlace \"Configuración de Cookies\" en el pie de página del sitio web.",
      },
      browser: {
        title: "Configuración del navegador",
        desc: "La mayoría de los navegadores te permiten gestionar las cookies a través de su configuración. Aquí tienes instrucciones para los navegadores más comunes:",
        items: [
          "Google Chrome: Configuración → Privacidad y seguridad → Cookies y datos de sitios",
          "Mozilla Firefox: Configuración → Privacidad y seguridad → Cookies y datos del sitio",
          "Safari: Preferencias → Privacidad → Gestionar datos del sitio web",
          "Microsoft Edge: Configuración → Cookies y permisos del sitio → Administrar y eliminar cookies",
        ],
      },
      warning: "Deshabilitar o eliminar cookies puede afectar la funcionalidad del sitio web. Las cookies estrictamente necesarias no se pueden desactivar sin potencialmente interrumpir funciones esenciales como la autenticación y las preferencias de idioma.",
    },
    retention: {
      title: "7. Períodos de retención",
      desc: "Los datos de cookies se conservan solo durante el tiempo necesario para cumplir su propósito:",
      thCategory: "Categoría",
      thPeriod: "Período máximo de retención",
      rows: [
        ["Estrictamente necesarias", "Sesión hasta 12 meses (varía según la cookie)"],
        ["Analíticas", "24 horas a 30 minutos (ámbito de sesión)"],
        ["Funcionales", "Sesión hasta 6 meses"],
        ["Marketing", "No aplicable (ninguna en uso actualmente)"],
        ["Registro de consentimiento", "12 meses (luego se vuelve a solicitar)"],
      ],
      note: "Cuando una cookie expira, tu navegador la elimina automáticamente. Revisamos nuestro inventario de cookies trimestralmente y eliminamos cualquier cookie que ya no sea necesaria.",
    },
    transfers: {
      title: "8. Transferencias internacionales de datos",
      desc: "Algunos de nuestros proveedores de terceros pueden procesar datos de cookies fuera del Espacio Económico Europeo (EEE). Cuando esto ocurre, nos aseguramos de que existan garantías adecuadas:",
      items: [
        "Cláusulas Contractuales Tipo (CCT) aprobadas por la Comisión Europea",
        "Decisión de adecuación del Marco de Privacidad de Datos UE-EE.UU. (cuando aplique)",
        "Proveedores certificados bajo marcos de protección de datos reconocidos",
        "Acuerdos de Procesamiento de Datos (DPA) con todos los subencargados",
      ],
    },
    rights: {
      title: "9. Tus derechos",
      desc: "Según el RGPD (Artículos 15-22) y la LOPDGDD española, tienes los siguientes derechos respecto a tus datos personales procesados mediante cookies:",
      items: [
        { title: "Derecho de acceso", desc: "Solicitar una copia de los datos recopilados sobre ti mediante cookies" },
        { title: "Derecho de rectificación", desc: "Solicitar la corrección de datos inexactos derivados de cookies" },
        { title: "Derecho de supresión", desc: "Solicitar la eliminación de datos de cookies (\"derecho al olvido\")" },
        { title: "Derecho a la limitación", desc: "Solicitar la limitación del procesamiento de tus datos de cookies" },
        { title: "Derecho de oposición", desc: "Oponerte al tratamiento basado en intereses legítimos" },
        { title: "Derecho a retirar el consentimiento", desc: "Retirar el consentimiento de cookies en cualquier momento sin perjuicio" },
        { title: "Derecho a la portabilidad", desc: "Recibir tus datos en un formato estructurado y legible por máquina" },
        { title: "Derecho a reclamar", desc: "Presentar una reclamación ante la AEPD o tu autoridad de protección de datos" },
      ],
      exercise: "Para ejercer cualquiera de estos derechos, contáctanos en contact@noahlife.io. Responderemos en un plazo de 30 días (ampliable dos meses más para solicitudes complejas, según el Art. 12(3) RGPD).",
      authority: "Si no estás satisfecho con nuestra respuesta, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD):",
    },
    children: {
      title: "10. Privacidad de menores",
      desc: "Nuestro sitio web y servicios no están dirigidos a menores de 14 años (la edad de consentimiento digital en España según el Art. 7 LOPDGDD). No establecemos a sabiendas cookies no esenciales para usuarios que identificamos como menores de esta edad. Si crees que hemos recopilado inadvertidamente datos de un menor, contacta con nosotros inmediatamente en contact@noahlife.io y tomaremos medidas para eliminar esos datos.",
    },
    changes: {
      title: "11. Cambios en esta política",
      desc: "Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en nuestras prácticas, tecnología u obligaciones legales. Cuando realicemos cambios:",
      items: [
        "Se revisará la fecha de \"Última actualización\" en la parte superior",
        "Los cambios materiales se comunicarán mediante un aviso destacado en nuestro sitio web",
        "Cuando sea necesario, solicitaremos de nuevo tu consentimiento para nuevas categorías de cookies",
        "Las versiones anteriores estarán disponibles bajo petición",
      ],
    },
    contact: {
      title: "12. Contacto",
      desc: "Si tienes alguna pregunta sobre esta Política de Cookies o deseas ejercer tus derechos, puedes contactarnos en:",
      email: "Correo electrónico",
      postal: "Correo postal",
      authority: "Autoridad de supervisión:",
    },
  },
}
