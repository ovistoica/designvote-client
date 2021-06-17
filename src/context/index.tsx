import {UserProfile, UserProvider} from '@auth0/nextjs-auth0'
import {CookiesProvider} from 'react-cookie'

import {ThemeProvider} from './theme'

/**
 * These are the base providers for the basic pages.
 */
const BaseProviders: React.FC<{user: UserProfile}> = ({children, user}) => (
  <ThemeProvider>
    <UserProvider user={user}>
      <CookiesProvider>{children}</CookiesProvider>
    </UserProvider>
  </ThemeProvider>
)

export {BaseProviders}
