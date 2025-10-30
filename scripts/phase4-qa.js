const fs = require('fs');
const path = require('path');

const root = process.cwd();

// Load content counts
function countFiles(dir, ext = '.json') {
  try {
    if (!fs.existsSync(dir)) return 0;
    const files = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
    return files.filter(f => f.isFile() && f.name.endsWith(ext)).length;
  } catch {
    return 0;
  }
}

function countMDX(dir) {
  try {
    if (!fs.existsSync(dir)) return 0;
    const files = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
    return files.filter(f => f.isFile() && f.name.endsWith('.mdx')).length;
  } catch {
    return 0;
  }
}

const stats = {
  services: {
    json: countFiles(path.join(root, 'content/services'), '.json'),
    mdx_categories: countFiles(path.join(root, 'content/services'), 'index.mdx'),
    mdx_services: countMDX(path.join(root, 'content/services')) - countFiles(path.join(root, 'content/services'), 'index.mdx'),
  },
  locations: {
    json: countFiles(path.join(root, 'content/locations'), '.json'),
    mdx_cities: countFiles(path.join(root, 'content/locations'), 'index.mdx'),
    mdx_city_services: countMDX(path.join(root, 'content/locations')) - countFiles(path.join(root, 'content/locations'), 'index.mdx'),
  },
  resources: {
    articles: countMDX(path.join(root, 'content/resources')),
  },
  issues: {
    mdx: countMDX(path.join(root, 'content/issues')),
  },
  costs: {
    mdx: countMDX(path.join(root, 'content/costs')),
  },
};

// Calculate totals
const totalPages = {
  static: 3, // home, quote, contact
  hub: 5, // services, locations, resources, issues, costs
  legal: 2, // privacy, terms
  services_detail: stats.services.json,
  locations_state: 1, // FL only currently
  locations_city: stats.locations.json,
  resources_articles: stats.resources.articles,
  issues_detail: stats.issues.mdx,
  costs_detail: stats.costs.mdx,
};

totalPages.total_wired = Object.values(totalPages).reduce((a, b) => a + b, 0);
totalPages.total_generated_unwired = stats.services.mdx_categories + stats.services.mdx_services + stats.locations.mdx_cities + stats.locations.mdx_city_services;

const report = {
  page_counts: totalPages,
  content_files: stats,
  routes_wired: {
    static: ['/', '/quote', '/contact'],
    hub: ['/services', '/locations', '/resources', '/issues', '/costs'],
    legal: ['/privacy', '/terms'],
    dynamic: {
      services: `/services/[slug] (${stats.services.json} pages)`,
      locations_state: `/locations/[state] (1 page)`,
      locations_city: `/locations/[state]/[city] (${stats.locations.json} pages)`,
      resources: `/resources/[service]/[stateCity] (${stats.resources.articles} pages)`,
      issues: `/issues/[slug] (${stats.issues.mdx} pages)`,
      costs: `/costs/[slug] (${stats.costs.mdx} pages)`,
    },
  },
  routes_unwired: {
    note: 'Phase-1/2 generated MDX files without routes (future enhancement)',
    category_hubs: stats.services.mdx_categories,
    service_category_pages: stats.services.mdx_services,
    city_hubs: stats.locations.mdx_cities,
    city_service_pages: stats.locations.mdx_city_services,
  },
  sitemap: {
    status: 'Active',
    url: '/sitemap.xml',
    generated_from: 'app/sitemap.ts',
  },
  robots: {
    status: 'Active',
    url: '/robots.txt',
    allows: ['GPTBot', 'OAI-SearchBot', '*'],
    disallows: ['/quote/thank-you/', '/api/'],
  },
  jsonld_validation: {
    note: 'Manual validation required for 3 random pages',
    sample_pages: [
      '/',
      `/services/${stats.services.json > 0 ? 'septic-tank-pumping' : 'example'}`,
      `/locations/fl/${stats.locations.json > 0 ? 'miami' : 'example'}`,
    ],
  },
  example_urls: [
    '/',
    '/services',
    '/locations',
    '/quote',
    '/contact',
    '/services/septic-tank-pumping',
    '/locations/fl/miami',
    '/resources/septic-tank-pumping/fl-miami',
    '/issues/drains-gurgling',
    '/costs/septic-tank-pumping',
  ],
};

fs.mkdirSync(path.join(root, 'outputs'), { recursive: true });
fs.writeFileSync(path.join(root, 'outputs', 'phase4-qa.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
