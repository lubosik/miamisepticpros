const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const root = process.cwd();
const svcDir = path.join(root, 'content/services');
const locDir = path.join(root, 'content/locations');

function walk(dir){
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })){
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.mdx')) out.push(full);
  }
  return out;
}

function splitFrontMatter(raw){
  const re = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const m = raw.match(re);
  if (!m) return { fm: '', body: raw };
  return { fm: m[1], body: raw.slice(m[0].length) };
}

function parseFrontMatter(raw){
  // Try gray-matter first
  try { return matter(raw); } catch(e) {}
  // Fallback JSON-like block
  const { fm, body } = splitFrontMatter(raw);
  if (!fm) return { data: {}, content: body };
  let jsonText = '{\n' + fm + '\n}';
  jsonText = jsonText.replace(/,(\s*[\]\}])/g, '$1');
  try {
    const obj = JSON.parse(jsonText);
    return { data: obj, content: body };
  } catch (e) {
    return { data: {}, content: body };
  }
}

function ensureEightFAQ(faqArr, service, city){
  const base = Array.isArray(faqArr) ? faqArr.slice() : [];
  const add = (q,a)=> base.push({ q, a });
  while (base.length < 8){
    const idx = base.length;
    if (idx === 5) add(`How does South Florida's high water table affect ${service.toLowerCase()}?`, 'We assess groundwater conditions and adapt methods to protect your drain field and structure.');
    else if (idx === 6) add(`Hurricane preparedness for septic in ${city}`, 'We secure components, verify protections, and provide pre/post-storm checklists.');
    else if (idx === 7) add(`Do I need county permits in ${city}?`, 'We handle Miami-Dade paperwork when required; timelines provided upfront.');
    else add(`What should I know about ${service.toLowerCase()} in ${city}?`, 'We provide transparent scope, timeline, pricing, and warranty before work.');
  }
  return base;
}

function injectAfterLastSection(body, city){
  const blocks = [];
  blocks.push('\n## Why Miami Septic Pros');
  blocks.push('\n- Licensed, insured, Miami-based crews');
  blocks.push('- Same-day emergency response across Miami-Dade');
  blocks.push('- Transparent estimates and warranties');
  blocks.push('- Permitting and compliance handled');

  blocks.push('\n## Trust & Proof');
  blocks.push('\n[Proof point placeholders: licenses, insurance, before/after gallery, service counts, response times]');

  blocks.push('\n## Visual guides');
  blocks.push('\n![Before/After Placeholder](/images/placeholders/before-after.png)');
  blocks.push('\n<video controls src="/videos/placeholders/overview.mp4">Video placeholder</video>');
  blocks.push('\n```diagram\n# System Diagram Placeholder\nTank -> Outlet -> Distribution -> Drainfield\n```');

  if (city){
    blocks.push(`\n## Popular services in ${city}`);
    blocks.push('\n- Septic Tank Pumping');
    blocks.push('- Septic Inspections');
    blocks.push('- Drain Field Repair');
    blocks.push('- Lift Station Service');
    blocks.push('- Grease Trap Pumping');
    blocks.push('- Septic Tank Installation');
  }

  return body.replace(/\s*$/, '\n') + blocks.join('\n') + '\n';
}

function processFile(file){
  const raw = fs.readFileSync(file, 'utf8');
  const parsed = parseFrontMatter(raw);
  const cityMatch = parsed.content.match(/^# .* in (.+)$/m);
  const serviceMatch = parsed.content.match(/^# (.*) in /m);
  const city = cityMatch ? cityMatch[1].trim() : 'Miami';
  const service = serviceMatch ? serviceMatch[1].trim() : 'Septic Services';

  const data = { ...parsed.data };
  data.faq = ensureEightFAQ(data.faq, service, city);
  data.breadcrumbs = data.breadcrumbs || [ 'Home', service, city ];

  const newBody = injectAfterLastSection(parsed.content, city);
  const out = matter.stringify(newBody, data);
  fs.writeFileSync(file, out);
  return { file, faqLen: data.faq.length };
}

const files = [...walk(svcDir), ...walk(locDir)];
let count = 0; let with8 = 0;
for (const f of files){
  const res = processFile(f);
  count++; if (res.faqLen >= 8) with8++;
}

const summary = { processed: count, faq_ge_8: with8 };
fs.mkdirSync(path.join(root, 'outputs'), { recursive: true });
fs.writeFileSync(path.join(root, 'outputs', 'phase2-enrich.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
