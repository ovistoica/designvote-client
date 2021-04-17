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
import * as colors from 'styles/colors'
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
  fonts: {
    ...defaultTheme.fonts,
    heading: `"IBM Plex Serif", ${defaultTheme.fonts.heading}`,
    body: `"Lato", ${defaultTheme.fonts.body}`,
  },
  colors: {
    ...defaultTheme.colors,
    background3: colors.background3,
    info: colors.info,
    surface: colors.surface,
    primary: {
      100: '#f6ab79',
      200: '#f59d63',
      300: '#f38f4d',
      400: '#f28136',
      500: '#f07320',
      600: '#D6661C',
      700: '#B05417',
      800: '#70360F',
      900: '#70360F',
    },
    brand: {
      100: '#69c5c8',
      200: '#50bcbf',
      300: '#37b2b5',
      400: '#1ea9ac',
      500: '#059FA3',
      600: '#058f93',
      700: '#047f82',
      800: '#046f72',
      900: '#035f62',
    },
    textSecondary: '#747474',
    textInfoLight: '#ABBFC8',
  },
  styles: {
    global: props => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('background3', 'gray.800')(props),
        lineHeight: 'base',
      },
      img: {
        filter: mode('inherit', 'brightness(.88) contrast(1.2)')(props),
      },
    }),
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
