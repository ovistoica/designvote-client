import {AuthProvider} from './auth-context'
import {BrowserRouter} from 'react-router-dom'
import {QueryProvider} from './react-query'

export const AppProviders: React.FC = props => (
  <QueryProvider>
    <AuthProvider>
      <BrowserRouter {...props} />
    </AuthProvider>
  </QueryProvider>
)
