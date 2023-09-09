/** @type {import('next').NextConfig} */
console.log('Server from next.config.js', process.env.NEXT_PUBLIC_FM_SERVER);
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
        if (!isServer) {
        config.resolve.fallback.fs = false;
        }
        return config;
    }
};
console.log('Server from next.config.js');

module.exports = nextConfig
