import {
  ChakraProvider,
  extendTheme,
  theme as defaultTheme,
} from '@chakra-ui/react'
import {render, RenderOptions} from '@testing-library/react'
import {DefaultOptions, QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter} from 'react-router-dom'
import {mode} from '@chakra-ui/theme-tools'
import * as colors from 'styles/colors'

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
    }),
  },
})

const AllTheProviders: React.ComponentType = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>{children}</BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}
