import {CookiesProvider} from 'react-cookie'

import {AppProviders} from './app-context'
import {Auth0Provider} from './auth-context'
import {ThemeProvider} from './theme'

/**
 * These are the base providers for the basic pages.
 */
const BaseProviders: React.FC = ({children}) => (
  <ThemeProvider>
    <Auth0Provider>
      <CookiesProvider>{children}</CookiesProvider>
    </Auth0Provider>
  </ThemeProvider>
)

export {BaseProviders, AppProviders}
