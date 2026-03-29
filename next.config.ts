import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["lucide-react", "mermaid", "react-markdown"],
  eslint: {
    // Mengabaikan error ESLint sementara akibat bug kompatibilitas ESLint 9 pada Next.js 15
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
