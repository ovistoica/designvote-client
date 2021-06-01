import React from 'react'

import {BaseProviders} from 'context'
import type {AppProps} from 'next/app'

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement<AppProps> {
  // If you've used `withAuth`, pageProps.user can pre-populate the hook
  // if you haven't used `withAuth`, pageProps.user is undefined so the hook
  // fetches the user from the API routes
  const {user} = pageProps

  return (
    <BaseProviders user={user}>
      <Component {...pageProps} />
    </BaseProviders>
  )
}
