import '../styles.css'
import './storybook.styles.css'

// https://github.com/myopic-design/monorepo-nextjs-tailwindcss-template/tree/main/packages/storybook-config/static

import { withThemeByDataAttribute } from '@storybook/addon-themes'

/* snipped for brevity */

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-mode',
  }),
]

const preview = {
  decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
