import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: false, // Disable source maps to prevent URL issues in Next.js
  clean: true,
  external: ['react', 'react-dom', '@react-pdf/renderer', 'tailwindcss'],
  esbuildOptions(options) {
    options.banner = {
      js: '// tw-to-react-pdf - Convert Tailwind CSS to React-PDF styles',
    };
    // Ensure compatibility with Next.js 15
    options.target = 'es2020';
    options.jsx = 'automatic';
  },
  treeshake: true,
});