# Phase 0: Marketplace Messaging Inventory

This inventory lists all files containing marketplace-related phrases that need to be converted to first-party service messaging.

| file_path | line_snippet | keyword_hit | suggested_replacement |
|-----------|--------------|-------------|----------------------|
| app/layout.tsx | Find trusted septic pros near you. Free quotes. Clear guidance. | Find trusted pros / Free quotes | Our licensed technicians handle septic services in Miami-Dade & South Florida. Transparent estimates. |
| app/(site)/page.tsx | Find trusted septic pros in your area. Get free quotes for pumping, cleaning, inspection, repair, and more. | Find trusted pros / Get free quotes | Our licensed technicians serve Miami-Dade and neighboring areas. Get clear, upfront estimates for pumping, cleaning, inspection, repair, and more. |
| app/(site)/page.tsx | Septic Tank Services Near You | Near You | Miami Septic Services — Pumping, Cleaning, Installs & Emergency Support |
| app/(site)/quote/page.tsx | Get a Free Septic Quote \| Connect with Local Pros | Connect with Local Pros | Get My Septic Service Estimate |
| app/(site)/quote/page.tsx | Fill out the form below and we&apos;ll connect you with trusted septic professionals in your area. | we connect you | Tell us about your septic issue and our team will provide a clear estimate. |
| app/(site)/quote/page.tsx | Get free, no-obligation quotes from licensed contractors. | Get free quotes | Get a clear, upfront estimate from our licensed technicians. |
| app/(site)/services/page.tsx | Browse HTMLEntities: all septic services: pumping, cleaning, inspection, repair, drainfield work, emergency service, and more. Find the right service for your needs. | Find the right service | Browse all septic services: pumping, cleaning, inspection, repair, drainfield work, emergency service, and more. Our licensed technicians handle your service. |
| app/(site)/locations/page.tsx | Find septic services in your city. Browse top locations in Florida and beyond. Local pros, free quotes, trusted contractors. | Find / Local pros / free quotes | Miami septic service company serving Miami-Dade and neighboring areas. Licensed technicians, transparent estimates. |
| app/(site)/locations/[state]/page.tsx | Find trusted septic pros across {stateName}. Get free quotes for pumping, inspection, repair, and more. | Find trusted pros /Get free quotes | Our licensed technicians serve {stateName}. Get upfront estimates for pumping, inspection, repair, and more. |
| app/(site)/locations/[state]/[city]/page.tsx | Find trusted septic pros in ${location.city}, ${location.stateCode}. Get free quotes for pumping, inspection, repair, drainfield work, and emergency service. Local experts. | Find trusted pros / Get free quotes | Our licensed technicians serve ${location.city}, ${location.stateCode}. Upfront estimates for pumping, inspection, repair, drainfield work, and emergency service. |
| app/(site)/privacy/page.tsx | Connect you with local septic service providers | Connect you with | Our licensed technicians handle your service. When needed, we may use licensed subcontractors. |
| app/(site)/terms/page.tsx | SepticTankQuoteHub is a referral service. We connect users with local service providers but do not guarantee the quality, pricing, or availability of services provided by third parties. | referral service / We connect users | We primarily perform services in-house. When needed, we may use licensed subcontractors. We do not sell your data. |
| components/ArticleLayout.tsx | Need a trusted septic pro? | trusted septic pro | Need our septic team? |
| components/ArticleLayout.tsx | Get free quotes from licensed contractors in 60 seconds. | Get free quotes | Get an upfront estimate from our licensed technicians in 60 seconds. |
| components/ArticleLayout.tsx | Get Free Quote | Get Free Quote | Get My Septic Service Estimate |
| lib/seo/schemaGenerators.ts | Find trusted septic pros near you. Free quotes. Clear guidance. | Find trusted pros / Free quotes | Our licensed technicians handle septic services in Miami-Dade & South Florida. Transparent estimates. |
| lib/seo/schemaGenerators.ts | provider: { '@type': 'Organization', name: 'SepticTankQuoteHub' } | provider (schema) | Keep as-is but verify LocalBusiness schema added |
| public/site.webmanifest | Find trusted septic pros near you. Free quotes. Clear guidance. | Find trusted pros / Free quotes | Our licensed technicians handle septic services in Miami-Dade & South Florida. Transparent estimates. |
| content/services/septic-inspection.json | connecting pipes | connecting | (Keep as-is - technical term) |
| content/costs/septic-tank-pumping.mdx | Get quotes from 3+ contractors to compare pricing | Get quotes / compare pricing | Get upfront estimates from our team. Transparent pricing with no surprises. |
| content/locations/fl/*.json | Find trusted septic pros in [city], FL. Get free quotes for pumping, inspection, repair, drainfield workчина, and emergency service. Local experts. | Find trusted pros / Get free quotes | Our licensed technicians serve [city], FL. Upfront estimates for pumping, inspection, repair, drainfield work, and emergency service. |
| content/resources/**/*.mdx | Finding [Service] Pros in [City] | Finding Pros | Schedule [Service] in [City] with Our Team |
| docs/*.md | (Multiple instances of "Find trusted pros", "free quotes", "compare quotes" - for reference only, not user-facing) | Various | (Documentation only - note for future reference) |

**Note:** This inventory focuses on user-visible copy. Schema/structured data updates will be handled in Phase 3. Documentation files in `/docs/` are for reference and don't need immediate updates.

