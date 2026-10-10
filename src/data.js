// Informações comerciais e verificadas da HM Academia 01 (Unidade Benedito Bentes I, Maceió - AL)

export const gymInfo = {
  name: 'HM Academia 01',
  corporateName: 'HM Academia LTDA',
  shortName: 'HM 01',
  unit: 'Unidade 01 — Benedito Bentes I',
  address: 'Av. Pratagy, 270 - Benedito Bentes I, Maceió - AL, 57084-090',
  street: 'Av. Pratagy, 270',
  neighborhood: 'Benedito Bentes I',
  city: 'Maceió - AL',
  cep: '57084-090',
  coordinates: {
    lat: -9.54597,
    lng: -35.72339
  },
  phone: '5582999567523',
  displayPhone: '(82) 99956-7523',
  instagram: 'https://www.instagram.com/hmacademia01/',
  instagramHandle: '@hmacademia01',
  // Link oficial de compartilhamento no Google Maps fornecido
  googleMapsShareUrl: 'https://share.google/4jwQTCVl8I93gCWpB',
  // Link direto para rotas e navegação "Como chegar" no Google Maps
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('HM Academia Av. Pratagy, 270 Benedito Bentes Maceió AL'),
  // Iframe de mapa interativo (OpenStreetMap centrado nas coordenadas verificadas da Av. Pratagy, 270)
  mapEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-35.730%2C-9.552%2C-35.716%2C-9.540&layer=mapnik&marker=-9.54597%2C-35.72339'
};

export const contact = {
  phone: gymInfo.phone,
  displayPhone: gymInfo.displayPhone,
  address: gymInfo.address,
  instagram: gymInfo.instagram,
  instagramHandle: gymInfo.instagramHandle,
  mapsUrl: gymInfo.googleMapsShareUrl,
  directionsUrl: gymInfo.googleMapsDirectionsUrl
};

export const whatsapp = (message = 'Olá! Gostaria de saber mais sobre a HM Academia 01.') =>
  `https://wa.me/${gymInfo.phone}?text=${encodeURIComponent(message)}`;

export const hours = [
  { day: 'Segunda a sexta', hours: '05h às 00h', openHour: 5, closeHour: 24 },
  { day: 'Sábado', hours: '07h às 22h', openHour: 7, closeHour: 22 },
  { day: 'Domingo', hours: '08h às 18h', openHour: 8, closeHour: 18 }
];

// Cálculo do status de funcionamento em tempo real
export function getGymCurrentStatus() {
  const now = new Date();
  const day = now.getDay(); // 0: Dom, 1: Seg, ..., 6: Sab
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour + minute / 60;

  let schedule;
  if (day >= 1 && day <= 5) {
    schedule = hours[0];
  } else if (day === 6) {
    schedule = hours[1];
  } else {
    schedule = hours[2];
  }

  const isOpen = currentTime >= schedule.openHour && currentTime < schedule.closeHour;

  if (isOpen) {
    const closeDisplay = schedule.closeHour === 24 ? '00h' : `${schedule.closeHour}h`;
    return {
      isOpen: true,
      text: 'Aberto agora',
      subtext: `Fecha hoje às ${closeDisplay}`,
      badgeClass: 'status-open'
    };
  } else {
    return {
      isOpen: false,
      text: 'Fechado no momento',
      subtext: 'Consulte horários para seu próximo treino',
      badgeClass: 'status-closed'
    };
  }
}

export const stats = [
  { value: '+8', label: 'Modalidades Coletivas' },
  { value: '19h/dia', label: 'Horário Estendido (05h às 00h)' },
  { value: 'Kids', label: 'Espaço Infantil Exclusivo' },
  { value: '100%', label: 'Ambiente Climatizado' }
];

