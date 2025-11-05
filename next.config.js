const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      require('rehype-slug'),
      [require('rehype-autolink-headings'), { behavior: 'wrap' }],
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    mdxRs: false,
  },
  async redirects() {
    return [
      // Legacy Miami service routes to new service routes
      {
        source: '/miami/services/:slug',
        destination: '/services/:slug',
        permanent: true,
      },
      // Redirect old /resources/:slug → /services/:slug
      {
        source: '/resources/:slug',
        destination: '/services/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = withMDX(nextConfig)

