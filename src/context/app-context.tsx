import {BrowserRouter} from 'react-router-dom'

import {AuthProvider} from './auth-context'

export const AppProviders: React.FC = props => (
  <AuthProvider>
    <BrowserRouter {...props} />
  </AuthProvider>
)
