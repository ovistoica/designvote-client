import {ChakraProvider, ColorModeScript, extendTheme} from '@chakra-ui/react'
import {StrictMode} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {AuthProvider, Auth0Provider} from './auth-context'
import {CookiesProvider} from 'react-cookie'
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
    background3: colors.background3,
    info: colors.info,
    surface: colors.surface,
    primary: {
      100: '#fdf0e7',
      200: '#fad2b7',
      300: '#f7b488',
      400: '#f49658',
      500: '#f07320',
      600: '#D6661C',
      700: '#B05417',
      800: '#70360F',
      900: '#70360F',
    },
    brand: {
      200: 'rgba(5, 159, 163, 0.5)',
      500: '#059FA3',
    },
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
              <CookiesProvider>
                <Router>{children}</Router>
              </CookiesProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </AuthProvider>
        </Auth0Provider>
      </ChakraProvider>
    </StrictMode>
  )
}

export {AppProviders}
