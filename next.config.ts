import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://github.com/capsulerun",
        permanent: false,
      },
      {
        source: "/blog",
        destination: "https://github.com/capsulerun",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