// Depoimentos e Avaliações do Google
// Nota: Os comentários abaixo podem ser preenchidos diretamente a partir do painel do Google Meu Negócio
// quando disponíveis. Mantido sem conteúdo artificial para preservar a integridade e credibilidade.
export const googleReviewsConfig = {
  profileUrl: gymInfo.googleMapsShareUrl,
  writeReviewUrl: gymInfo.googleMapsShareUrl,
  // Caso a nota média seja confirmada no Google Maps (ex: 4.8), preencha aqui
  rating: null, // null indica que os dados devem ser conferidos diretamente no link oficial
  reviewsCount: null,
  // Comentários públicos verificados da página do Google
  reviews: []
};

// Planos e valores extraídos dos materiais comerciais enviados (Valores preservados exatamente)
export const plans = [
  {
    id: 'gold',
    name: 'Gold',
    price: 'R$ 110,00',
    unit: '/mês*',
    tag: 'Experiência Completa',
    badge: 'MAIS ESCOLHIDO',
    category: 'destaque',
    popular: true,
    description: 'Para quem busca o pacote definitivo de benefícios, suporte e flexibilidade total.',
    details: [
      'Acesso livre a qualquer horário e unidade',
      'Participação em todas as modalidades coletivas',
      'Poltrona de massagem inclusa para relaxamento',
      '4 avaliações físicas com treinos especializados',
      '15% de desconto especial em suplementos'
    ]
  },
  {
    id: 'classic',
    name: 'Classic',
    price: 'R$ 100,00',
    unit: '/mês*',
    tag: 'Versatilidade',
    badge: 'RECOMENDADO',
    category: 'destaque',
    popular: false,
    description: 'Excelente custo-benefício para quem quer treinar sem limites de horário.',
    details: [
      'Sem restrição de horário para musculação',
      'Participação em 2 modalidades coletivas à escolha',
      '1 avaliação física completa com treino especializado',
      'Acompanhamento de instrutores na sala'
    ]
  },
  {
    id: 'familia',
    name: 'Família',
    price: 'R$ 90,00',
    unit: '/por pessoa*',
    tag: 'Economia em Grupo',
    badge: 'A PARTIR DE 2 PESSOAS',
    category: 'destaque',
    popular: false,
    description: 'Treine acompanhado e economize! Válido a partir de duas pessoas.',
    details: [
      'Valor reduzido por integrante (a partir de 2)',
      'Acesso à musculação e área de cardio',
      'Treinem juntos no mesmo plano com custo reduzido',
      'Consulte regras na recepção'
    ]
  },
  {
    id: 'noturno',
    name: 'Noturno Batman',
    price: 'R$ 69,99',
    unit: '/mês*',
    tag: 'Treino da Madrugada',
    badge: 'HORÁRIO DIFERENCIADO',
    category: 'horarios',
    popular: false,
    description: 'Plano ideal para quem tem o dia corrido e rende melhor no silêncio da noite.',
    details: [
      'Acesso exclusivo das 21h00 às 00h00',
      'Academia mais vazia e sem filas para aparelhos',
      'Equipamentos de musculação e aeróbico completos',
      'Economia expressiva na mensalidade'
    ]
  },
  {
    id: 'trimestral',
    name: 'Trimestral Off-Peak',
    price: 'R$ 209,99',
    unit: '/trimestre*',
    tag: 'Horário Alternativo',
    badge: 'ECONOMIA',
    category: 'horarios',
    popular: false,
    description: 'Treine nos horários mais tranquilos do dia das 10h às 15h.',
    details: [
      'Treino das 10h00 às 15h00',
      'Ambiente super tranquilo e climatizado',
      'Economia no compromisso trimestral',
      'Ideal para quem tem horário flexível'
    ]
  },
  {
    id: 'treino-extra',
    name: 'Treino Extra',
    price: 'R$ 59,99',
    unit: '/mês*',
    tag: 'Fins de Semana',
    badge: 'SÁB & DOM',
    category: 'horarios',
    popular: false,
    description: 'Para quem quer manter a disciplina no sábado e domingo.',
    details: [
      'Acesso livre aos sábados (07h às 22h)',
      'Acesso livre aos domingos (08h às 18h)',
      'Horário livre dentro do funcionamento do fim de semana',
      'Excelente complemento para sua rotina'
    ]
  },
  {
    id: 'cardio-fit',
    name: 'Cardio Fit',
    price: 'R$ 49,99',
    unit: '/mês*',
    tag: 'Condicionamento & Queima',
    badge: 'AERÓBICO',
    category: 'horarios',
    popular: false,
    description: 'Focado em quem busca saúde cardiovascular, perda de peso e esteiras/bikes.',
    details: [
      'Acesso total à linha ergométrica (esteiras, elípticos, bikes)',
      'Aulas de cardio e queima calórica inclusas',
      'Ideal para quem busca emagrecimento e resistência',
      'Consulte regras na recepção'
    ]
  }
];

