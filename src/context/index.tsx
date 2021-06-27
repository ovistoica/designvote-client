import {CookiesProvider} from 'react-cookie'

import {ThemeProvider} from './theme'

/**
 * These are the base providers for the basic pages.
 */
const BaseProviders: React.FC = ({children}) => {
  return (
    <ThemeProvider>
      <CookiesProvider>{children}</CookiesProvider>
    </ThemeProvider>
  )
}

export {BaseProviders}
