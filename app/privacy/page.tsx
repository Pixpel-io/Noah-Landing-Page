"use client"

import './legal.css'
import { LegalHeader } from './legal-header'
import { LegalFooter } from './legal-footer'
import { LanguageProvider, useLanguage } from '@/lib/language-context'

export default function PrivacyPage() {
  return (
    <LanguageProvider>
      <PrivacyContent />
    </LanguageProvider>
  )
}

function PrivacyContent() {
  const { locale } = useLanguage()
  const t = locale === "es" ? es : en

  return (
    <div className="min-h-screen bg-white">
      <LegalHeader />

      <div className="legal-page pt-18">
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

            <section id="controller">
              <h2>{t.sections.controller.title}</h2>
              <p>{t.sections.controller.desc}</p>
              <div className="legal-card">
                <ul>
                  <li><strong>[YOUR REGISTERED COMPANY NAME]</strong></li>
                  <li>[Registered address, Spain]</li>
                  <li>NIF / CIF: [NIF/CIF NUMBER]</li>
                  <li>{t.sections.controller.contact}: <a href="mailto:privacy@noahlife.io">privacy@noahlife.io</a></li>
                  <li>DPO: [DPO name and email]</li>
                </ul>
              </div>
              <p>{t.sections.controller.authority} <a href="https://www.aepd.es" target="_blank" rel="noopener">aepd.es</a></p>
            </section>

            <section id="data">
              <h2>{t.sections.data.title}</h2>

              <h3>{t.sections.data.account}</h3>
              <ul>
                {t.sections.data.accountItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h3>{t.sections.data.conversation}</h3>
              <ul>
                {t.sections.data.conversationItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h3>{t.sections.data.health}</h3>
              <ul>
                {t.sections.data.healthItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <div className="legal-callout legal-callout-warning">
                <strong>{t.sections.data.healthWarning}</strong>
              </div>

              <h3>{t.sections.data.contacts}</h3>
              <ul>
                <li>{t.sections.data.contactsItem}</li>
              </ul>

              <h3>{t.sections.data.usage}</h3>
              <ul>
                {t.sections.data.usageItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h3>{t.sections.data.location}</h3>
              <ul>
                {t.sections.data.locationItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h3>{t.sections.data.payment}</h3>
              <p>{t.sections.data.paymentDesc}</p>
            </section>

            <section id="why">
              <h2>{t.sections.why.title}</h2>
              <div className="legal-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{t.sections.why.thPurpose}</th>
                      <th>{t.sections.why.thLegal}</th>
                      <th>{t.sections.why.thSpecial}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.sections.why.rows.map((row, i) => (
                      <tr key={i}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="legal-callout legal-callout-success">
                <strong>{t.sections.why.notUsed}</strong>
                <ul>
                  {t.sections.why.notUsedItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </section>

            <section id="sharing">
              <h2>{t.sections.sharing.title}</h2>
              <p>{t.sections.sharing.desc}</p>
              <div className="legal-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{t.sections.sharing.thService}</th>
                      <th>{t.sections.sharing.thPurpose}</th>
                      <th>{t.sections.sharing.thLocation}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.sections.sharing.rows.map((row, i) => (
                      <tr key={i}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>{t.sections.sharing.noShare}</p>
            </section>

            <section id="transfers">
              <h2>{t.sections.transfers.title}</h2>
              <p>{t.sections.transfers.desc}</p>
              <ul>
                {t.sections.transfers.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p>{t.sections.transfers.contact} <a href="mailto:privacy@noahlife.io">privacy@noahlife.io</a></p>
            </section>

            <section id="retention">
              <h2>{t.sections.retention.title}</h2>
              <div className="legal-table-wrap">
                <table>
                  <thead>
                    <tr><th>{t.sections.retention.thData}</th><th>{t.sections.retention.thRetention}</th></tr>
                  </thead>
                  <tbody>
                    {t.sections.retention.rows.map((row, i) => (
                      <tr key={i}><td>{row[0]}</td><td>{row[1]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="rights">
              <h2>{t.sections.rights.title}</h2>
              <p>{t.sections.rights.desc}</p>
              <div className="legal-rights-grid">
                {t.sections.rights.items.map((item, i) => (
                  <div key={i} className="legal-right-item">
                    <strong>{item.name}</strong>
                    <span>{item.desc}</span>
                  </div>
                ))}
              </div>
              <p>{t.sections.rights.contact} <a href="mailto:privacy@noahlife.io">privacy@noahlife.io</a></p>
              <h3>{t.sections.rights.inApp}</h3>
              <ul>
                {t.sections.rights.inAppItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section id="security">
              <h2>{t.sections.security.title}</h2>
              <ul>
                {t.sections.security.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <div className="legal-callout legal-callout-warning">
                {t.sections.security.breach}
              </div>
            </section>

            <section id="children">
              <h2>{t.sections.children.title}</h2>
              <p>{t.sections.children.desc}</p>
            </section>

            <section id="automated">
              <h2>{t.sections.automated.title}</h2>
              <p>{t.sections.automated.desc}</p>
            </section>

            <section id="cookies">
              <h2>{t.sections.cookies.title}</h2>
              <p>{t.sections.cookies.desc}</p>
            </section>

            <section id="changes">
              <h2>{t.sections.changes.title}</h2>
              <p>{t.sections.changes.desc}</p>
            </section>

            <section id="contact">
              <h2>{t.sections.contact.title}</h2>
              <div className="legal-card">
                <ul>
                  <li>{t.sections.contact.privacy}: <a href="mailto:privacy@noahlife.io">privacy@noahlife.io</a></li>
                  <li>DPO: [DPO_EMAIL_OR_NAME]</li>
                  <li>{t.sections.contact.postal}: [YOUR REGISTERED OFFICE ADDRESS]</li>
                  <li>AEPD: <a href="https://www.aepd.es" target="_blank" rel="noopener">aepd.es</a></li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>

      <LegalFooter />
    </div>
  )
}

const en = {
  badge: "Privacy Policy",
  title: "Privacy Policy",
  subtitle: "How Noah Life collects, uses, and protects your personal data. GDPR & LOPDGDD compliant.",
  version: "Version 1.0",
  lastUpdated: "Last updated: [PUBLICATION DATE]",
  effective: "Effective: [PUBLICATION DATE]",
  onThisPage: "On this page",
  toc: [
    { href: "#controller", label: "Data controller" },
    { href: "#data", label: "Data we process" },
    { href: "#why", label: "Why we process" },
    { href: "#sharing", label: "Sub-processors" },
    { href: "#transfers", label: "International transfers" },
    { href: "#retention", label: "Retention periods" },
    { href: "#rights", label: "Your rights" },
    { href: "#security", label: "Security" },
    { href: "#children", label: "Children" },
    { href: "#automated", label: "Automated decisions" },
    { href: "#cookies", label: "Cookies & tracking" },
    { href: "#changes", label: "Changes" },
    { href: "#contact", label: "Contact" },
  ],
  intro: "This Privacy Policy explains how Noah Life (“Noah”, “we”, “us”) collects, uses, stores, and shares your personal data when you use the Noah Life mobile application. We comply with the EU General Data Protection Regulation (GDPR – Regulation 2016/679), Spain’s LOPDGDD (Ley Orgánica 3/2018), and Spanish data-protection authority (AEPD) guidance.",
  sections: {
    controller: {
      title: "1. Who is the data controller",
      desc: "The data controller (responsable del tratamiento) under GDPR Article 4(7) and Spanish LOPDGDD is:",
      contact: "Data Protection contact",
      authority: "The competent supervisory authority is the Spanish Data Protection Agency (AEPD):",
    },
    data: {
      title: "2. What data we process",
      account: "A. Account and identity data",
      accountItems: ["Device-generated user ID (UUID v4)", "Display name (you choose)", "Age (optional)", "Preferred language", "City / country (with permission, only at onboarding)", "Accessibility settings"],
      conversation: "B. Conversation data",
      conversationItems: ["Text messages you send to the AI", "AI-generated responses", "Voice recordings in real-time mode (NOT retained as audio)", "Doctor-consultation recordings (audio on device; transcript in backend)", "“Memories” – facts you choose to save"],
      health: "C. Health data (GDPR Article 9)",
      healthItems: ["Medications (name, dose, schedule, indication)", "Medical appointments", "Doctor consultation transcripts and summaries", "Symptoms described in conversation"],
      healthWarning: "Health data is “special category data” under GDPR Article 9 and receives additional protection. We process it only with your explicit consent (Article 9(2)(a)).",
      contacts: "D. Contact data (third parties)",
      contactsItem: "Trusted emergency contacts: name, relationship, phone, optional email",
      usage: "E. Usage data",
      usageItems: ["App version, OS, device type", "Crash logs (opt-in)", "Aggregated usage counters (no message content)"],
      location: "F. Location data",
      locationItems: ["Approximate city/country at onboarding (one-time, with consent)", "GPS at emergency call trigger (with consent)"],
      payment: "G. Payment data",
      paymentDesc: "None retained by us. Subscriptions processed by Google/Apple; we receive only subscription status.",
    },
    why: {
      title: "3. Why we process your data",
      thPurpose: "Purpose",
      thLegal: "Legal basis (Art. 6)",
      thSpecial: "Special category (Art. 9)",
      rows: [
        ["Provide AI assistant service", "Contract – Art. 6(1)(b)", "Explicit consent – Art. 9(2)(a)"],
        ["Schedule reminders / medications", "Contract – Art. 6(1)(b)", "Explicit consent – Art. 9(2)(a)"],
        ["Record + summarise consultations", "Contract – Art. 6(1)(b)", "Explicit consent – Art. 9(2)(a)"],
        ["Emergency calls + location", "Vital interests – Art. 6(1)(d)", "Vital interests – Art. 9(2)(c)"],
        ["Service quality (aggregated)", "Legitimate interest – Art. 6(1)(f)", "N/A"],
        ["Legal compliance", "Legal obligation – Art. 6(1)(c)", "Legal obligation – Art. 9(2)(b)"],
      ],
      notUsed: "We do NOT use your data to:",
      notUsedItems: ["Train public AI models", "Sell to third parties", "Run targeted advertising", "Profile you for unrelated purposes"],
    },
    sharing: {
      title: "4. Who we share data with",
      desc: "Each processor is bound by a DPA meeting GDPR Article 28. Data leaving the EU is covered by SCCs.",
      thService: "Service",
      thPurpose: "Purpose",
      thLocation: "Location",
      rows: [
        ["AWS", "Hosting, AI inference, database, storage", "EU (Frankfurt) + US (SCCs)"],
        ["Anthropic (via Bedrock)", "AI chat model", "AWS region (migrating to EU)"],
        ["Supabase", "Database backup, auth", "EU (Frankfurt)"],
        ["Groq", "Speech-to-text (Whisper)", "US (SCCs)"],
        ["OpenAI", "Medication photo scan only", "US (SCCs)"],
        ["Google / Apple", "App distribution, billing", "Per their terms"],
        ["Expo / EAS", "Push notifications, builds", "US (SCCs)"],
      ],
      noShare: "We do NOT share data with advertisers or data brokers.",
    },
    transfers: {
      title: "5. International transfers",
      desc: "For transfers outside the EEA, we rely on:",
      items: ["Standard Contractual Clauses (Commission Decision 2021/914)", "EU-US Data Privacy Framework for certified processors", "Encryption in transit (TLS 1.2+) and at rest"],
      contact: "Request a copy of safeguards:",
    },
    retention: {
      title: "6. How long we keep your data",
      thData: "Data",
      thRetention: "Retention",
      rows: [
        ["Account data", "Until deletion or 24 months inactivity"],
        ["Chat history", "Until cleared or 12 months"],
        ["Voice transcripts", "Same as chat history"],
        ["Voice audio", "NOT retained"],
        ["Consultation recordings", "Until deleted or 36 months"],
        ["Medications, appointments", "Until deleted"],
        ["Memories", "Until deleted"],
        ["Emergency contacts", "Until deleted"],
        ["Emergency call logs", "12 months"],
        ["Usage counters", "Anonymised after 12 months"],
        ["Crash logs", "90 days"],
        ["Backups", "Up to 30 days after deletion"],
      ],
    },
    rights: {
      title: "7. Your rights",
      desc: "Under GDPR Articles 15–22 and Spanish LOPDGDD:",
      items: [
        { name: "Access", desc: "Get a copy of your data (Art. 15)" },
        { name: "Rectification", desc: "Correct inaccurate data (Art. 16)" },
        { name: "Erasure", desc: "Request deletion (Art. 17)" },
        { name: "Restriction", desc: "Pause processing (Art. 18)" },
        { name: "Portability", desc: "Machine-readable export (Art. 20)" },
        { name: "Object", desc: "Object to legitimate interest (Art. 21)" },
        { name: "Withdraw consent", desc: "At any time (Art. 7(3))" },
        { name: "Complain", desc: "Lodge complaint with AEPD" },
      ],
      contact: "Contact us – we respond within one calendar month:",
      inApp: "In-app controls",
      inAppItems: ["Delete a memory: long-press → Delete", "Delete a chat: … menu → Clear conversation", "Delete a medication: detail screen → Delete", "Sign out + clear local data: Settings → Sign out"],
    },
    security: {
      title: "8. Security",
      items: ["Transport: TLS 1.2+ for all traffic", "Storage: AES-256 at rest", "Access: role-based with audit logs", "Device: secure enclave (Keystore / Keychain)", "Admin: multi-factor authentication", "Testing: regular security reviews + pentesting"],
      breach: "In a data breach affecting your rights, we notify you and the AEPD within 72 hours (GDPR Article 33).",
    },
    children: {
      title: "9. Children",
      desc: "Noah is designed for adults aged 50+. We do not knowingly collect data from children under 14 (Spain’s digital consent age). Contact privacy@noahlife.io if you believe a child has used the app.",
    },
    automated: {
      title: "10. Automated decision-making",
      desc: "Noah uses AI to generate responses but does not make solely automated decisions with legal or significant effects (Article 22). The AI does not diagnose, score, or decide service access. You remain in control.",
    },
    cookies: {
      title: "11. Cookies and tracking",
      desc: "The mobile app does not use web cookies. Local storage is used for session state, offline cache, and anonymised counters. We do NOT use cross-app tracking, advertising IDs, or third-party analytics SDKs.",
    },
    changes: {
      title: "12. Changes to this Policy",
      desc: "Material changes are notified in-app and by email. Continued use after the change indicates acceptance.",
    },
    contact: {
      title: "13. Contact",
      privacy: "Privacy / GDPR rights",
      postal: "Postal",
    },
  },
}

const es = {
  badge: "Política de Privacidad",
  title: "Política de Privacidad",
  subtitle: "Cómo Noah Life recopila, utiliza y protege tus datos personales. Cumplimiento RGPD y LOPDGDD.",
  version: "Versión 1.0",
  lastUpdated: "Última actualización: [FECHA DE PUBLICACIÓN]",
  effective: "Vigente desde: [FECHA DE PUBLICACIÓN]",
  onThisPage: "En esta página",
  toc: [
    { href: "#controller", label: "Responsable del tratamiento" },
    { href: "#data", label: "Datos que tratamos" },
    { href: "#why", label: "Por qué los tratamos" },
    { href: "#sharing", label: "Subencargados" },
    { href: "#transfers", label: "Transferencias internacionales" },
    { href: "#retention", label: "Períodos de conservación" },
    { href: "#rights", label: "Tus derechos" },
    { href: "#security", label: "Seguridad" },
    { href: "#children", label: "Menores" },
    { href: "#automated", label: "Decisiones automatizadas" },
    { href: "#cookies", label: "Cookies y seguimiento" },
    { href: "#changes", label: "Cambios" },
    { href: "#contact", label: "Contacto" },
  ],
  intro: "Esta Política de Privacidad explica cómo Noah Life (“Noah”, “nosotros”) recopila, utiliza, almacena y comparte tus datos personales cuando utilizas la aplicación móvil Noah Life. Cumplimos con el Reglamento General de Protección de Datos de la UE (RGPD – Reglamento 2016/679), la LOPDGDD española (Ley Orgánica 3/2018) y las directrices de la AEPD.",
  sections: {
    controller: {
      title: "1. Responsable del tratamiento",
      desc: "El responsable del tratamiento según el artículo 4(7) del RGPD y la LOPDGDD es:",
      contact: "Contacto de protección de datos",
      authority: "La autoridad de control competente es la Agencia Española de Protección de Datos (AEPD):",
    },
    data: {
      title: "2. Qué datos tratamos",
      account: "A. Datos de cuenta e identidad",
      accountItems: ["ID de usuario generado por el dispositivo (UUID v4)", "Nombre de usuario (tú eliges)", "Edad (opcional)", "Idioma preferido", "Ciudad / país (con permiso, solo al registrarte)", "Configuración de accesibilidad"],
      conversation: "B. Datos de conversación",
      conversationItems: ["Mensajes de texto que envías al asistente", "Respuestas generadas por la IA", "Grabaciones de voz en modo real (NO se retienen como audio)", "Grabaciones de consultas médicas (audio en dispositivo; transcripción en backend)", "“Recuerdos” – datos que eliges guardar"],
      health: "C. Datos de salud (Artículo 9 RGPD)",
      healthItems: ["Medicamentos (nombre, dosis, horario, indicación)", "Citas médicas", "Transcripciones y resúmenes de consultas", "Síntomas descritos en conversación"],
      healthWarning: "Los datos de salud son “datos de categoría especial” según el Artículo 9 del RGPD y reciben protección adicional. Solo los tratamos con tu consentimiento explícito (Artículo 9(2)(a)).",
      contacts: "D. Datos de contacto (terceros)",
      contactsItem: "Contactos de emergencia de confianza: nombre, relación, teléfono, email opcional",
      usage: "E. Datos de uso",
      usageItems: ["Versión de la app, SO, tipo de dispositivo", "Registros de errores (opt-in)", "Contadores de uso agregados (sin contenido de mensajes)"],
      location: "F. Datos de ubicación",
      locationItems: ["Ciudad/país aproximado al registrarte (una vez, con consentimiento)", "GPS al activar llamada de emergencia (con consentimiento)"],
      payment: "G. Datos de pago",
      paymentDesc: "No retenemos ninguno. Las suscripciones las procesan Google/Apple; solo recibimos el estado de la suscripción.",
    },
    why: {
      title: "3. Por qué tratamos tus datos",
      thPurpose: "Finalidad",
      thLegal: "Base legal (Art. 6)",
      thSpecial: "Categoría especial (Art. 9)",
      rows: [
        ["Proporcionar el servicio de IA", "Contrato – Art. 6(1)(b)", "Consentimiento explícito – Art. 9(2)(a)"],
        ["Programar recordatorios / medicamentos", "Contrato – Art. 6(1)(b)", "Consentimiento explícito – Art. 9(2)(a)"],
        ["Grabar + resumir consultas", "Contrato – Art. 6(1)(b)", "Consentimiento explícito – Art. 9(2)(a)"],
        ["Llamadas de emergencia + ubicación", "Intereses vitales – Art. 6(1)(d)", "Intereses vitales – Art. 9(2)(c)"],
        ["Calidad del servicio (agregado)", "Interés legítimo – Art. 6(1)(f)", "N/A"],
        ["Cumplimiento legal", "Obligación legal – Art. 6(1)(c)", "Obligación legal – Art. 9(2)(b)"],
      ],
      notUsed: "NO usamos tus datos para:",
      notUsedItems: ["Entrenar modelos de IA públicos", "Vender a terceros", "Publicidad dirigida", "Perfilarte para fines no relacionados"],
    },
    sharing: {
      title: "4. Con quién compartimos datos",
      desc: "Cada encargado está vinculado por un contrato de tratamiento (DPA) que cumple el Artículo 28 del RGPD.",
      thService: "Servicio",
      thPurpose: "Finalidad",
      thLocation: "Ubicación",
      rows: [
        ["AWS", "Hosting, inferencia IA, base de datos, almacenamiento", "UE (Frankfurt) + EE.UU. (CCT)"],
        ["Anthropic (vía Bedrock)", "Modelo de chat IA", "Región AWS (migrando a UE)"],
        ["Supabase", "Backup de base de datos, autenticación", "UE (Frankfurt)"],
        ["Groq", "Transcripción de voz (Whisper)", "EE.UU. (CCT)"],
        ["OpenAI", "Escaneo de fotos de medicamentos", "EE.UU. (CCT)"],
        ["Google / Apple", "Distribución de la app, facturación", "Según sus términos"],
        ["Expo / EAS", "Notificaciones push, builds", "EE.UU. (CCT)"],
      ],
      noShare: "NO compartimos datos con anunciantes ni intermediarios de datos.",
    },
    transfers: {
      title: "5. Transferencias internacionales",
      desc: "Para transferencias fuera del EEE, nos basamos en:",
      items: ["Cláusulas Contractuales Tipo (Decisión 2021/914)", "Marco de Privacidad de Datos UE-EE.UU. para procesadores certificados", "Cifrado en tránsito (TLS 1.2+) y en reposo"],
      contact: "Solicita una copia de las garantías:",
    },
    retention: {
      title: "6. Cuánto tiempo conservamos tus datos",
      thData: "Datos",
      thRetention: "Conservación",
      rows: [
        ["Datos de cuenta", "Hasta eliminación o 24 meses de inactividad"],
        ["Historial de chat", "Hasta borrado o 12 meses"],
        ["Transcripciones de voz", "Igual que el historial de chat"],
        ["Audio de voz", "NO se retiene"],
        ["Grabaciones de consultas", "Hasta eliminación o 36 meses"],
        ["Medicamentos, citas", "Hasta eliminación"],
        ["Recuerdos", "Hasta eliminación"],
        ["Contactos de emergencia", "Hasta eliminación"],
        ["Registros de llamadas de emergencia", "12 meses"],
        ["Contadores de uso", "Anonimizados tras 12 meses"],
        ["Registros de errores", "90 días"],
        ["Copias de seguridad", "Hasta 30 días tras eliminación"],
      ],
    },
    rights: {
      title: "7. Tus derechos",
      desc: "Según los Artículos 15–22 del RGPD y la LOPDGDD:",
      items: [
        { name: "Acceso", desc: "Obtener copia de tus datos (Art. 15)" },
        { name: "Rectificación", desc: "Corregir datos inexactos (Art. 16)" },
        { name: "Supresión", desc: "Solicitar eliminación (Art. 17)" },
        { name: "Limitación", desc: "Pausar el tratamiento (Art. 18)" },
        { name: "Portabilidad", desc: "Exportación legible por máquina (Art. 20)" },
        { name: "Oposición", desc: "Oponerse al interés legítimo (Art. 21)" },
        { name: "Retirar consentimiento", desc: "En cualquier momento (Art. 7(3))" },
        { name: "Reclamar", desc: "Presentar reclamación ante la AEPD" },
      ],
      contact: "Contáctanos – respondemos en un mes natural:",
      inApp: "Controles en la app",
      inAppItems: ["Eliminar un recuerdo: mantener pulsado → Eliminar", "Eliminar un chat: menú … → Borrar conversación", "Eliminar un medicamento: pantalla de detalle → Eliminar", "Cerrar sesión + borrar datos locales: Ajustes → Cerrar sesión"],
    },
    security: {
      title: "8. Seguridad",
      items: ["Transporte: TLS 1.2+ para todo el tráfico", "Almacenamiento: AES-256 en reposo", "Acceso: basado en roles con registros de auditoría", "Dispositivo: enclave seguro (Keystore / Keychain)", "Administración: autenticación multifactor", "Pruebas: revisiones de seguridad + pentesting"],
      breach: "En caso de brecha de datos que afecte a tus derechos, te notificaremos a ti y a la AEPD en 72 horas (Artículo 33 RGPD).",
    },
    children: {
      title: "9. Menores",
      desc: "Noah está diseñado para adultos de 50+. No recopilamos datos de menores de 14 años (edad de consentimiento digital en España). Contacta privacy@noahlife.io si crees que un menor ha usado la app.",
    },
    automated: {
      title: "10. Decisiones automatizadas",
      desc: "Noah usa IA para generar respuestas pero no toma decisiones exclusivamente automatizadas con efectos legales o significativos (Artículo 22). La IA no diagnostica, puntúa ni decide el acceso al servicio. Tú mantienes el control.",
    },
    cookies: {
      title: "11. Cookies y seguimiento",
      desc: "La app móvil no usa cookies web. El almacenamiento local se usa para estado de sesión, caché offline y contadores anonimizados. NO usamos seguimiento entre apps, IDs publicitarios ni SDKs de análisis de terceros.",
    },
    changes: {
      title: "12. Cambios en esta Política",
      desc: "Los cambios materiales se notifican en la app y por email. El uso continuado tras el cambio implica aceptación.",
    },
    contact: {
      title: "13. Contacto",
      privacy: "Privacidad / derechos RGPD",
      postal: "Dirección postal",
    },
  },
}