export const activities = [
  {
    name: 'Musculação',
    tag: 'Hipertrofia & Força',
    intensity: 'Intensidade Alta',
    desc: 'Maquinário moderno, pesos livres e anilhas para todos os níveis de condicionamento físico.',
    highlight: 'Treinos individualizados'
  },
  {
    name: 'FitDance',
    tag: 'Ritmo & Diversão',
    intensity: 'Alta Queima',
    desc: 'Coreografias dos hits do momento que combinam queima calórica com pura animação.',
    highlight: 'Até 600 kcal por aula'
  },
  {
    name: 'Muay Thai',
    tag: 'Defesa & Explosão',
    intensity: 'Intensidade Máxima',
    desc: 'Artes marciais dinâmicas que trabalham agilidade, flexibilidade, força e disciplina.',
    highlight: 'Defesa e condicionamento'
  },
  {
    name: 'Jump',
    tag: 'Cardio & Pernas',
    intensity: 'Alta Queima',
    desc: 'Exercícios dinâmicos sobre mini-trampolim com baixo impacto nas articulações.',
    highlight: 'Melhora da circulação'
  },
  {
    name: 'Funcional',
    tag: 'Resistência & Core',
    intensity: 'Intensidade Moderada',
    desc: 'Movimentos naturais do corpo para força, equilíbrio, postura e condicionamento global.',
    highlight: 'Fortalecimento completo'
  },
  {
    name: 'Dança',
    tag: 'Ritmo & Expressão',
    intensity: 'Moderada',
    desc: 'Libere a mente e o corpo ao som de diversos ritmos com turmas super acolhedoras.',
    highlight: 'Anti-stress & Coordenação'
  },
  {
    name: 'Step',
    tag: 'Coordenação & Pernas',
    intensity: 'Intensidade Alta',
    desc: 'Subidas e descidas ritmadas em plataforma que fortalecem membros inferiores.',
    highlight: 'Glúteos e pernas torneadas'
  },
  {
    name: 'GAP',
    tag: 'Glúteos, Abdômen e Pernas',
    intensity: 'Foco Localizado',
    desc: 'Treino concentrado para tônus muscular e definição das regiões mais desejadas.',
    highlight: 'Definição garantida'
  }
];

export const features = [
  {
    title: 'EQUIPAMENTOS MODERNOS',
    desc: 'Aparelhos biomecânicos e linha ergométrica completa com manutenção periódica.',
    icon: 'Dumbbell'
  },
  {
    title: 'AMBIENTE 100% CLIMATIZADO',
    desc: 'Treine no melhor conforto térmico, com ar condicionado potente em toda a sala.',
    icon: 'Wind'
  },
  {
    title: 'ESPAÇO KIDS DEDICADO',
    desc: 'Ambiente lúdico com tatames e brinquedos para você treinar com tranquilidade.',
    icon: 'Users'
  },
  {
    title: 'SEGURANÇA & MONITORAMENTO',
    desc: 'Estrutura monitorada, ambiente seguro e familiar no coração do Benedito Bentes.',
    icon: 'ShieldCheck'
  },
  {
    title: 'HORÁRIO ESTENDIDO (ATÉ 00H)',
    desc: 'Funcionamos das 05h da manhã até a meia-noite de segunda a sexta, além de sábados e domingos.',
    icon: 'Clock'
  },
  {
    title: 'POLTRONA DE MASSAGEM',
    desc: 'Recuperação muscular pós-treino com relaxamento de alto nível no próprio local.',
    icon: 'Heart'
  }
];

