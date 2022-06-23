/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/:slug*',
        headers: [
          {
            key: 'x-slug',
            value: ':slug*', // Matched parameters can be used in the value
          },
          {
            key: 'Access-Control-Allow-Origin', // Matched parameters can be used in the key
            value: 'https://www.somerandomexample.com',
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig
