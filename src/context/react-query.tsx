import {DefaultOptions, QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import React from 'react'
import {Hydrate} from 'react-query/hydration'

const defaultOptions: DefaultOptions<{status: number}> = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status && error.status === 404) {
        return false
      }
      if (failureCount < 2) {
        return true
      }
      return false
    },
  },
}

interface QueryProps {
  dehydratedState?: unknown
}

export const QueryProvider: React.FC<QueryProps> = ({
  children,
  dehydratedState,
}) => {
  const [queryClient] = React.useState(
    () => new QueryClient({defaultOptions: defaultOptions as DefaultOptions}),
  )
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>{children}</Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