export const kidsFeatures = [
  { title: 'Tatame Macio & Seguro', desc: 'Piso amortecido e higienizado para conforto das crianças' },
  { title: 'Mesinha de Atividades & Brinquedos', desc: 'Espaço com cores vibrantes para entreter enquanto você treina' },
  { title: 'Supervisão & Cuidado', desc: 'Orientações claras para garantir a harmonia e o bem-estar' },
  { title: 'Tranquilidade para os Pais', desc: 'Não deixe de treinar por não ter onde deixar seu filho' }
];

// Fotografias reais autorizadas da academia
export const kidsGallery = [
  {
    img: '/assets/hmframe02.jpg',
    title: 'Área Kids Colorida',
    desc: 'Espaço com tatame acolchoado, mesinhas e cadeiras infantis.'
  },
  {
    img: '/assets/hmframe04.jpg',
    title: 'Apresentação do Espaço',
    desc: 'Equipe da HM apresentando as regras e os cuidados da área infantil.'
  },
  {
    img: '/assets/hmframe05.jpg',
    title: 'Colaboração com os Pais',
    desc: 'Ambiente planejado com foco na segurança e supervisão responsável.'
  },
  {
    img: '/assets/hmframe01.jpg',
    title: 'Entrada da Área Kids',
    desc: 'Identificação visual e conforto térmico dentro da HM 01.'
  }
];

// Slots preparados para futuras fotografias da academia (musculação, recepção, etc.)
export const gymGallerySlots = [
  {
    id: 1,
    title: 'Área de Musculação & Pesos Livres',
    category: 'Musculação',
    status: 'slot_preparado',
    note: 'Espaço reservado para fotografias de alta resolução do salão de musculação.'
  },
  {
    id: 2,
    title: 'Linha Ergométrica & Cardio',
    category: 'Cardio',
    status: 'slot_preparado',
    note: 'Espaço reservado para fotos das esteiras, bicicletas e elípticos.'
  },
  {
    id: 3,
    title: 'Sala de Aulas Coletivas',
    category: 'Coletivas',
    status: 'slot_preparado',
    note: 'Espaço reservado para fotos das turmas de FitDance, Jump e Muay Thai.'
  }
];

export const faqs = [
  {
    q: 'Como posso fazer uma aula experimental na HM Academia 01?',
    a: 'Basta entrar em contato com a recepção pelo WhatsApp ou visitar nossa unidade na Av. Pratagy, 270. Nossa equipe irá apresentar toda a estrutura de musculação e modalidades coletivas.'
  },
  {
    q: 'O Espaço Kids tem custo adicional ou limite de idade?',
    a: 'O Espaço Kids foi criado para auxiliar os alunos da HM 01 com filhos pequenos. Regras de acesso, supervisão e eventuais condições podem variar conforme o plano. Fale com a recepção para conferir o regulamento atual.'
  },
  {
    q: 'Quais são as formas de pagamento aceitas?',
    a: 'Aceitamos cartões de crédito, débito, Pix e dinheiro. Alguns planos contam com facilidades de pagamento recorrente que não comprometem o limite do seu cartão.'
  },
  {
    q: 'Como funciona o Plano Noturno Batman?',
    a: 'É um plano promocional exclusivo para quem treina das 21h00 às 00h00 de segunda a sexta. Uma excelente escolha para economizar e treinar em um horário com menor fluxo de pessoas.'
  },
  {
    q: 'Posso trocar de plano ou adicionar dependentes?',
    a: 'Sim! Caso comece no Classic e queira migrar para o Gold (com poltrona de massagem e todas as aulas coletivas) ou trazer alguém para o Plano Família, a recepção faz a atualização na hora.'
  },
  {
    q: 'A academia funciona nos finais de semana e feriados?',
    a: 'Sim! Abrimos aos sábados das 07h às 22h e aos domingos das 08h às 18h na Av. Pratagy, 270. Em feriados especiais divulgamos horários específicos no nosso Instagram @hmacademia01.'
  }
];
