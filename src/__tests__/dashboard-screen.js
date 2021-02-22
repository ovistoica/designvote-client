import {render, screen, act} from '@testing-library/react'
import {AppProviders} from 'context'
import App from 'app'

test('renders the dashboard correctly', async () => {
  render(<App />, {wrapper: AppProviders})

  screen.debug()
})
