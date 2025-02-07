import { withSentryConfig } from "@sentry/nextjs";
import createMDX from '@next/mdx';
import ContentSecurityPolicy from "./csp.config.mjs";
import pkg from "./package.json" with { type: "json" };
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { remarkRelativeLinks } from "./src/lib/remark-relative-links.mjs";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkRelativeLinks],
    rehypePlugins: [
      [rehypeRaw, { passThrough: ['element'] }]
    ]
  },
});

const version = pkg.version;

/** @type {import('next').NextConfig} */
const moduleExports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx", "md"],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: false
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff2|webmanifest)$/,
      type: "asset/resource",
    });

    return config;
  },
  sentry: {
    //disableClientWebpackPlugin: true,
    //disableServerWebpackPlugin: true,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_APP_VERSION_COMMIT: process.env.GITHUB_SHA,
    CONTENT_SECURITY_POLICY: ContentSecurityPolicy,
  },
  transpilePackages: [
    "@codegouvfr/react-dsfr",
    "tss-react"
  ],
  typescript: {
    // TODO this will be removed
    ignoreBuildErrors: true,
  }
};

export default withMDX(withSentryConfig(moduleExports, { silent: true }));
