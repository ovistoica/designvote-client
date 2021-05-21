import {CookiesProvider} from 'react-cookie'
import {Auth0Provider} from './auth-context'
import {ThemeProvider} from './theme'
import {AppProviders} from './app-context'

/**
 * These are the base providers for the basic pages.
 */
const BaseProviders: React.FC = ({children}) => {
  return (
    <ThemeProvider>
      <Auth0Provider>
        <CookiesProvider>{children}</CookiesProvider>
      </Auth0Provider>
    </ThemeProvider>
  )
}

export {BaseProviders, AppProviders}
