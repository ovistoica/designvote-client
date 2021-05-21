import React from 'react'
import type {AppProps} from 'next/app'
import {BaseProviders} from 'context'

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement<AppProps> {
  const {user} = pageProps

  return (
    <BaseProviders>
      <Component {...pageProps} />
    </BaseProviders>
  )
}
