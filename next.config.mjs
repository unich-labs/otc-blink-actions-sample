/** @type {import('next').NextConfig} */
const nextConfig = {
  //   experimental: { esmExternals: "loose" },
  webpack: (config) => {
    config.externals.push(
      "pino-pretty" /* add any other modules that might be causing the error */,
    );
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        os: false,
      },
    };
    return config;
  },
};

export default nextConfig;
