import {ChakraProvider, ColorModeScript, extendTheme} from '@chakra-ui/react'
import {StrictMode} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {AuthProvider, Auth0Provider} from './auth-context'
import {Fonts} from 'assets/fonts'
import * as colors from 'styles/colors'
import {mode} from '@chakra-ui/theme-tools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error.status === 404) return false
        else if (failureCount < 2) return true
        else return false
      },
    },
  },
})

const theme = extendTheme({
  fonts: {
    heading: 'IBM Plex Serif',
    body: 'Lato',
  },
  colors: {
    brand: colors.brand,
    background3: colors.background3,
    info: colors.info,
    surface: colors.surface,
  },
  styles: {
    global: props => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('background3', 'gray.800')(props),
        lineHeight: 'base',
      },
    }),
  },
})

function AppProviders({children}) {
  return (
    <StrictMode>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Fonts />
        <Auth0Provider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Router>{children}</Router>
            </QueryClientProvider>
          </AuthProvider>
        </Auth0Provider>
      </ChakraProvider>
    </StrictMode>
  )
}

export {AppProviders}
