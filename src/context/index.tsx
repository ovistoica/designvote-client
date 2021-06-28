import {CookiesProvider} from 'react-cookie'

import {ThemeProvider} from './theme'
import {QueryProvider} from './react-query'

/**
 * These are the base providers for the basic pages.
 */
const BaseProviders: React.FC<{dehydratedState: unknown}> = ({
  children,
  dehydratedState,
}) => {
  return (
    <ThemeProvider>
      <QueryProvider dehydratedState={dehydratedState}>
        <CookiesProvider>{children}</CookiesProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}

export {BaseProviders}
