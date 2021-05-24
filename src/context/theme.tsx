import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  theme as defaultTheme,
} from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'

const theme = extendTheme({
  shadows: {
    ...defaultTheme.shadows,
    full: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
  },
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

export const ThemeProvider: React.FC = props => (
  <>
    <ColorModeScript />
    <ChakraProvider theme={theme} {...props} />
  </>
)
