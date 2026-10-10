import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Clock,
  Instagram,
  MessageCircle,
  Check,
  ChevronDown,
  Dumbbell,
  ShieldCheck,
  Wind,
  Heart,
  Users,
  Calculator,
  Sparkles,
  Star,
  CheckCircle2,
  Copy,
  Flame,
  Zap,
  Image as ImageIcon,
  Navigation,
  ExternalLink,
  Camera,
  MessageSquareQuote
} from 'lucide-react';
import {
  gymInfo,
  contact,
  whatsapp,
  plans,
  hours,
  activities,
  features,
  kidsFeatures,
  kidsGallery,
  gymGallerySlots,
  googleReviewsConfig,
  faqs,
  stats,
  getGymCurrentStatus
} from './data';
import './style.css';

// Redirecionamento seguro para links externos
const openExternal = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const openWa = (msg) => {
  openExternal(whatsapp(msg));
};

// Componente de Badge de Seção
function SectionLabel({ children }) {
  return (
    <span className="eyebrow">
      <span className="dash" />
      {children}
    </span>
  );
}

// Cabeçalho com Navegação e Status Dinâmico
function Header({ status }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Início', href: '#inicio' },
    { label: 'Estrutura', href: '#estrutura' },
    { label: 'Modalidades', href: '#modalidades' },
    { label: 'Espaço Kids', href: '#kids' },
    { label: 'Planos', href: '#planos' },
    { label: 'Avaliações', href: '#avaliacoes' },
    { label: 'Localização', href: '#localizacao' },
    { label: 'Dúvidas', href: '#duvidas' }
  ];

  return (
    <header className="header">
      <div className="header-inner container">
        <a href="#inicio" className="brand" aria-label="HM Academia 01 Página Inicial">
          <span className="brand-mark">HM</span>
          <span className="brand-copy">
            ACADEMIA <b>01</b>
          </span>
        </a>

        {/* Status em tempo real no header */}
        <div className={`live-pill ${status.isOpen ? 'open' : 'closed'}`}>
          <span className="live-dot" />
          <span>{status.text}</span>
        </div>

        <nav className={open ? 'nav active' : 'nav'} aria-label="Navegação principal">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            className="btn btn-small nav-cta-mobile"
            onClick={() => {
              setOpen(false);
              openWa('Olá! Gostaria de agendar uma visita na HM Academia 01.');
            }}
          >
            FALE CONOSCO <MessageCircle size={16} />
          </button>
        </nav>

        <div className="header-actions">
          <button
            className="btn btn-small nav-cta"
            onClick={() => openWa('Olá! Gostaria de falar com a recepção da HM Academia 01.')}
          >
            FALE COM A HM <ArrowUpRight size={16} />
          </button>
          <button
            className="menu"
            aria-label={open ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
}

// Calculadora Interativa de IMC e Recomendação
function BmiCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('hipertrofia');
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    let h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0) return;

    if (h > 3) {
      h = h / 100;
    }

    const imc = w / (h * h);
    let classification = '';
    let recommendation = '';
    let planSuggest = 'Plano Classic ou Gold';

    if (imc < 18.5) {
      classification = 'Abaixo do peso';
      recommendation = 'Foco em musculação para ganho de massa magra, força e orientação especializada.';
      planSuggest = 'Plano Classic com Musculação e Avaliação Física';
    } else if (imc < 24.9) {
      classification = 'Peso ideal / Saudável';
      recommendation = 'Excelente! Mantenha a consistência combinando musculação com aulas coletivas (FitDance ou Funcional).';
      planSuggest = 'Plano Gold (Acesso a todas as modalidades e poltrona de massagem)';
    } else if (imc < 29.9) {
      classification = 'Sobrepeso leve';
      recommendation = 'Ótimo momento para intensificar treinos cardiorrespiratórios (Jump, Step) aliados à musculação.';
      planSuggest = 'Plano Classic ou Cardio Fit';
    } else {
      classification = 'Obesidade';
      recommendation = 'Recomendamos acompanhamento com instrutor para treinos progressivos de baixo impacto.';
      planSuggest = 'Plano Classic com avaliação física especializada';
    }

    setResult({
      imc: imc.toFixed(1),
      classification,
      recommendation,
      planSuggest
    });
  };

  const handleSendToWa = () => {
    if (!result) return;
    const msg = `Olá! Fiz o teste de IMC no site da HM 01. Meu IMC deu ${result.imc} (${result.classification}) e meu objetivo é ${goal}. Gostaria de saber mais sobre o ${result.planSuggest}!`;
    openWa(msg);
  };

  return (
    <div className="calc-card" id="calculadora">
      <div className="calc-header">
        <div className="calc-badge">
          <Calculator size={18} /> FERRAMENTA DE TREINO
        </div>
        <h3>CALCULADORA DE IMC & PLANO IDEAL</h3>
        <p>Descubra seu Índice de Massa Corporal e receba uma recomendação sob medida para a sua meta.</p>
      </div>

      <form onSubmit={calculate} className="calc-form">
        <div className="calc-row">
          <div className="calc-field">
            <label htmlFor="peso">Seu Peso (kg)</label>
            <input
              id="peso"
              type="number"
              step="0.1"
              placeholder="Ex: 75.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <div className="calc-field">
            <label htmlFor="altura">Sua Altura (cm ou m)</label>
            <input
              id="altura"
              type="number"
              step="0.01"
              placeholder="Ex: 175 ou 1.75"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="calc-field">
          <label>Qual o seu objetivo principal?</label>
          <div className="goal-options">
            <button
              type="button"
              className={`goal-btn ${goal === 'emagrecimento' ? 'active' : ''}`}
              onClick={() => setGoal('emagrecimento')}
            >
              <Flame size={16} /> Emagrecimento
            </button>
            <button
              type="button"
              className={`goal-btn ${goal === 'hipertrofia' ? 'active' : ''}`}
              onClick={() => setGoal('hipertrofia')}
            >
              <Dumbbell size={16} /> Ganho de Massa
            </button>
            <button
              type="button"
              className={`goal-btn ${goal === 'saude' ? 'active' : ''}`}
              onClick={() => setGoal('saude')}
            >
              <Zap size={16} /> Saúde & Energia
            </button>
          </div>
        </div>

        <button type="submit" className="btn calc-submit">
          CALCULAR MEU RESULTADO <ArrowRight size={17} />
        </button>
      </form>

      {result && (
        <div className="calc-result animate-fade">
          <div className="result-metric">
            <span className="result-label">Seu IMC Calculado</span>
            <span className="result-value">{result.imc}</span>
            <span className="result-class">{result.classification}</span>
          </div>
          <div className="result-body">
            <strong>Recomendação Personalizada:</strong>
            <p>{result.recommendation}</p>
            <div className="result-plan">
              <span>Plano Sugerido:</span>
              <b>{result.planSuggest}</b>
            </div>
            <button className="btn btn-wa-result" onClick={handleSendToWa}>
              FALAR COM A RECEPÇÃO COM MEU RESULTADO <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Modal de Galeria para Imagens da Academia
function GalleryModal({ photo, onClose }) {
  if (!photo) return null;
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar visualização">
          <X size={24} />
        </button>
        <img src={photo.img} alt={photo.title} className="modal-img" />
        <div className="modal-info">
          <h4>{photo.title}</h4>
          <p>{photo.desc}</p>
        </div>
      </div>
    </div>
  );
}

// Seção de Avaliações Conectada ao Google Maps
function GoogleReviewsSection() {
  return (
    <section className="section dark-section" id="avaliacoes">
      <div className="container">
        <div className="section-top">
          <div>
            <SectionLabel>PROVA SOCIAL & CREDIBILIDADE</SectionLabel>
            <h2>
              AVALIAÇÕES NO <em>GOOGLE.</em>
            </h2>
          </div>
          <p>
            A opinião dos nossos alunos é nossa maior motivação. Conheça a experiência real de quem treina diariamente na HM Academia 01 no Benedito Bentes I.
          </p>
        </div>

        <div className="google-card-hero">
          <div className="google-badge-top">
            <div className="google-logo-pill">
              <span className="google-letter g-blue">G</span>
              <span className="google-letter g-red">o</span>
              <span className="google-letter g-yellow">o</span>
              <span className="google-letter g-blue">g</span>
              <span className="google-letter g-green">l</span>
              <span className="google-letter g-red">e</span>
              <span className="google-tag">Maps Verified</span>
            </div>
            <span className="verified-status">
              <CheckCircle2 size={16} /> Perfil Oficial no Google Meu Negócio
            </span>
          </div>

          <div className="google-card-body">
            <div className="google-callout">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} fill="#f5c921" color="#f5c921" />
                ))}
              </div>
              <h3>HM Academia 01 no Google</h3>
              <p>
                Acesse o perfil oficial da unidade para conferir a pontuação atualizada, comentários públicos e fotografias enviadas por frequentadores da academia.
              </p>
              <div className="google-buttons-row">
                <a
                  href={gymInfo.googleMapsShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-google"
                >
                  <ExternalLink size={17} /> VER AVALIAÇÕES NO GOOGLE
                </a>
                <a
                  href={gymInfo.googleMapsShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  <Star size={16} /> DEIXE SUA AVALIAÇÃO
                </a>
              </div>
            </div>

            <div className="google-highlights-list">
              <div className="google-highlight-item">
                <MessageSquareQuote size={24} className="hl-icon" />
                <div>
                  <strong>Opiniões 100% Reais</strong>
                  <span>Somente depoimentos autênticos postados diretamente no Google Maps. Sem comentários fabricados.</span>
                </div>
              </div>
              <div className="google-highlight-item">
                <Camera size={24} className="hl-icon" />
                <div>
                  <strong>Fotos da Comunidade</strong>
                  <span>Veja registros de treinos e da estrutura compartilhados por alunos.</span>
                </div>
              </div>
              <div className="google-highlight-item">
                <ShieldCheck size={24} className="hl-icon" />
                <div>
                  <strong>Local Verificado</strong>
                  <span>Ponto de referência ativo no Benedito Bentes I, com rotas acessíveis.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Seção de Localização com Mapa Incorporado
function LocationSection({ status, onCopyAddress, copiedAddress }) {
  return (
    <section className="section container" id="localizacao">
      <SectionLabel>LOCALIZAÇÃO & HORÁRIOS</SectionLabel>
      <h2>
        ONDE ESTAMOS<br />
        <em>BENEDITO BENTES I.</em>
      </h2>

      <div className="location-grid">
        {/* Painel do Mapa Interativo Incorporado */}
        <div className="map-wrapper">
          <iframe
            title="Localização da HM Academia 01 no mapa"
            src={gymInfo.mapEmbedUrl}
            className="map-iframe"
            loading="lazy"
            allowFullScreen
          />
          <div className="map-overlay-footer">
            <span className="map-coords-label">
              <MapPin size={15} /> {gymInfo.street}, {gymInfo.neighborhood} • Maceió - AL
            </span>
            <a
              href={gymInfo.googleMapsDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              className="map-directions-btn"
            >
              <Navigation size={15} /> COMO CHEGAR NO GOOGLE MAPS
            </a>
          </div>
        </div>

        {/* Informações de Endereço, Rotas e Horários */}
        <div className="location-details">
          <div className="loc-card address-box">
            <div className="loc-icon">
              <MapPin size={26} />
            </div>
            <div>
              <span className="loc-eyebrow">ENDEREÇO OFICIAL</span>
              <h3>{gymInfo.name}</h3>
              <p className="full-address">{gymInfo.address}</p>

              <div className="loc-actions">
                <a
                  href={gymInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-small"
                >
                  <Navigation size={15} /> COMO CHEGAR (ROTAS)
                </a>
                <a
                  href={gymInfo.googleMapsShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline btn-small"
                >
                  <ExternalLink size={15} /> ABRIR NO GOOGLE MAPS
                </a>
                <button
                  onClick={onCopyAddress}
                  className="btn-copy-address"
                  title="Copiar endereço completo"
                >
                  <Copy size={15} /> {copiedAddress ? 'Endereço copiado!' : 'Copiar endereço'}
                </button>
              </div>
            </div>
          </div>

          <div className="loc-card hours-box">
            <div className="hours-head">
              <div className="loc-icon">
                <Clock size={26} />
              </div>
              <div>
                <span className="loc-eyebrow">GRADE DE FUNCIONAMENTO</span>
                <h4>Horários da Unidade 01</h4>
              </div>
              <span className={`status-badge-mini ${status.badgeClass}`}>
                {status.text}
              </span>
            </div>

            <div className="hours-table">
              {hours.map((h) => (
                <div className="hour-item" key={h.day}>
                  <span>{h.day}</span>
                  <strong>{h.hours}</strong>
                </div>
              ))}
            </div>
            <p className="hours-sub">* Atendimento de segunda a sexta das 05h da manhã até a meia-noite.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente Principal da Aplicação
function App() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [activeFaq, setActiveFaq] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [gymStatus, setGymStatus] = useState(getGymCurrentStatus());

  useEffect(() => {
    const timer = setInterval(() => {
      setGymStatus(getGymCurrentStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(gymInfo.address).then(() => {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    });
  };

  const filteredPlans = plans.filter((p) => {
    if (selectedCategory === 'todos') return true;
    if (selectedCategory === 'destaques') return p.category === 'destaque';
    if (selectedCategory === 'horarios') return p.category === 'horarios';
    return true;
  });

  return (
    <>
      <Header status={gymStatus} />

      <main>
        {/* HERO SECTION */}
        <section className="hero" id="inicio">
          <div className="hero-photo" />
          <div className="hero-grid" />
          <div className="container hero-content">
            <div className="hero-status-tag">
              <span className={`status-pill ${gymStatus.badgeClass}`}>
                <span className="live-dot" /> {gymStatus.text} • {gymStatus.subtext}
              </span>
            </div>

            <SectionLabel>BEM-VINDO À HM ACADEMIA 01</SectionLabel>
            <h1>
              A CASA<br />
              DO SEU <em>CORPO.</em>
            </h1>
            <p>
              Seu próximo nível de evolução física e saúde no Benedito Bentes I.
              Estrutura climatizada, modalidades completas, Espaço Kids exclusivo e horário estendido das 05h às 00h para se adequar à sua vida.
            </p>

            <div className="hero-actions">
              <a className="btn" href="#planos">
                CONHECER PLANOS & PREÇOS <ArrowRight size={18} />
              </a>
              <a
                className="btn-outline"
                href={gymInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Navigation size={17} /> COMO CHEGAR (MAPS)
              </a>
              <button
                className="btn-outline"
                onClick={() => openWa('Olá! Gostaria de agendar uma aula experimental na HM Academia 01.')}
              >
                AULA EXPERIMENTAL <ArrowUpRight size={17} />
              </button>
            </div>

            {/* Grid de Estatísticas Rápidas */}
            <div className="hero-stats">
              {stats.map((s) => (
                <div className="stat-card" key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="hero-foot">
              <span>
                <MapPin size={17} /> {gymInfo.street.toUpperCase()} • BENEDITO BENTES I
              </span>
              <span>
                <Clock size={17} /> SEG A SEX: 05H ÀS 00H • SÁB E DOM
              </span>
            </div>
          </div>
          <div className="hero-side">SUPERE SEUS LIMITES • HM 01</div>
        </section>

        {/* INFINITE MARQUEE TICKER */}
        <section className="ticker" aria-hidden="true">
          <div className="ticker-track">
            <span>DISCIPLINA ✳ EVOLUÇÃO ✳ SUPERAÇÃO ✳ MUSCULAÇÃO ✳ FITDANCE ✳ MUAY THAI ✳ ESPAÇO KIDS ✳ HORÁRIO AMPLIADO ✳ HM 01 ✳ AV. PRATAGY 270 ✳</span>
            <span>DISCIPLINA ✳ EVOLUÇÃO ✳ SUPERAÇÃO ✳ MUSCULAÇÃO ✳ FITDANCE ✳ MUAY THAI ✳ ESPAÇO KIDS ✳ HORÁRIO AMPLIADO ✳ HM 01 ✳ AV. PRATAGY 270 ✳</span>
          </div>
        </section>

        {/* ESTRUTURA E DIFERENCIAIS */}
        <section className="section container" id="estrutura">
          <div className="section-top">
            <div>
              <SectionLabel>CONHEÇA A HM 01</SectionLabel>
              <h2>
                ESTRUTURA PARA<br />
                <em>IR ALÉM.</em>
              </h2>
            </div>
            <p>
              Ambiente planejado para você focar no resultado com conforto, segurança e equipamentos de qualidade no coração do Benedito Bentes I.
            </p>
          </div>

          <div className="features">
            {features.map((feat) => {
              const IconComp =
                feat.icon === 'Dumbbell'
                  ? Dumbbell
                  : feat.icon === 'Wind'
                  ? Wind
                  : feat.icon === 'Users'
                  ? Users
                  : feat.icon === 'ShieldCheck'
                  ? ShieldCheck
                  : feat.icon === 'Clock'
                  ? Clock
                  : Heart;

              return (
                <article key={feat.title} className="feature-card">
                  <div className="feature-icon-wrapper">
                    <IconComp size={28} />
                  </div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </article>
              );
            })}
          </div>
          <p className="fine">
            * Informações extraídas dos canais oficiais e materiais cadastrais da HM Academia 01; sujeitas a atualizações da administração.
          </p>
        </section>

        {/* MODALIDADES COLETIVAS */}
        <section className="section dark-section" id="modalidades">
          <div className="container">
            <div className="section-top">
              <div>
                <SectionLabel>MOVIMENTO É EVOLUÇÃO</SectionLabel>
                <h2>
                  ENCONTRE SEU <em>RITMO.</em>
                </h2>
              </div>
              <p className="section-sub">
                Treinos dinâmicos para hipertrofia, queima calórica e condicionamento geral com instrutores dedicados.
              </p>
            </div>

            <div className="activity-grid">
              {activities.map((a, i) => (
                <div className="activity-card" key={a.name}>
                  <div className="activity-top">
                    <span className="activity-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="activity-badge">{a.tag}</span>
                  </div>
                  <strong>{a.name}</strong>
                  <p className="activity-desc">{a.desc}</p>
                  <div className="activity-bottom">
                    <span className="activity-intensity">
                      <Sparkles size={14} /> {a.intensity}
                    </span>
                    <button
                      className="activity-action"
                      title="Consultar horários desta modalidade"
                      onClick={() =>
                        openWa(`Olá! Gostaria de consultar os horários das aulas de ${a.name} na HM Academia 01.`)
                      }
                    >
                      <span>Consultar horários</span>
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="activity-cta-bar">
              <div>
                <strong>Deseja experimentar uma aula coletiva gratuita?</strong>
                <p>Venha sentir a energia dos nossos treinos e conhecer nossos professores.</p>
              </div>
              <button
                className="btn btn-outline"
                onClick={() =>
                  openWa('Olá! Gostaria de consultar a grade semanal completa de aulas da HM Academia 01.')
                }
              >
                CONSULTAR GRADE COMPLETA <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* ESPAÇO KIDS EM DESTAQUE & GALERIA REAL */}
        <section className="kids" id="kids">
          <div className="kids-media">
            <div className="video-container">
              <video
                controls
                playsInline
                preload="metadata"
                poster="/assets/hmframe03.jpg"
              >
                <source src="/assets/espaco-kids.mp4" type="video/mp4" />
                Seu navegador não suporta reprodução de vídeo.
              </video>
              <div className="video-caption">
                <span>Vídeo Oficial gravado no Espaço Kids da HM Academia 01</span>
              </div>
            </div>

            {/* Mini Galeria de Fotos Reais da Unidade */}
            <div className="kids-thumb-grid">
              {kidsGallery.map((photo) => (
                <button
                  key={photo.img}
                  className="kids-thumb-btn"
                  onClick={() => setSelectedPhoto(photo)}
                  title={`Ver foto: ${photo.title}`}
                >
                  <img src={photo.img} alt={photo.title} />
                  <span className="thumb-hover">
                    <ImageIcon size={16} /> Ver
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="kids-content">
            <SectionLabel>DIFERENCIAL EXCLUSIVO PARA OS PAIS</SectionLabel>
            <h2>
              ESPAÇO<br />
              <em>KIDS.</em>
            </h2>
            <p>
              Você não precisa faltar ao treino por não ter com quem deixar seu filho. A HM Academia 01 estruturou um ambiente lúdico, colorido e com tatame acolchoado especialmente para acomodar os pequenos com comodidade.
            </p>

            <ul className="kids-list">
              {kidsFeatures.map((item) => (
                <li key={item.title}>
                  <CheckCircle2 size={19} className="check-icon" />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="kids-actions">
              <button
                className="btn kids-btn"
                onClick={() =>
                  openWa('Olá! Gostaria de saber os horários, regras e como funciona o Espaço Kids da HM Academia 01.')
                }
              >
                SAIBA MAIS SOBRE O ESPAÇO KIDS <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* PLANOS E PREÇOS (VALORES ORIGINAIS PRESERVADOS) */}
        <section className="section container" id="planos">
          <div className="section-top">
            <div>
              <SectionLabel>SEU OBJETIVO, SEU PLANO</SectionLabel>
              <h2>
                ESCOLHA SUA<br />
                <em>PRÓXIMA FASE.</em>
              </h2>
            </div>
            <p>
              Planos transparentes e acessíveis pensados para diferentes rotinas. Escolha a opção ideal e venha treinar conosco.
            </p>
          </div>

          <div className="notice">
            <span className="notice-dot" />
            <div>
              <strong>CONDIÇÕES COMERCIAIS:</strong>
              <span>
                Valores oficiais extraídos da tabela comercial vigente da HM 01. Matrículas e confirmações de planos realizadas na recepção da Av. Pratagy, 270.
              </span>
            </div>
          </div>

          {/* Filtros de Categorias de Planos */}
          <div className="plan-filter-tabs">
            <button
              className={`plan-tab ${selectedCategory === 'todos' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('todos')}
            >
              Todos os Planos ({plans.length})
            </button>
            <button
              className={`plan-tab ${selectedCategory === 'destaques' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('destaques')}
            >
              Principais & Populares
            </button>
            <button
              className={`plan-tab ${selectedCategory === 'horarios' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('horarios')}
            >
              Horários Especiais & Econômicos
            </button>
          </div>

          <div className="plan-grid">
            {filteredPlans.map((p) => (
              <article
                className={`plan-card ${p.popular ? 'featured' : ''}`}
                key={p.name}
              >
                {p.popular && <div className="featured-ribbon">MAIS ESCOLHIDO</div>}

                <div className="plan-head">
                  <span className="plan-tag-sub">{p.tag}</span>
                  <span className="plan-badge-pill">{p.badge}</span>
                </div>

                <h3>{p.name}</h3>
                <p className="plan-desc">{p.description}</p>

                <div className="price-wrap">
                  <div className="price">{p.price}</div>
                  <span className="price-unit">{p.unit}</span>
                </div>

                <div className="plan-divider" />

                <div className="benefits-list">
                  {p.details.map((d) => (
                    <div className="benefit" key={d}>
                      <Check size={16} />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="plan-cta-btn"
                  onClick={() =>
                    openWa(`Olá! Gostaria de consultar e me matricular no plano ${p.name} da HM Academia 01.`)
                  }
                >
                  <span>ESCOLHER ESTE PLANO</span>
                  <ArrowUpRight size={17} />
                </button>
              </article>
            ))}
          </div>

          {/* DIFERENCIAL POLTRONA DE MASSAGEM */}
          <div className="massage-banner">
            <div className="massage-icon">
              <Heart size={28} />
            </div>
            <div className="massage-text">
              <div className="massage-tag">DIFERENCIAL EXCLUSIVO</div>
              <strong>POLTRONA DE MASSAGEM PARA RECUPERAÇÃO MUSCULAR</strong>
              <p>
                Alívio da fadiga e relaxamento muscular após o treino. Condição promocional divulgada a partir de R$ 4,99. Consulte os dias e a disponibilidade na recepção.
              </p>
            </div>
            <button
              className="massage-btn"
              onClick={() =>
                openWa('Olá! Gostaria de saber mais sobre a poltrona de massagem na HM Academia 01.')
              }
            >
              CONSULTAR DISPONIBILIDADE <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

        {/* AVALIAÇÕES GOOGLE (SEÇÃO DO REQUISITO 2) */}
        <GoogleReviewsSection />

        {/* LOCALIZAÇÃO E MAPA INTERATIVO (SEÇÃO DO REQUISITO 2) */}
        <LocationSection
          status={gymStatus}
          onCopyAddress={handleCopyAddress}
          copiedAddress={copiedAddress}
        />

        {/* CALCULADORA DE IMC INTERATIVA */}
        <section className="section dark-section">
          <div className="container">
            <BmiCalculator />
          </div>
        </section>

        {/* PERGUNTAS FREQUENTES (FAQ) */}
        <section className="section container" id="duvidas">
          <div className="section-top">
            <div>
              <SectionLabel>TIRE SUAS DÚVIDAS</SectionLabel>
              <h2>
                PERGUNTAS <em>FREQUENTES.</em>
              </h2>
            </div>
            <p>
              Respostas claras sobre horários, pagamentos, aulas e o Espaço Kids da HM Academia 01.
            </p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={faq.q}
                  className={`faq-item ${isOpen ? 'active' : ''}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`faq-arrow ${isOpen ? 'rotate' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="faq-bottom-help">
            <p>Ainda tem alguma dúvida sobre os planos ou sobre a unidade?</p>
            <button
              className="btn btn-small"
              onClick={() =>
                openWa('Olá! Tenho uma dúvida sobre a HM Academia 01 que não encontrei no site.')
              }
            >
              FALAR NO WHATSAPP COM A RECEPÇÃO <MessageCircle size={16} />
            </button>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="bottom-cta">
          <div className="container bottom-cta-inner">
            <span className="bottom-sub">HM ACADEMIA 01 • AV. PRATAGY, 270</span>
            <h2>
              O PRÓXIMO PASSO<br />
              <em>É SEU.</em>
            </h2>
            <p className="bottom-desc">
              Comece agora sua transformação física na academia mais completa e acolhedora do Benedito Bentes I.
            </p>
            <div className="bottom-buttons-row">
              <button
                className="btn btn-dark-large"
                onClick={() => openWa('Olá! Quero dar o próximo passo e me matricular na HM Academia 01!')}
              >
                QUERO ME MATRICULAR AGORA <ArrowRight size={20} />
              </button>
              <a
                href={gymInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-dark"
              >
                <Navigation size={18} /> COMO CHEGAR NA ACADEMIA
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="container footer-content">
          <div className="footer-top">
            <a href="#inicio" className="brand">
              <span className="brand-mark">HM</span>
              <span className="brand-copy">
                ACADEMIA <b>01</b>
              </span>
            </a>
            <div className="footer-links">
              <a href="#inicio">Início</a>
              <a href="#estrutura">Estrutura</a>
              <a href="#modalidades">Modalidades</a>
              <a href="#kids">Espaço Kids</a>
              <a href="#planos">Planos</a>
              <a href="#avaliacoes">Avaliações</a>
              <a href="#localizacao">Localização</a>
              <a href="#duvidas">Dúvidas</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              <b>HM Academia 01</b> ({gymInfo.corporateName}) — {gymInfo.address}
              <br />
              Telefone / WhatsApp: {gymInfo.displayPhone} • Instagram: {gymInfo.instagramHandle}
            </p>
            <a href="#inicio" className="back-to-top">
              VOLTAR AO TOPO ↑
            </a>
          </div>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <div className="floating-wa-container">
        <span className="floating-wa-tooltip">Dúvidas? Fale conosco!</span>
        <a
          className="floating-wa"
          href={whatsapp('Olá! Estava no site da HM Academia 01 e gostaria de tirar uma dúvida.')}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar no WhatsApp da HM Academia 01"
        >
          <MessageCircle size={28} />
        </a>
      </div>

      {/* MODAL DE IMAGEM DA GALERIA */}
      <GalleryModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
