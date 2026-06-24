"use client"

import '../privacy/legal.css'
import { LegalHeader } from '../privacy/legal-header'
import { LegalFooter } from '../privacy/legal-footer'
import { LegalLoader } from '../privacy/legal-loader'
import { LanguageProvider, useLanguage } from '@/lib/language-context'

export default function TermsPage() {
  return (
    <LanguageProvider>
      <TermsContent />
    </LanguageProvider>
  )
}

function TermsContent() {
  const { locale } = useLanguage()
  const t = locale === "es" ? es : en

  return (
    <div className="min-h-screen bg-white">
      <LegalLoader color="#D86262" />
      <LegalHeader />

      <div className="legal-page pt-18" style={{"--accent": "#D86262"} as React.CSSProperties}>
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

            <section id="who">
              <h2>{t.sections.who.title}</h2>
              <div className="legal-card">
                <ul>
                  <li><strong>Pixpel LDA</strong></li>
                  <li>Rua das Merces 41, Funchal, Madeira, Portugal 9000-224</li>
                  <li>{t.sections.who.legal}: <a href="mailto:contact@noahlife.io">contact@noahlife.io</a></li>
                  <li>{t.sections.who.privacy}: <a href="mailto:contact@noahlife.io">contact@noahlife.io</a></li>
                </ul>
              </div>
            </section>

            <section id="what">
              <h2>{t.sections.what.title}</h2>
              <p>{t.sections.what.desc}</p>
              <ul>
                {t.sections.what.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <div className="legal-callout legal-callout-warning">
                <strong>{t.sections.what.warning}</strong>
              </div>
            </section>

            <section id="not">
              <h2>{t.sections.not.title}</h2>
              <p>{t.sections.not.desc}</p>
              <ul>
                {t.sections.not.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p>{t.sections.not.verify}</p>
            </section>

            <section id="eligibility">
              <h2>{t.sections.eligibility.title}</h2>
              <p>{t.sections.eligibility.desc}</p>
              <ul>
                {t.sections.eligibility.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p>{t.sections.eligibility.children}</p>
            </section>

            <section id="account">
              <h2>{t.sections.account.title}</h2>
              <p>{t.sections.account.desc}</p>
              <ul>
                {t.sections.account.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section id="voice">
              <h2>{t.sections.voice.title}</h2>
              <h3>{t.sections.voice.realtime}</h3>
              <p>{t.sections.voice.realtimeDesc}</p>
              <h3>{t.sections.voice.doctor}</h3>
              <p>{t.sections.voice.doctorDesc}</p>
              <ul>
                {t.sections.voice.doctorItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section id="emergency">
              <h2>{t.sections.emergency.title}</h2>
              <p>{t.sections.emergency.desc}</p>
              <div className="legal-callout legal-callout-warning">
                <strong>{t.sections.emergency.warning}</strong>
              </div>
            </section>

            <section id="fees">
              <h2>{t.sections.fees.title}</h2>
              <p>{t.sections.fees.desc}</p>
              <ul>
                {t.sections.fees.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p>{t.sections.fees.noPayment}</p>
            </section>

            <section id="use">
              <h2>{t.sections.use.title}</h2>
              <p>{t.sections.use.desc}</p>
              <ul>
                {t.sections.use.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p>{t.sections.use.suspension}</p>
            </section>

            <section id="ip">
              <h2>{t.sections.ip.title}</h2>
              <p>{t.sections.ip.desc}</p>
              <div className="legal-callout legal-callout-success">
                <strong>{t.sections.ip.yours}</strong>
                <ul>
                  {t.sections.ip.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </section>

            <section id="liability">
              <h2>{t.sections.liability.title}</h2>
              <p>{t.sections.liability.desc}</p>
              <ul>
                {t.sections.liability.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p><strong>{t.sections.liability.exceptions}</strong></p>
            </section>

            <section id="changes">
              <h2>{t.sections.changes.title}</h2>
              <p>{t.sections.changes.desc}</p>
            </section>

            <section id="termination">
              <h2>{t.sections.termination.title}</h2>
              <p>{t.sections.termination.desc}</p>
            </section>

            <section id="law">
              <h2>{t.sections.law.title}</h2>
              <p>{t.sections.law.desc}</p>
              <ul>
                {t.sections.law.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section id="contact">
              <h2>{t.sections.contact.title}</h2>
              <div className="legal-card">
                <ul>
                  <li>{t.sections.contact.general}: <a href="mailto:contact@noahlife.io">contact@noahlife.io</a></li>
                  <li>{t.sections.contact.legal}: <a href="mailto:contact@noahlife.io">contact@noahlife.io</a></li>
                  <li>{t.sections.contact.privacy}: <a href="mailto:contact@noahlife.io">contact@noahlife.io</a></li>
                  <li>{t.sections.contact.postal}: Rua das Merces 41, Funchal, Madeira, Portugal 9000-224</li>
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
  badge: "Terms of Use",
  title: "Terms of Use",
  subtitle: "The terms and conditions that govern your use of the Noah Life application.",
  version: "Version 1.0",
  lastUpdated: "Last updated: June 24, 2026",
  effective: "Effective: June 24, 2026",
  onThisPage: "On this page",
  toc: [
    { href: "#who", label: "Who we are" },
    { href: "#what", label: "What Noah is" },
    { href: "#not", label: "What Noah is NOT" },
    { href: "#eligibility", label: "Eligibility" },
    { href: "#account", label: "Account & data" },
    { href: "#voice", label: "Voice & recording" },
    { href: "#emergency", label: "Emergency calls" },
    { href: "#fees", label: "Fees & refunds" },
    { href: "#use", label: "Acceptable use" },
    { href: "#ip", label: "Intellectual property" },
    { href: "#liability", label: "Liability" },
    { href: "#changes", label: "Changes" },
    { href: "#termination", label: "Termination" },
    { href: "#law", label: "Governing law" },
    { href: "#contact", label: "Contact" },
  ],
  intro: "Welcome to Noah Life. Please read these Terms of Use carefully before using the Noah Life mobile application. By downloading, installing, or using the App, you agree to be bound by these Terms. If you do not agree, please do not use the App.",
  sections: {
    who: { title: "1. Who we are", legal: "Legal queries", privacy: "Privacy queries" },
    what: {
      title: "2. What Noah is",
      desc: "Noah is a digital companion application designed primarily for users aged 50 and above. Noah can help you:",
      items: ["Have conversations with an AI assistant (text and voice)", "Record and summarise your doctor's consultations", "Schedule reminders, medications, and medical appointments", "Save trusted emergency contacts and trigger an emergency call", 'Store personal facts ("memories") so the assistant remembers context'],
      warning: "Noah is a software service. It is not a medical device, not a professional adviser, and not a replacement for human contact, qualified medical care, or emergency services.",
    },
    not: {
      title: "3. What Noah is NOT",
      desc: "You acknowledge and accept that Noah does not provide:",
      items: ["A medical, psychological, psychiatric, or clinical service", "A diagnosis, prescription, dosage adjustment, or treatment plan", "Legal, financial, fiscal, or insurance advice", "Emergency response services,in an emergency, dial 112 (Spain) or your local emergency number directly", "A replacement for your family, doctor, or human relationships"],
      verify: "AI responses may contain errors or outdated information. Always verify with a qualified professional.",
    },
    eligibility: {
      title: "4. Eligibility",
      desc: "You may use Noah only if you are:",
      items: ["At least 18 years old, OR a minor with parental/guardian consent", "Legally able to enter into a binding contract", "Not in a jurisdiction where this service is restricted"],
      children: "We do not knowingly collect data from children under 14 (Spain's digital consent age).",
    },
    account: {
      title: "5. Your account and data",
      desc: 'Your "account" is identified by a device-bound user ID generated when you first open the app. You are responsible for:',
      items: ["The accuracy of information you enter (medications, contacts, etc.)", "Keeping your device secure", "Reviewing and updating your emergency contacts", "The content of any voice recording you initiate"],
    },
    voice: {
      title: "6. Voice and recording features",
      realtime: "Real-time voice mode",
      realtimeDesc: "Audio is processed in real time via AWS/Bedrock and is not retained as a recording. Transcripts may be retained as part of your conversation history.",
      doctor: "Doctor consultation recording",
      doctorDesc: 'When you tap "Record consultation", an audible disclaimer informs anyone present. You are solely responsible for:',
      doctorItems: ["Obtaining consent of third parties before recording", "Complying with jurisdictional recording laws", "Using recordings only for your personal medical record"],
    },
    emergency: {
      title: "7. Emergency call feature",
      desc: "The emergency button places calls via your device's telephony stack, subject to carrier availability and signal strength.",
      warning: "This is a convenience layer, not a certified emergency service. We do NOT guarantee calls will connect or that location data will be shared successfully. In a genuine emergency, use your phone's built-in emergency dialler.",
    },
    fees: {
      title: "8. Subscription, fees, and refunds",
      desc: "The base version is free. Paid features are handled via Google Play or Apple App Store under their terms.",
      items: ["Google Play: Subscriptions → Noah AI → Cancel", "Apple: Account → Subscriptions → Noah AI → Cancel"],
      noPayment: "We do not store payment data.",
    },
    use: {
      title: "9. Acceptable use",
      desc: "You agree NOT to:",
      items: ["Use Noah to harm yourself or others", "Use Noah for any illegal purpose", "Make medical/legal/financial decisions without professional review", "Reverse-engineer or extract AI models or code", "Abuse the system with automated traffic or spam", "Impersonate another user or access others' data", "Record a third party without their consent"],
      suspension: "We may suspend or terminate access for violations.",
    },
    ip: {
      title: "10. Intellectual property",
      desc: "The Noah application, brand, and software are owned by Pixpel LDA and protected by applicable laws.",
      yours: "Your content remains yours.",
      items: ["We do not claim ownership of your personal content", "We do not sell your content", "We do not use your content to train public AI models"],
    },
    liability: {
      title: "11. Liability",
      desc: "To the maximum extent permitted by Spanish and EU law:",
      items: ['Noah is provided "as is" without warranties', "We do not guarantee uninterrupted or error-free service", "We are not liable for indirect or consequential damages", "Total liability is limited to fees paid in the last 12 months (or €100)"],
      exceptions: "These limits do NOT apply to: death/injury from gross negligence, fraud, or rights under Spanish consumer law (RDL 1/2007).",
    },
    changes: {
      title: "12. Changes to these Terms",
      desc: "Material changes are notified through the App or by email. Continued use after the effective date constitutes acceptance.",
    },
    termination: {
      title: "13. Termination",
      desc: "You can stop using Noah anytime by uninstalling the app. Request data deletion via contact@noahlife.io or in-app sign-out. We may terminate access for material breach.",
    },
    law: {
      title: "14. Governing law and disputes",
      desc: "These Terms are governed by Spanish law.",
      items: ["EU consumers: EU Online Dispute Resolution (ec.europa.eu/consumers/odr)", "You may bring proceedings in your local courts", "Our preferred forum: courts of Funchal, Madeira, Portugal"],
    },
    contact: {
      title: "15. Contact",
      general: "General",
      legal: "Legal",
      privacy: "Privacy / GDPR",
      postal: "Postal",
    },
  },
}

const es = {
  badge: "Condiciones de Uso",
  title: "Condiciones de Uso",
  subtitle: "Los términos y condiciones que regulan el uso de la aplicación Noah Life.",
  version: "Versión 1.0",
  lastUpdated: "Última actualización: 24 de junio de 2026",
  effective: "Vigente desde: 24 de junio de 2026",
  onThisPage: "En esta página",
  toc: [
    { href: "#who", label: "Quiénes somos" },
    { href: "#what", label: "Qué es Noah" },
    { href: "#not", label: "Qué NO es Noah" },
    { href: "#eligibility", label: "Elegibilidad" },
    { href: "#account", label: "Cuenta y datos" },
    { href: "#voice", label: "Voz y grabación" },
    { href: "#emergency", label: "Llamadas de emergencia" },
    { href: "#fees", label: "Tarifas y reembolsos" },
    { href: "#use", label: "Uso aceptable" },
    { href: "#ip", label: "Propiedad intelectual" },
    { href: "#liability", label: "Responsabilidad" },
    { href: "#changes", label: "Cambios" },
    { href: "#termination", label: "Terminación" },
    { href: "#law", label: "Ley aplicable" },
    { href: "#contact", label: "Contacto" },
  ],
  intro: "Bienvenido a Noah Life. Por favor, lee estas Condiciones de Uso detenidamente antes de utilizar la aplicación móvil Noah Life. Al descargar, instalar o usar la App, aceptas quedar vinculado por estas Condiciones. Si no estás de acuerdo, no uses la App.",
  sections: {
    who: { title: "1. Quiénes somos", legal: "Consultas legales", privacy: "Consultas de privacidad" },
    what: {
      title: "2. Qué es Noah",
      desc: "Noah es una aplicación de compañía digital diseñada principalmente para usuarios de 50 años en adelante. Noah puede ayudarte a:",
      items: ["Conversar con un asistente de IA (texto y voz)", "Grabar y resumir tus consultas médicas", "Programar recordatorios, medicamentos y citas médicas", "Guardar contactos de emergencia de confianza y activar llamadas de emergencia", 'Almacenar datos personales ("recuerdos") para que el asistente recuerde el contexto'],
      warning: "Noah es un servicio de software. No es un dispositivo médico, ni un asesor profesional, ni un sustituto del contacto humano, la atención médica cualificada o los servicios de emergencia.",
    },
    not: {
      title: "3. Qué NO es Noah",
      desc: "Reconoces y aceptas que Noah no proporciona:",
      items: ["Un servicio médico, psicológico, psiquiátrico o clínico", "Un diagnóstico, prescripción, ajuste de dosis o plan de tratamiento", "Asesoramiento legal, financiero, fiscal o de seguros", "Servicios de respuesta a emergencias,en caso de emergencia, llama al 112 directamente", "Un sustituto de tu familia, médico o relaciones humanas"],
      verify: "Las respuestas de la IA pueden contener errores o información desactualizada. Siempre verifica con un profesional cualificado.",
    },
    eligibility: {
      title: "4. Elegibilidad",
      desc: "Puedes usar Noah solo si:",
      items: ["Tienes al menos 18 años, O eres menor con consentimiento parental", "Puedes legalmente celebrar un contrato vinculante", "No estás en una jurisdicción donde este servicio está restringido"],
      children: "No recopilamos datos de menores de 14 años (edad de consentimiento digital en España).",
    },
    account: {
      title: "5. Tu cuenta y datos",
      desc: 'Tu "cuenta" se identifica por un ID de usuario vinculado al dispositivo generado al abrir la app por primera vez. Eres responsable de:',
      items: ["La exactitud de la información que introduces (medicamentos, contactos, etc.)", "Mantener tu dispositivo seguro", "Revisar y actualizar tus contactos de emergencia", "El contenido de cualquier grabación de voz que inicies"],
    },
    voice: {
      title: "6. Funciones de voz y grabación",
      realtime: "Modo de voz en tiempo real",
      realtimeDesc: "El audio se procesa en tiempo real vía AWS/Bedrock y no se retiene como grabación. Las transcripciones pueden conservarse como parte del historial de conversación.",
      doctor: "Grabación de consulta médica",
      doctorDesc: 'Al pulsar "Grabar consulta", un aviso audible informa a los presentes. Eres el único responsable de:',
      doctorItems: ["Obtener el consentimiento de terceros antes de grabar", "Cumplir con las leyes jurisdiccionales sobre grabación", "Usar las grabaciones solo para tu historial médico personal"],
    },
    emergency: {
      title: "7. Función de llamada de emergencia",
      desc: "El botón de emergencia realiza llamadas a través del sistema telefónico de tu dispositivo, sujeto a disponibilidad del operador y cobertura.",
      warning: "Esta es una capa de conveniencia, no un servicio de emergencia certificado. NO garantizamos que las llamadas se conecten ni que los datos de ubicación se compartan correctamente. En una emergencia real, usa el marcador de emergencia de tu teléfono.",
    },
    fees: {
      title: "8. Suscripción, tarifas y reembolsos",
      desc: "La versión básica es gratuita. Las funciones de pago se gestionan a través de Google Play o Apple App Store según sus términos.",
      items: ["Google Play: Suscripciones → Noah AI → Cancelar", "Apple: Cuenta → Suscripciones → Noah AI → Cancelar"],
      noPayment: "No almacenamos datos de pago.",
    },
    use: {
      title: "9. Uso aceptable",
      desc: "Te comprometes a NO:",
      items: ["Usar Noah para hacerte daño a ti o a otros", "Usar Noah para cualquier fin ilegal", "Tomar decisiones médicas/legales/financieras sin revisión profesional", "Realizar ingeniería inversa o extraer modelos de IA o código", "Abusar del sistema con tráfico automatizado o spam", "Suplantar a otro usuario o acceder a datos ajenos", "Grabar a un tercero sin su consentimiento"],
      suspension: "Podemos suspender o cancelar el acceso por incumplimientos.",
    },
    ip: {
      title: "10. Propiedad intelectual",
      desc: "La aplicación Noah, marca y software son propiedad de Pixpel LDA y están protegidos por las leyes aplicables.",
      yours: "Tu contenido sigue siendo tuyo.",
      items: ["No reclamamos la propiedad de tu contenido personal", "No vendemos tu contenido", "No usamos tu contenido para entrenar modelos de IA públicos"],
    },
    liability: {
      title: "11. Responsabilidad",
      desc: "En la máxima medida permitida por la ley española y de la UE:",
      items: ['Noah se proporciona "tal cual" sin garantías', "No garantizamos un servicio ininterrumpido o sin errores", "No somos responsables de daños indirectos o consecuentes", "La responsabilidad total se limita a las cuotas pagadas en los últimos 12 meses (o 100€)"],
      exceptions: "Estos límites NO se aplican a: muerte/lesión por negligencia grave, fraude, o derechos bajo la ley de consumo española (RDL 1/2007).",
    },
    changes: {
      title: "12. Cambios en estas Condiciones",
      desc: "Los cambios materiales se notifican a través de la App o por email. El uso continuado tras la fecha efectiva constituye aceptación.",
    },
    termination: {
      title: "13. Terminación",
      desc: "Puedes dejar de usar Noah en cualquier momento desinstalando la app. Solicita la eliminación de datos vía contact@noahlife.io o cerrando sesión en la app. Podemos terminar el acceso por incumplimiento material.",
    },
    law: {
      title: "14. Ley aplicable y disputas",
      desc: "Estas Condiciones se rigen por la ley española.",
      items: ["Consumidores de la UE: Plataforma de Resolución de Litigios en Línea (ec.europa.eu/consumers/odr)", "Puedes presentar procedimientos en tus tribunales locales", "Nuestro foro preferido: tribunales de Funchal, Madeira, Portugal"],
    },
    contact: {
      title: "15. Contacto",
      general: "General",
      legal: "Legal",
      privacy: "Privacidad / RGPD",
      postal: "Dirección postal",
    },
  },
}
