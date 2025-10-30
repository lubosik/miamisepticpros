const fs = require('fs');
const path = require('path');

// Inputs
const BRAND = 'Miami Septic Pros';
const NAP_ADDRESS = '55 SW 9th ST APT 3806, Miami, FL 33130';

// Load services from ops JSON (Claude-created); proceed even if count != 50
const servicesPath = path.join(process.cwd(), 'ops/gbp/services.json');
const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));
const services = servicesData.services || [];

// Define categories mapping heuristically
const categoryMap = [
  { key: 'pumping', match: [/pump/,'pumping'] },
  { key: 'inspections', match: [/inspect/,'inspection'] },
  { key: 'repairs', match: [/repair/,'replacement','baffle','filter'] },
  { key: 'installations', match: [/install/,'upgrade','relocation','riser'] },
  { key: 'drainfield', match: [/drain\s?field/,'percolation'] },
  { key: 'lift-stations', match: [/lift station/] },
  { key: 'grease-traps', match: [/grease trap/] },
  { key: 'portable-toilets', match: [/portable toilet/] },
  { key: 'maintenance', match: [/maintenance|deodorization|cleaning/] },
  { key: 'commercial', match: [/commercial|industrial/] },
];

function slugify(text){
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').trim();
}

function pickCategory(service){
  const s = service.toLowerCase();
  for (const cat of categoryMap){
    if (cat.match.some(m => (m instanceof RegExp ? m.test(s) : s.includes(m)))) return cat.key;
  }
  return 'septic-services';
}

// Cities provided
const cities = [
  { slug: 'miami', name: 'Miami', county: 'Miami-Dade', stateCode: 'fl' },
  { slug: 'coral-gables', name: 'Coral Gables', county: 'Miami-Dade', stateCode: 'fl' },
  { slug: 'kendall', name: 'Kendall', county: 'Miami-Dade', stateCode: 'fl' },
  { slug: 'doral', name: 'Doral', county: 'Miami-Dade', stateCode: 'fl' },
  { slug: 'hialeah', name: 'Hialeah', county: 'Miami-Dade', stateCode: 'fl' },
  { slug: 'aventura', name: 'Aventura', county: 'Miami-Dade', stateCode: 'fl' },
  { slug: 'homestead', name: 'Homestead', county: 'Miami-Dade', stateCode: 'fl' },
];

// Neighborhood areas
const areas = [
  'Brickell','Coral Gables','Little Havana','Wynwood','Coconut Grove','North Beach','Miami Beach','Edgewater','Downtown Miami','Allapattah','Flagami','Overtown','Little Haiti'
];

// Output dirs
const dataDir = path.join(process.cwd(), 'data');
const svcDir = path.join(process.cwd(), 'content/services');
const locDir = path.join(process.cwd(), 'content/locations');

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(svcDir, { recursive: true });
fs.mkdirSync(locDir, { recursive: true });

// Build services.json
const servicesOut = services.map(name => ({
  slug: slugify(name),
  name,
  category: pickCategory(name),
}));
fs.writeFileSync(path.join(dataDir, 'services.json'), JSON.stringify({ brand: BRAND, nap: NAP_ADDRESS, services: servicesOut }, null, 2));

// Build cities.json
fs.writeFileSync(path.join(dataDir, 'cities.json'), JSON.stringify({ brand: BRAND, nap: NAP_ADDRESS, cities }, null, 2));

// Collect categories
const categories = Array.from(new Set(servicesOut.map(s => s.category)));

// Template helpers
function fm(obj){
  // simple front matter serialize
  const yaml = JSON.stringify(obj, null, 2)
    .replace(/\{\n/g,'')
    .replace(/\n\}/g,'')
  return `---\n${yaml}\n---`;
}

function serviceFM(serviceName, cityName){
  const base = serviceName;
  const city = cityName || 'Miami';
  return {
    primary_kw: `${base} ${city === 'Miami' ? 'Miami' : `in ${city}`}`,
    support_kws: [
      `${base} near me`, `${base} 24/7`, `${base} cost`, `${base} permit`, `${base} inspection`, `${base} in ${city}`
    ],
    areas,
    faq: [
      { q: `How much does ${base.toLowerCase()} cost in ${city}?`, a: 'Pricing varies by scope; we provide transparent estimates before work begins.' },
      { q: `Can you handle emergencies for ${base.toLowerCase()}?`, a: 'Yes, we offer 24/7 response across Miami-Dade.' },
      { q: `Do I need permits in ${city} for ${base.toLowerCase()}?`, a: 'We advise on required permits and can handle paperwork.' },
      { q: `What\'s the typical timeline for ${base.toLowerCase()}?`, a: 'Most services are same-day; larger projects vary.' },
      { q: `Is there a warranty on ${base.toLowerCase()}?`, a: 'Installations include manufacturer and workmanship coverage; repairs include workmanship guarantee.' }
    ]
  };
}

