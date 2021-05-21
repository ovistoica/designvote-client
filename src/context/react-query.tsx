import {DefaultOptions, QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
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

export const QueryProvider: React.FC = props => (
  <>
    <QueryClientProvider client={queryClient} {...props} />
    <ReactQueryDevtools initialIsOpen={false} />
  </>
)
