import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Example Next.js configurations:
  reactStrictMode: true, // Enables React Strict Mode
  images: {
    domains: ['example.com'], // Example for configuring external image domains
  },
  // Add more configurations as needed
};

export default withHydrationOverlay({
  nextConfig, // Pass the nextConfig to withHydrationOverlay
  appRootSelector: "main", // Correct for apps using the 'app' directory structure
  // Additional configurations for withHydrationOverlay if needed
});