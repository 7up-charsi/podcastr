import type { Config } from 'tailwindcss';
import { createColorScale, typeweave } from '@typeweave/plugin';
import * as radixColors from '@radix-ui/colors';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@typeweave/react/dist/**/*.styles.js',
  ],
  theme: {},
  plugins: [
    typeweave({
      themes: {
        light: {
          colors: { primary: createColorScale(radixColors.orange) },
        },
        dark: {
          colors: {
            primary: createColorScale(radixColors.orangeDark),
          },
        },
      },
    }),
  ],
};
export default config;

