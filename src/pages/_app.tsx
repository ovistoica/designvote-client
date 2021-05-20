import React from 'react'
import type {AppProps} from 'next/app'
import {AppProviders} from 'context'

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement<AppProps> {
  const {user} = pageProps

  return (
    <AppProviders user={user}>
      <Component {...pageProps} />
    </AppProviders>
  )
}
