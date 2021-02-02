import {Auth0Provider} from '@auth0/auth0-react'
import {ChakraProvider, ColorModeScript, theme} from '@chakra-ui/react'
import {StrictMode} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

function AppProviders({children}) {
  return (
    <StrictMode>
      <ColorModeScript />
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
        audience={process.env.REACT_APP_AUTH_AUDIENCE}
        scope="read:current_user update:current_user_metadata"
      >
        <ChakraProvider theme={theme}>
          <Router>{children}</Router>
        </ChakraProvider>
      </Auth0Provider>
    </StrictMode>
  )
}

export {AppProviders}
