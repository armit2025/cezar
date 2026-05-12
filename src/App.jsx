import { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  FileSearch,
  Gavel,
  Mail,
  MessageCircle,
  PhoneCall,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import heroImage from './assets/hero.png';
import './App.css';

const PHONE_DISPLAY = '0752 176 117';
const PHONE_RAW = '40752176117';
const EMAIL_ADDRESS = 'cezar.tanasa@yahoo.com';

const entryRoutes = [
  {
    icon: Clock3,
    title: 'Consultatie urgenta',
    text: 'Evaluare rapida a contextului si stabilirea pasilor imediati.',
  },
  {
    icon: Gavel,
    title: 'Litigiu sau disputa',
    text: 'Analiza pozitiei procesuale, a probelor si a riscurilor previzibile.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Consultanta pentru afaceri',
    text: 'Asistenta pentru contracte, negocieri si decizii comerciale importante.',
  },
];

const proofPoints = [
  'Confidentialitate inca de la primul contact',
  'Analiza initiala concentrata pe risc si obiectiv',
  'Recomandari formulate clar si argumentat',
  'Comunicare directa pe parcursul mandatului',
];

const practiceAreas = [
  {
    icon: Scale,
    title: 'Litigii civile si comerciale',
    text: 'Reprezentare in conflicte contractuale, comerciale si patrimoniale, cu accent pe strategie procesuala si administrarea probelor.',
  },
  {
    icon: ShieldCheck,
    title: 'Drept penal',
    text: 'Asistenta si aparare in cauze penale, cu atentie la drepturile clientului, reputatie si fiecare etapa procedurala.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Societar si contractual',
    text: 'Consultanta pentru societati, contracte, negocieri si decizii care necesita predictibilitate juridica.',
  },
  {
    icon: FileSearch,
    title: 'Executari si masuri urgente',
    text: 'Interventii in proceduri de executare, masuri provizorii si situatii in care timpul influenteaza rezultatul.',
  },
];

const methodSteps = [
  {
    step: '01',
    title: 'Analiza initiala',
    text: 'Identificarea documentelor relevante, a termenelor, a riscurilor si a obiectivului realist al clientului.',
  },
  {
    step: '02',
    title: 'Strategie juridica',
    text: 'Stabilirea directiei de actiune, a argumentelor principale si a alternativelor procedurale disponibile.',
  },
  {
    step: '03',
    title: 'Reprezentare',
    text: 'Redactarea actelor, comunicarea cu partile implicate si sustinerea pozitiei clientului in fata autoritatilor sau instantelor.',
  },
];

const contactChannels = [
  {
    label: 'Telefon',
    value: PHONE_DISPLAY,
    href: `tel:+${PHONE_RAW}`,
  },
  {
    label: 'Email',
    value: EMAIL_ADDRESS,
    href: `mailto:${EMAIL_ADDRESS}`,
  },
  {
    label: 'Programari',
    value: 'Iasi, cu programare prealabila',
  },
];

function CabinetLogo() {
  return (
    <svg
      className="brand-logo"
      viewBox="0 0 72 72"
      role="img"
      aria-labelledby="cabinet-logo-title"
    >
      <title id="cabinet-logo-title">Logo Tanasa Cezar-Dumitru</title>
      <rect className="logo-field" x="5" y="5" width="62" height="62" rx="2" />
      <path className="logo-rule" d="M18 18h36M18 54h36" />
      <path className="logo-divider" d="M36 16v40" />
      <text className="logo-letter logo-letter-left" x="26" y="43" textAnchor="middle">
        T
      </text>
      <text className="logo-letter logo-letter-right" x="46" y="43" textAnchor="middle">
        C
      </text>
    </svg>
  );
}

function App() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });
  const heroImageY = useTransform(scrollYProgress, [0, 0.35], ['0%', shouldReduceMotion ? '0%' : '8%']);

  const [formData, setFormData] = useState({
    nume: '',
    telefon: '',
    email: '',
    speta: '',
  });
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const revealProps = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (feedback.message) {
      setFeedback({ type: '', message: '' });
    }
  };

  const buildContactPayload = () => {
    const sanitizedData = {
      nume: formData.nume.trim(),
      telefon: formData.telefon.trim(),
      email: formData.email.trim(),
      speta: formData.speta.trim(),
    };

    if (Object.values(sanitizedData).some((value) => !value)) {
      setFeedback({
        type: 'error',
        message: 'Completeaza toate campurile inainte de trimitere.',
      });
      return null;
    }

    const subject = `Solicitare evaluare initiala - ${sanitizedData.nume}`;
    const emailBody = [
      `Nume: ${sanitizedData.nume}`,
      `Telefon: ${sanitizedData.telefon}`,
      `Email: ${sanitizedData.email}`,
      '',
      'Context:',
      sanitizedData.speta,
    ].join('\n');
    const whatsappBody = [
      'Buna ziua.',
      `Numele meu este ${sanitizedData.nume}.`,
      `Telefon: ${sanitizedData.telefon}.`,
      `Email: ${sanitizedData.email}.`,
      `Context: ${sanitizedData.speta}`,
    ].join(' ');

    return { subject, emailBody, whatsappBody };
  };

  const handleWhatsApp = (event) => {
    event.preventDefault();
    const payload = buildContactPayload();

    if (!payload) {
      return;
    }

    setFeedback({ type: 'success', message: 'Se deschide WhatsApp cu datele completate.' });
    window.open(
      `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(payload.whatsappBody)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  const handleEmail = (event) => {
    event.preventDefault();
    const payload = buildContactPayload();

    if (!payload) {
      return;
    }

    setFeedback({ type: 'success', message: 'Se deschide emailul cu solicitarea pregatita.' });
    window.location.href =
      `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(payload.subject)}` +
      `&body=${encodeURIComponent(payload.emailBody)}`;
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell">
        <motion.div
          className="scroll-progress"
          style={{ scaleX: progressScaleX }}
          aria-hidden="true"
        />

        <header className="topbar">
          <a className="brand-mark" href="#top" aria-label="Acasa">
            <CabinetLogo />
            <span className="brand-copy">
              <strong>Tanasa Cezar-Dumitru</strong>
              <span>Cabinet de avocat</span>
            </span>
          </a>
          <nav className="topnav" aria-label="Navigatie principala">
            <a href="#abordare">Abordare</a>
            <a href="#expertiza">Expertiza</a>
            <a href="#metoda">Metoda</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="topbar-action" href={`tel:+${PHONE_RAW}`}>
            <PhoneCall size={17} />
            {PHONE_DISPLAY}
          </a>
        </header>

        <main>
          <section className="hero" id="top">
            <motion.img
              className="hero-image"
              src={heroImage}
              alt="Cabinet de avocat cu atmosfera executiva"
              style={{ y: heroImageY }}
            />
            <div className="hero-scrim" />

            <div className="hero-content">
              <motion.div className="hero-main" {...revealProps()}>
                <span className="eyebrow">Cabinet de avocat | Iasi</span>
                <h1>Tanasa D. Cezar-Dumitru</h1>
                <p>
                  Asistenta si reprezentare juridica pentru cauze civile, comerciale si penale,
                  cu o abordare discreta, riguroasa si orientata catre solutii concrete.
                </p>

                <div className="hero-actions">
                  <motion.a
                    className="button-primary"
                    href="#contact"
                    whileHover={{ y: shouldReduceMotion ? 0 : -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Solicita evaluare
                    <ArrowRight size={18} />
                  </motion.a>
                </div>
              </motion.div>

              <motion.div className="hero-routes" {...revealProps(0.12)}>
                {entryRoutes.map((route, index) => {
                  const Icon = route.icon;

                  return (
                    <a className="route-tile" href="#contact" key={route.title}>
                      <span className="route-index">0{index + 1}</span>
                      <Icon size={19} />
                      <strong>{route.title}</strong>
                      <span>{route.text}</span>
                    </a>
                  );
                })}
              </motion.div>
            </div>
          </section>

          <section className="proof-band" id="abordare">
            <div className="section-frame">
              <motion.div className="proof-intro" {...revealProps()}>
                <span className="eyebrow dark">Standardul initial</span>
                <h2>O cauza juridica importanta are nevoie de claritate inainte de actiune.</h2>
              </motion.div>

              <motion.div className="proof-grid" {...revealProps(0.1)}>
                {proofPoints.map((point) => (
                  <div className="proof-item" key={point}>
                    <BadgeCheck size={18} />
                    <span>{point}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="practice-section" id="expertiza">
            <div className="section-frame">
              <motion.div className="section-heading" {...revealProps()}>
                <span className="eyebrow dark">Expertiza</span>
                <h2>Arii de practica pentru mandate in care analiza si tactica fac diferenta.</h2>
              </motion.div>

              <div className="practice-list">
                {practiceAreas.map((area, index) => {
                  const Icon = area.icon;

                  return (
                    <motion.article
                      className="practice-row"
                      key={area.title}
                      {...revealProps(index * 0.05 + 0.06)}
                    >
                      <span className="practice-number">0{index + 1}</span>
                      <Icon size={22} />
                      <div>
                        <h3>{area.title}</h3>
                        <p>{area.text}</p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="method-section" id="metoda">
            <div className="section-frame method-layout">
              <motion.div className="method-copy" {...revealProps()}>
                <span className="eyebrow dark">Metoda</span>
                <h2>Fiecare dosar este abordat prin analiza, strategie si executie.</h2>
                <p>
                  Inaintea oricarei interventii, stabilim contextul juridic, riscurile relevante
                  si modul in care fiecare pas sustine interesul clientului.
                </p>
              </motion.div>

              <div className="method-steps">
                {methodSteps.map((step, index) => (
                  <motion.article className="method-step" key={step.step} {...revealProps(index * 0.07)}>
                    <span>{step.step}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section className="contact-section" id="contact">
            <div className="section-frame contact-layout">
              <motion.div className="contact-copy" {...revealProps()}>
                <span className="eyebrow">Contact</span>
                <h2>Solicita o evaluare initiala a situatiei tale juridice.</h2>
                <p>
                  Transmite pe scurt contextul, datele de contact si obiectivul urmarit. Daca
                  situatia permite preluarea mandatului, discutia continua in mod direct.
                </p>

                <div className="contact-channels">
                  {contactChannels.map((channel) => {
                    const content = channel.href ? (
                      <a href={channel.href}>{channel.value}</a>
                    ) : (
                      <span>{channel.value}</span>
                    );

                    return (
                      <div className="contact-channel" key={channel.label}>
                        <strong>{channel.label}</strong>
                        {content}
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.form className="contact-form" {...revealProps(0.1)}>
                <div className="field-grid">
                  <label className="field" htmlFor="nume">
                    <span>Nume complet</span>
                    <input
                      id="nume"
                      type="text"
                      name="nume"
                      value={formData.nume}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="field" htmlFor="telefon">
                    <span>Telefon</span>
                    <input
                      id="telefon"
                      type="tel"
                      name="telefon"
                      value={formData.telefon}
                      onChange={handleChange}
                      autoComplete="tel"
                      required
                    />
                  </label>
                </div>

                <label className="field" htmlFor="email">
                  <span>Email</span>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="field" htmlFor="speta">
                  <span>Contextul spetei</span>
                  <textarea
                    id="speta"
                    name="speta"
                    value={formData.speta}
                    onChange={handleChange}
                    rows="7"
                    required
                  />
                </label>

                <p className="field-hint">
                  Include pe scurt stadiul cauzei, documentele existente si rezultatul urmarit.
                </p>

                <div className="form-actions">
                  <motion.button
                    type="button"
                    className="button-primary"
                    onClick={handleEmail}
                    whileHover={{ y: shouldReduceMotion ? 0 : -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Trimite pe email
                    <Mail size={18} />
                  </motion.button>
                  <motion.button
                    type="button"
                    className="button-secondary whatsapp-action"
                    onClick={handleWhatsApp}
                    whileHover={{ y: shouldReduceMotion ? 0 : -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Trimite pe WhatsApp
                    <MessageCircle size={18} />
                  </motion.button>
                </div>

                <p className={`form-feedback ${feedback.type}`} aria-live="polite">
                  {feedback.message || 'Datele sunt folosite exclusiv pentru initierea discutiei.'}
                </p>
              </motion.form>
            </div>
          </section>
        </main>
      </div>
    </MotionConfig>
  );
}

export default App;
