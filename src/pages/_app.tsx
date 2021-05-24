import React from 'react'

import {BaseProviders} from 'context'
import type {AppProps} from 'next/app'
import {DefaultOptions, QueryClient, QueryClientProvider} from 'react-query'
import {Hydrate} from 'react-query/hydration'

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
      }
      if (failureCount < 2) {
        return true
      }
      return false
    },
  },
}

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement<AppProps> {
  const queryClientRef = React.useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: defaultOptions as DefaultOptions,
    })
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <BaseProviders>
          <Component {...pageProps} />
        </BaseProviders>
      </Hydrate>
    </QueryClientProvider>
  )
}
