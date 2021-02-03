import {ChakraProvider, ColorModeScript, theme} from '@chakra-ui/react'
import {StrictMode} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {AuthProvider, Auth0Provider} from './auth-context'

const queryClient = new QueryClient({})

function AppProviders({children}) {
  return (
    <StrictMode>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
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
