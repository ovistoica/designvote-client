import {ChakraProvider} from '@chakra-ui/react'
import {render, RenderOptions} from '@testing-library/react'
import {DefaultOptions, QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter} from 'react-router-dom'

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

const AllTheProviders: React.ComponentType = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
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