function pageBody({ service, city }){
  const hCity = city || 'Miami';
  const h1 = `${service} in ${hCity}`;
  const sections = [
    `# ${h1}`,
    '',
    'import QuoteForm from "@/components/forms/QuoteForm"',
    '',
    'Intro copy placeholder.',
    '',
    '## How much does it cost in ' + hCity + '?',
    '',
    'Placeholder cost overview.',
    '',
    '## Do I need permits in ' + hCity + '?',
    '',
    'Permit guidance placeholder.',
    '',
    '## Emergency help: what to do now',
    '',
    'Emergency steps placeholder.',
    '',
    '## Our process in ' + hCity,
    '',
    'Process outline placeholder.',
    '',
    '## Service areas near ' + hCity,
    '',
    areas.map(a=>`- ${a}`).join('\n'),
    '',
    '<QuoteForm />',
    '',
    '---',
    '',
    '<QuoteForm />'
  ];
  return sections.join('\n');
}

// Generate category hubs and service pages
const createdPaths = { category: [], service: [], city: [], cityService: [] };

for (const cat of categories){
  const catDir = path.join(svcDir, cat);
  fs.mkdirSync(catDir, { recursive: true });
  const catFM = {
    primary_kw: `${cat.replace(/-/g,' ')} Miami`,
    support_kws: [`${cat} near me`,`best ${cat} miami`,`24/7 ${cat}`],
    areas,
    faq: [
      { q: `What services fall under ${cat.replace(/-/g,' ')}?`, a: 'Overview of included services.' },
      { q: 'How pricing works', a: 'Transparent estimates and no surprises.' },
      { q: 'Do you cover emergencies?', a: 'Yes, 24/7 availability in Miami-Dade.' },
      { q: 'Are permits required?', a: 'We advise and handle paperwork when needed.' },
      { q: 'Is work warrantied?', a: 'Yes, workmanship and manufacturer coverage per service.' }
    ]
  }
  const catBody = [
    `# ${cat.replace(/-/g,' ')} in Miami`,
    '',
    'import QuoteForm from "@/components/forms/QuoteForm"',
    '',
    'Category overview placeholder.',
    '',
    '## Services in this category',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(catDir, 'index.mdx'), `${fm(catFM)}\n${catBody}`);
  createdPaths.category.push(`/content/services/${cat}/index.mdx`);

  const children = servicesOut.filter(s=>s.category===cat);
  for (const s of children){
    const body = pageBody({ service: s.name, city: 'Miami' });
    const front = serviceFM(s.name, 'Miami');
    const file = path.join(catDir, `${s.slug}.mdx`);
    fs.writeFileSync(file, `${fm(front)}\n${body}`);
    createdPaths.service.push(`/content/services/${cat}/${s.slug}.mdx`);
  }
}

// City hubs and city×service
for (const city of cities){
  const cityDir = path.join(locDir, city.slug);
  fs.mkdirSync(cityDir, { recursive: true });
  const cityFM = {
    primary_kw: `Septic services in ${city.name}`,
    support_kws: ['septic near me','24/7 septic','septic cost','permit','inspection', `${city.name} septic`],
    areas,
    faq: [
      { q: `Average septic costs in ${city.name}?`, a: 'Varies by scope; transparent estimates provided.' },
      { q: 'Do you offer emergency response?', a: 'Yes, 24/7 dispatch across Miami-Dade.' },
      { q: `Are permits required in ${city.name}?`, a: 'We can handle permit paperwork when needed.' },
      { q: 'How fast can you schedule?', a: 'Same-day or next-day for most services.' },
      { q: 'What warranties apply?', a: 'Workmanship and manufacturer coverage vary by service.' }
    ]
  }
  const cityBody = pageBody({ service: 'Septic Services', city: city.name });
  fs.writeFileSync(path.join(cityDir, 'index.mdx'), `${fm(cityFM)}\n${cityBody}`);
  createdPaths.city.push(`/content/locations/${city.slug}/index.mdx`);

  for (const s of servicesOut){
    const body = pageBody({ service: s.name, city: city.name });
    const front = serviceFM(s.name, city.name);
    const file = path.join(cityDir, `${s.slug}.mdx`);
    fs.writeFileSync(file, `${fm(front)}\n${body}`);
    createdPaths.cityService.push(`/content/locations/${city.slug}/${s.slug}.mdx`);
  }
}

// Report
const report = {
  totals: {
    categories: createdPaths.category.length,
    services: createdPaths.service.length,
    cities: createdPaths.city.length,
    cityServices: createdPaths.cityService.length,
  },
  examples: {
    category: createdPaths.category.slice(0,10),
    service: createdPaths.service.slice(0,10),
    city: createdPaths.city.slice(0,10),
    cityService: createdPaths.cityService.slice(0,10),
  }
};
fs.writeFileSync(path.join(process.cwd(), 'outputs', 'phase1-generation.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
