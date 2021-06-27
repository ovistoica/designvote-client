import React from 'react'

import {BaseProviders} from 'context'
import type {AppProps} from 'next/app'

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement<AppProps> {
  return (
    <BaseProviders>
      <Component {...pageProps} />
    </BaseProviders>
  )
}
