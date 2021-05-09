import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  theme as defaultTheme,
} from '@chakra-ui/react'
import {StrictMode} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {DefaultOptions, QueryClient, QueryClientProvider} from 'react-query'
import {AuthProvider, Auth0Provider} from './auth-context'
import {CookiesProvider} from 'react-cookie'
import {Fonts} from 'assets/fonts'
import {mode} from '@chakra-ui/theme-tools'

const defaultOptions: DefaultOptions<{status: number}> = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (
        error.status &&
        typeof error.status === 'number' &&
        error.status === 404
      ) {
        return false
      } else if (failureCount < 2) {
        return true
      }
      return false
    },
  },
}

const queryClient = new QueryClient({
  defaultOptions: defaultOptions as DefaultOptions,
})
const theme = extendTheme({
  colors: {
    ...defaultTheme.colors,
    red: {
      50: '#ffe6e4',
      100: '#fac1ba',
      200: '#f19e8e',
      300: '#e97d62',
      400: '#e24d36',
      500: '#c9291d',
      600: '#9d1616',
      700: '#710e14',
      800: '#45060d',
      900: '#1d0008',
    },
    teal: {
      50: '#dffdf9',
      100: '#bef0e9',
      200: '#98e4db',
      300: '#72d9cd',
      400: '#4ecfbe',
      500: '#35b5a5',
      600: '#268d80',
      700: '#17655c',
      800: '#053d37',
      900: '#001613',
    },
  },
  styles: {
    global: props => ({
      img: {
        filter: mode('inherit', 'brightness(.88) contrast(1.2)')(props),
      },
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('gray.50', 'gray.800')(props),
        transition: 'background-color 0.2s',
        lineHeight: 'base',
      },
    }),
  },
  // TODO: Toggle on Settings
  // config: {
  //   useSystemColorMode: process.env.NODE_ENV === 'production',
  // },
})

const AppProviders: React.FC = ({children}) => {
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
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
          </AuthProvider>
        </Auth0Provider>
      </ChakraProvider>
    </StrictMode>
  )
}

export {AppProviders}
