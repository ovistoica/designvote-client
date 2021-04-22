import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  theme as defaultTheme,
} from '@chakra-ui/react'
import {StrictMode} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {DefaultOptions, QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
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
    orange: {
      ...defaultTheme.colors.orange,

      // 500: '#F17828',
    },
  },
  styles: {
    global: props => ({
      img: {
        filter: mode('inherit', 'brightness(.88) contrast(1.2)')(props),
      },
    }),
  },
  config: {
    useSystemColorMode: true,
  },
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
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </AuthProvider>
        </Auth0Provider>
      </ChakraProvider>
    </StrictMode>
  )
}

export {AppProviders}
