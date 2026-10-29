// Conteúdo e contatos centralizados.
// ⚠️ Substitua os campos marcados com TODO pelos dados reais da clínica antes de publicar.

export const site = {
  name: 'Aurion Estética Avançada',
  url: 'https://www.aurionestetica.com.br', // TODO: domínio definitivo
  whatsapp: '5511900000000', // TODO: número com DDI + DDD, apenas dígitos
  phoneLabel: '(11) 90000-0000', // TODO
  email: 'contato@aurionestetica.com.br', // TODO
  instagram: 'https://www.instagram.com/aurionestetica', // TODO: perfil oficial
  instagramLabel: '@aurionestetica', // TODO
  address: {
    street: 'Rua Exemplo, 000 — Sala 00', // TODO
    district: 'Bairro',
    city: 'São Paulo',
    region: 'SP',
    postalCode: '00000-000',
    mapsUrl: 'https://maps.google.com/?q=Aurion+Est%C3%A9tica+Avan%C3%A7ada', // TODO
  },
  hours: [
    { days: 'Segunda a sexta', time: '9h às 20h' }, // TODO
    { days: 'Sábado', time: '9h às 14h' },
  ],
  technicalLead: 'Responsável técnico: Nome Sobrenome — Registro 00000', // TODO
}

export const defaultMessage =
  'Olá, Aurion! Gostaria de agendar uma avaliação e conhecer os tratamentos indicados para mim.'

export const nav = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#tratamentos', label: 'Tratamentos' },
  { href: '#filosofia', label: 'Filosofia' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#agendamento', label: 'Agendamento' },
]

export const treatments = [
  {
    id: 'firmeza',
    title: 'Firmeza e contorno',
    text: 'Tecnologias que estimulam o colágeno e devolvem sustentação ao rosto, com melhora gradual da flacidez e um contorno mais definido.',
    tags: ['Radiofrequência', 'Ultrassom microfocado', 'Bioestimuladores'],
    media: { video: 'firmeza', poster: 'firmeza' },
    alt: 'Profissional da Aurion aplicando tecnologia de firmeza no rosto de uma paciente',
    layout: 'a',
  },
  {
    id: 'labios',
    title: 'Lábios e harmonização',
    text: 'Hidratação e preenchimento com ácido hialurônico, respeitando as proporções do rosto e a expressão que é só sua.',
    tags: ['Ácido hialurônico', 'Hidratação labial', 'Harmonização facial'],
    media: { before: 'labiosAntes', after: 'labiosDepois' },
    alt: 'Lábios de paciente antes e depois do tratamento',
    layout: 'b',
  },
  {
    id: 'textura',
    title: 'Textura e renovação',
    text: 'Protocolos de renovação celular para poros, marcas de acne e pele áspera, conduzidos em sessões planejadas para a sua pele.',
    tags: ['Microagulhamento', 'Peelings', 'Drug delivery'],
    media: { video: 'textura', poster: 'textura' },
    alt: 'Microagulhamento facial sendo realizado em ambiente de luz suave',
    layout: 'c',
  },
  {
    id: 'luminosidade',
    title: 'Pele e luminosidade',
    text: 'Limpeza profunda, fototerapia com LED e ativos de alta performance para uma pele hidratada, uniforme e luminosa.',
    tags: ['LED terapêutico', 'Limpeza de pele', 'Skincare clínico'],
    media: { video: 'luz', poster: 'luz' },
    alt: 'Paciente relaxando durante sessão de LED terapêutico',
    layout: 'd',
  },
  {
    id: 'corpo',
    title: 'Corpo e bem-estar',
    text: 'Drenagem e massagens terapêuticas que aliviam tensões, reduzem o inchaço e devolvem a sensação de leveza.',
    tags: ['Drenagem linfática', 'Massagem modeladora', 'Relaxamento'],
    media: { video: 'corpo', poster: 'corpo' },
    alt: 'Sequência de massagem corporal com as palavras tensão, sobrecarga, pausa e leveza',
    layout: 'e',
  },
]

export const differentials = [
  {
    title: 'Metodologia própria',
    text: 'Nada é decidido no impulso. Cada tratamento segue um percurso claro, do primeiro encontro à reavaliação dos resultados.',
    steps: ['Escuta', 'Análise da pele', 'Plano de cuidado', 'Acompanhamento'],
  },
  {
    title: 'Equipe multidisciplinar',
    text: 'Profissionais de diferentes formações discutem cada caso e unem estética, saúde e bem-estar em uma visão integrada.',
  },
  {
    title: 'Protocolos individualizados',
    text: 'Técnicas, intensidades e intervalos ajustados à sua pele, à sua rotina e ao momento que você vive.',
  },
  {
    title: 'Tecnologia com critério',
    text: 'Equipamentos e ativos escolhidos por evidência científica e segurança, nunca por tendência.',
  },
]

export const principles = [
  'Menos excesso, mais critério.',
  'A sua pele, no seu tempo.',
  'Beleza que acompanha cada fase.',
]

export const experience = [
  {
    title: 'Chegada',
    text: 'Um ambiente silencioso, de luz quente e texturas naturais, pensado para você desacelerar.',
    image: 'linho',
    alt: 'Tecido de linho em tom nude',
  },
  {
    title: 'Escuta',
    text: 'Uma conversa sem pressa sobre sua pele, sua rotina e aquilo que você deseja preservar.',
    image: 'retrato',
    alt: 'Mulher madura tocando o rosto com delicadeza',
  },
  {
    title: 'Ritual',
    text: 'Protocolos conduzidos com técnica, conforto e atenção a cada detalhe do seu bem-estar.',
    image: 'gota',
    alt: 'Gota de sérum caindo de um conta-gotas',
  },
  {
    title: 'Continuidade',
    text: 'Acompanhamento próximo e orientações de cuidado em casa, para que o resultado permaneça.',
    image: 'pescoco',
    alt: 'Close-up de pescoço e mão com pele natural',
  },
]

export const interests = [
  'Avaliação completa',
  'Firmeza e contorno',
  'Lábios e harmonização',
  'Textura e renovação',
  'Pele e luminosidade',
  'Corpo e bem-estar',
]
