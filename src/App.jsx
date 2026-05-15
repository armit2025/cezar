import { useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Heart,
  Home,
  MessageCircle,
  PhoneCall,
  Gavel,
  Scale,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import './App.css';

const PHONE_DISPLAY = '0752 176 117';
const PHONE_RAW = '40752176117';
const EMAIL_ADDRESS = 'cezar.tanasa@yahoo.com';

const trustBullets = [
  'Îți explic pe înțelesul tău, fără termeni complicați.',
  'Îți spun clar ce se poate, ce nu se poate și ce este urgent.',
  'Știi din start ce acte ai nevoie și cât durează, pe scurt.',
];

const caseClusters = [
  {
    id: 'divort',
    icon: Heart,
    title: 'Divorț, partaj, copii',
    lead: 'Divorț la notar sau la instanță, împărțirea bunurilor, pensia de întreținere și programul de vizită al copilului.',
    tags: [
      'avocat divorț iași',
      'partaj apartament',
      'partaj bunuri comune',
      'pensia alimentară',
      'custodia copilului',
      'divorț cu copil',
    ],
    fill: 'Am nevoie de ajutor la divorț / partaj / pensie alimentară / copil. ',
  },
  {
    id: 'executare',
    icon: Scale,
    title: 'Executare silită, datorii, popriri',
    lead: 'Acte de la executor, poprire pe salariu, contestație la executare, rate la bancă sau IFN.',
    tags: [
      'executare silită',
      'contestație la executare',
      'poprire salariu',
      'nu mai pot plăti creditul',
      'datorii la bancă',
      'recuperare datorii',
    ],
    fill: 'Am primit acte de executare silită / poprire / datorii la bancă sau IFN. ',
  },
  {
    id: 'pensie',
    icon: ShieldCheck,
    title: 'Pensie de întreținere neplătită',
    lead: 'Stabilire, modificare, recuperare pensie alimentară sau apărare dacă nu mai poți plăti.',
    tags: [
      'pensie alimentară neplătită',
      'recuperare pensie alimentară',
      'calcul pensie alimentară',
      'executare pensie alimentară',
    ],
    fill: 'Problemă cu pensia alimentară (stabilire, neplată sau recuperare). ',
  },
  {
    id: 'chirie',
    icon: Home,
    title: 'Chirie, evacuare, locuință',
    lead: 'Contract de închiriere, evacuare, garanție nereturnată, datorii la chirie sau întreținere.',
    tags: [
      'evacuare chiriaș',
      'drepturile chiriașului',
      'garanție chirie',
      'datorii chirie',
      'avocat chirie iași',
    ],
    fill: 'Problemă cu chiria / evacuare / garanție / întreținere. ',
  },
  {
    id: 'munca',
    icon: Briefcase,
    title: 'Salariu, concediere, loc de muncă',
    lead: 'Salariu neplătit, concediere abuzivă, ore suplimentare, conflicte cu angajatorul.',
    tags: [
      'concediere abuzivă',
      'salariu neplătit',
      'recuperare salarii',
      'avocat dreptul muncii iași',
    ],
    fill: 'Problemă la serviciu (salariu, concediere, abuz). ',
  },
  {
    id: 'penal',
    icon: Gavel,
    title: 'Amenzi, dosar penal, citări',
    lead: 'Contestație la amendă, citație, anchetă sau dosar penal – ce înseamnă și ce poți face mai departe.',
    tags: [
      'contestație amendă',
      'dosar penal',
      'avocat penal iași',
      'citație poliție',
    ],
    fill: 'Am primit o amendă sau o citație / am un dosar penal. ',
  },
];

const quickPaths = [
  {
    title: 'Vreau să divorțez',
    text: 'Divorț la notar sau la instanță, cu sau fără copii.',
    fill: 'Vreau să divorțez. ',
    situatie: 'divort',
  },
  {
    title: 'Partaj apartament sau casă',
    text: 'Împărțirea bunurilor după divorț sau separare.',
    fill: 'Am nevoie de partaj (apartament / casă / bunuri comune). ',
    situatie: 'divort',
  },
  {
    title: 'Pensie de întreținere sau copil',
    text: 'Stabilire, mărire, reducere sau neplată.',
    fill: 'Problemă cu pensia alimentară sau custodia copilului. ',
    situatie: 'pensie',
  },
  {
    title: 'Executare silită sau poprire',
    text: 'Acte de la executor, poprire pe salariu sau cont.',
    fill: 'Am primit acte de executare silită / poprire / de la executor. ',
    situatie: 'executare',
  },
  {
    title: 'Nu mai pot plăti creditul',
    text: 'Rate la bancă, IFN, amenințări de recuperare.',
    fill: 'Nu mai pot plăti creditul / am datorii la bancă sau IFN. ',
    situatie: 'executare',
  },
  {
    title: 'Probleme cu chiria',
    text: 'Evacuare, garanție, contract, datorii la chirie.',
    fill: 'Problemă cu chiria (evacuare, garanție, contract). ',
    situatie: 'chirie',
  },
  {
    title: 'Concediere sau salariu neplătit',
    text: 'Concediere, salarii restante, abuz la locul de muncă.',
    fill: 'Problemă la serviciu: concediere, salariu neplătit sau conflict cu angajatorul. ',
    situatie: 'munca',
  },
  {
    title: 'Amendă sau dosar penal',
    text: 'Contestație, citație, anchetă penală.',
    fill: 'Am primit o amendă sau o citație / am dosar penal. ',
    situatie: 'penal',
  },
  {
    title: 'Moștenire sau succesiune',
    text: 'Împărțirea moștenirii, certificate, conflicte între moștenitori.',
    fill: 'Problemă cu moștenirea / succesiunea. ',
    situatie: 'mostenire',
  },
];

const faqItems = [
  {
    q: 'Cât costă o consultație sau un divorț?',
    a: 'Depinde de tipul cauzei (divorț amiabil, contencios, executare silită etc.) și de actele existente. Descrie pe scurt situația și îți explic cum procedăm și ce implică, înainte de orice pas.',
  },
  {
    q: 'Cât durează un divorț în România?',
    a: 'Divorțul amiabil fără copii poate dura circa 30 de zile la starea civilă. La notar, în jur de 30–45 de zile. Divorțul la instanță (contencios), cu copii sau partaj litigios, poate dura 12–24 de luni sau mai mult.',
  },
  {
    q: 'Ce este executarea silită și ce pot face?',
    a: 'Executarea silită înseamnă că un creditor își recuperează banii prin executor judecătoresc (poprire pe salariu, sechestru pe bunuri etc.). Poți verifica dacă actele sunt legale, dacă termenele sunt respectate și poți depune contestație la executare în termenul legal (de regulă, 15 zile de la comunicare).',
  },
  {
    q: 'Ce se întâmplă dacă nu mai plătesc creditul?',
    a: 'Banca sau IFN poate trimite somații, raporta la Biroul de Credit și, ulterior, declanșa executarea silită. Cu cât reacționezi mai devreme, cu atât ai mai multe opțiuni (negociere, contestație, restructurare).',
  },
  {
    q: 'Cum se calculează pensia de întreținere?',
    a: 'Instanța stabilește pensia în funcție de veniturile părintelui obligat și nevoile copilului. Orientativ, din venitul net: până la 1/4 pentru un copil, 1/3 pentru doi, 1/2 pentru trei sau mai mulți. Dacă părintele nu are venit declarat, se poate folosi salariul minim pe economie.',
  },
  {
    q: 'Ce fac dacă nu îmi plătește pensia de întreținere?',
    a: 'Poți solicita executarea silită (poprire, sechestru). După 3 luni de neplată continuă, neplata poate deveni și infracțiune (abandon de familie). Un avocat te ajută să recuperezi sumele și să urmezi procedura corect.',
  },
  {
    q: 'Cum se face partajul după divorț?',
    a: 'Bunurile dobândite în timpul căsătoriei sunt, de regulă, împărțite în mod egal, dar pot exista excepții dacă un soț dovedește o contribuție mai mare. Partajul poate fi amiabil (la notar) sau judiciar (la instanță).',
  },
  {
    q: 'Pot opri o executare silită pe apartamentul familiei?',
    a: 'Depinde dacă datoria este personală sau de familie, dacă bunul este comun și dacă s-au respectat procedurile. În multe situații, soțul neîndatorat poate contesta executarea sau cere partajul prealabil.',
  },
  {
    q: 'Am fost concediat – ce drepturi am?',
    a: 'Verificăm dacă concedierea este legală, dacă ai primit salariile și drepturile la zi și ce poți contesta. Termenele sunt scurte, deci este bine să nu amâni.',
  },
  {
    q: 'Proprietarul vrea să mă evacueze – ce fac?',
    a: 'Depinde de contract, de motive și de modul în care ți s-a comunicat. Evacuarea nelegală se poate contesta. Îți explic pas cu pas ce acte ai și ce poți face.',
  },
  {
    q: 'Dacă nu am multe acte, mai are rost să sun?',
    a: 'Da. Uneori primul pas este să aflăm ce acte lipsesc și cum le poți obține (de la instanță, executor, angajator sau bancă). Poți trimite poze pe WhatsApp.',
  },
  {
    q: 'Îmi poți spune dacă câștig cauza?',
    a: 'Îți spun ce șanse există după ce înțeleg situația și văd documentele. Dacă nu este realist, îți spun direct – fără promisiuni goale.',
  },
];

const situatieOptions = [
  { value: '', label: 'Alege tipul problemei (opțional)' },
  ...caseClusters.map((c) => ({ value: c.id, label: c.title })),
  { value: 'mostenire', label: 'Moștenire sau succesiune' },
  { value: 'altceva', label: 'Altceva' },
];

function Topbar() {
  return (
    <header className="v2-topbar">
      <a className="v2-brand" href="#top" aria-label="Acasă">
        <span className="v2-mark" aria-hidden="true">
          TC
        </span>
        <span className="v2-brand-copy">
          <strong>Tanasa Cezar-Dumitru</strong>
          <span>Avocat în Iași</span>
        </span>
      </a>

      <nav className="v2-nav" aria-label="Navigație">
        <a href="#cazuri">Cazuri</a>
        <a href="#alege">Alege situația</a>
        <a href="#intrebari">Întrebări</a>
        <a href="#contact">Contact</a>
      </nav>

      <a className="v2-call" href={`tel:+${PHONE_RAW}`}>
        <PhoneCall size={18} />
        <span>{PHONE_DISPLAY}</span>
      </a>
    </header>
  );
}

function formatWhatsAppText({ nume, telefon, situatie, problema, cand, localitate }) {
  const lines = [
    'Bună ziua.',
    `Mă numesc ${nume}.`,
    telefon ? `Telefon: ${telefon}.` : null,
    situatie ? `Tip problemă: ${situatie}.` : null,
    `Problemă: ${problema}.`,
    `Când: ${cand}.`,
    `Localitate: ${localitate}.`,
    'Aș dori o primă discuție, ca să înțeleg ce pot face.',
  ].filter(Boolean);
  return lines.join(' ');
}

function buildMailTo({ nume, telefon, situatie, problema, cand, localitate }) {
  const subject = `Solicitare avocat Iași - ${nume}`;
  const body = [
    `Nume: ${nume}`,
    telefon ? `Telefon: ${telefon}` : null,
    situatie ? `Tip problemă: ${situatie}` : null,
    `Descriere: ${problema}`,
    `Când s-a întâmplat: ${cand}`,
    `Localitate: ${localitate}`,
    '',
    'Vă rog să îmi spuneți care sunt pașii următori și ce acte trebuie să pregătesc.',
  ]
    .filter(Boolean)
    .join('\n');
  return `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function App() {
  const contactRef = useRef(null);
  const [form, setForm] = useState({
    nume: '',
    telefon: '',
    situatie: '',
    problema: '',
    cand: '',
    localitate: 'Iași',
  });
  const [status, setStatus] = useState({ kind: 'idle', message: '' });

  const isValid = useMemo(
    () =>
      form.nume.trim() &&
      form.problema.trim() &&
      form.cand.trim() &&
      form.localitate.trim(),
    [form],
  );

  const situatieLabel = useMemo(() => {
    const found = situatieOptions.find((o) => o.value === form.situatie);
    return found?.value ? found.label : '';
  }, [form.situatie]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (status.kind !== 'idle') setStatus({ kind: 'idle', message: '' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const quickFill = (fillText, situatieId) => {
    setForm((current) => ({
      ...current,
      problema: fillText,
      situatie: situatieId,
    }));
    if (status.kind !== 'idle') setStatus({ kind: 'idle', message: '' });
    scrollToContact();
  };

  const handleWhatsApp = () => {
    if (!isValid) {
      setStatus({ kind: 'error', message: 'Completează numele, descrierea, momentul și localitatea.' });
      return;
    }
    const text = formatWhatsAppText({
      nume: form.nume.trim(),
      telefon: form.telefon.trim(),
      situatie: situatieLabel,
      problema: form.problema.trim(),
      cand: form.cand.trim(),
      localitate: form.localitate.trim(),
    });
    setStatus({ kind: 'success', message: 'Se deschide WhatsApp cu mesajul pregătit.' });
    window.open(`https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleEmail = () => {
    if (!isValid) {
      setStatus({ kind: 'error', message: 'Completează numele, descrierea, momentul și localitatea.' });
      return;
    }
    setStatus({ kind: 'success', message: 'Se deschide emailul cu mesajul pregătit.' });
    window.location.href = buildMailTo({
      nume: form.nume.trim(),
      telefon: form.telefon.trim(),
      situatie: situatieLabel,
      problema: form.problema.trim(),
      cand: form.cand.trim(),
      localitate: form.localitate.trim(),
    });
  };

  return (
    <div className="v2-shell" id="top">
      <Topbar />

      <main className="v2-main">
        <section className="v2-hero">
          <div className="v2-container v2-hero-grid">
            <div className="v2-hero-copy">
              <p className="v2-kicker">
                <ShieldCheck size={18} />
                Avocat în Iași – divorț, executare silită, datorii, muncă
              </p>
              <h1>Ajutor juridic pe înțelesul tău, fără termeni complicați</h1>
              <p className="v2-lead">
                Dacă ai probleme cu <strong>divorțul</strong>, <strong>partajul</strong>,{' '}
                <strong>executarea silită</strong>, <strong>pensia alimentară</strong>, chiria sau salariul, îți
                explic clar ce înseamnă actele primite și care sunt pașii următori.
              </p>

              <div className="v2-hero-actions">
                <a className="v2-btn v2-btn-whatsapp" href={`https://wa.me/${PHONE_RAW}`}>
                  Scrie pe WhatsApp
                  <MessageCircle size={18} />
                </a>
                <a className="v2-btn v2-btn-primary" href="#contact">
                  Completează formularul
                  <ArrowRight size={18} />
                </a>
                <a className="v2-btn v2-btn-ghost" href={`tel:+${PHONE_RAW}`}>
                  Sună acum
                  <PhoneCall size={18} />
                </a>
              </div>

              <div className="v2-trust">
                {trustBullets.map((item) => (
                  <div className="v2-trust-item" key={item}>
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="v2-hero-card" aria-label="Cum funcționează">
              <h2>În 3 pași simpli</h2>
              <ol className="v2-steps">
                <li>
                  <strong>Îmi spui situația.</strong>
                  <span>Divorț, datorii, executare, muncă – pe scurt.</span>
                </li>
                <li>
                  <strong>Îți explic ce înseamnă.</strong>
                  <span>Ce risc ai, ce termene ai, ce acte contează.</span>
                </li>
                <li>
                  <strong>Stabilim următorul pas.</strong>
                  <span>Contestație, divorț, negociere – concret.</span>
                </li>
              </ol>
            </aside>
          </div>
        </section>

        <section className="v2-section v2-cases" id="cazuri">
          <div className="v2-container">
            <header className="v2-section-head">
              <h2>Cazuri frecvente în care te pot ajuta în Iași</h2>
              <p>
                Acestea sunt problemele juridice cel mai des întâlnite. Alege domeniul care te privește și
                completează formularul – sau sună direct.
              </p>
            </header>

            <div className="v2-cluster-grid">
              {caseClusters.map((cluster) => {
                const Icon = cluster.icon;
                return (
                  <article className="v2-cluster" key={cluster.id}>
                    <div className="v2-cluster-head">
                      <span className="v2-cluster-icon" aria-hidden="true">
                        <Icon size={22} />
                      </span>
                      <h3>{cluster.title}</h3>
                    </div>
                    <p className="v2-cluster-lead">{cluster.lead}</p>
                    <ul className="v2-tags" aria-label="Subiecte frecvente">
                      {cluster.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="v2-cluster-cta"
                      onClick={() => quickFill(cluster.fill, cluster.id)}
                    >
                      Am nevoie de ajutor aici
                      <ArrowRight size={16} />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="v2-section v2-quick" id="alege">
          <div className="v2-container">
            <header className="v2-section-head">
              <h2>Alege situația ta (un singur click)</h2>
              <p>Se completează automat mesajul în formular. Poți adăuga detalii după.</p>
            </header>

            <div className="v2-quickpaths">
              {quickPaths.map((item) => (
                <button
                  type="button"
                  className="v2-quickpath"
                  key={item.title}
                  onClick={() => quickFill(item.fill, item.situatie)}
                >
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="v2-section v2-faq" id="intrebari">
          <div className="v2-container">
            <header className="v2-section-head">
              <h2>Întrebări frecvente (divorț, executare, pensie, muncă)</h2>
              <p>Răspunsuri scurte, ca să știi la ce să te aștepți înainte să suni.</p>
            </header>

            <div className="v2-faq-grid">
              {faqItems.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="v2-section v2-contact" id="contact" ref={contactRef}>
          <div className="v2-container v2-contact-grid">
            <div className="v2-contact-copy">
              <h2>Scrie-mi – îți răspund cu pașii următori</h2>
              <p>
                WhatsApp este cel mai rapid: poți trimite poze cu actele (executare silită, somație, concediere,
                hotărâre de divorț). Sună dacă preferi să vorbim la telefon.
              </p>

              <div className="v2-contact-cards">
                <a className="v2-contact-card v2-contact-card-whatsapp" href={`https://wa.me/${PHONE_RAW}`}>
                  <span>WhatsApp</span>
                  <strong>Scrie acum</strong>
                </a>
                <a className="v2-contact-card" href={`tel:+${PHONE_RAW}`}>
                  <span>Telefon</span>
                  <strong>{PHONE_DISPLAY}</strong>
                </a>
              </div>

              <p className="v2-contact-note">
                <Wallet size={16} aria-hidden="true" />
                Discutăm costurile după ce înțeleg situația – fără costuri ascunse.
              </p>
            </div>

            <form className="v2-form" onSubmit={(e) => e.preventDefault()}>
              <label className="v2-field">
                <span>Numele tău</span>
                <input
                  name="nume"
                  value={form.nume}
                  onChange={updateField}
                  autoComplete="name"
                  required
                  placeholder="Ex: Ion Popescu"
                />
              </label>

              <label className="v2-field">
                <span>Telefon (recomandat)</span>
                <input
                  name="telefon"
                  type="tel"
                  value={form.telefon}
                  onChange={updateField}
                  autoComplete="tel"
                  placeholder="Ex: 07xx xxx xxx"
                />
              </label>

              <label className="v2-field">
                <span>Tipul problemei</span>
                <select name="situatie" value={form.situatie} onChange={updateField}>
                  {situatieOptions.map((opt) => (
                    <option key={opt.value || 'empty'} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="v2-field">
                <span>Ce s-a întâmplat? (pe scurt)</span>
                <textarea
                  name="problema"
                  value={form.problema}
                  onChange={updateField}
                  rows={5}
                  required
                  placeholder="Ex: Am primit poprire pe salariu / Vreau să divorțez / Partaj apartament..."
                />
              </label>

              <div className="v2-field-row">
                <label className="v2-field">
                  <span>Când</span>
                  <input
                    name="cand"
                    value={form.cand}
                    onChange={updateField}
                    required
                    placeholder="Ex: săptămâna trecută"
                  />
                </label>
                <label className="v2-field">
                  <span>Localitate</span>
                  <input
                    name="localitate"
                    value={form.localitate}
                    onChange={updateField}
                    required
                    placeholder="Ex: Iași"
                  />
                </label>
              </div>

              <div className="v2-form-actions">
                <button type="button" className="v2-btn v2-btn-whatsapp" onClick={handleWhatsApp}>
                  Trimite pe WhatsApp
                  <MessageCircle size={18} />
                </button>
                <button type="button" className="v2-btn v2-btn-secondary" onClick={handleEmail}>
                  Trimite pe email
                  <ArrowRight size={18} />
                </button>
              </div>

              <p className={`v2-form-status v2-form-status-${status.kind}`} aria-live="polite">
                {status.kind === 'idle'
                  ? 'Confidențial. Mesajul nu reprezintă consultanță juridică până analizăm actele.'
                  : status.message}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="v2-footer">
        <div className="v2-container v2-footer-inner">
          <p>
            Cabinet de avocat Tanasa Cezar-Dumitru – Iași. Divorț, partaj, executare silită, pensie alimentară,
            dreptul muncii, penal.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;