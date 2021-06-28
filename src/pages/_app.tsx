import * as React from 'react'
import {BaseProviders} from 'context'
import type {AppProps} from 'next/app'

import {useInitialSetup} from '../utils/hooks'

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement<AppProps> {
  useInitialSetup()
  return (
    <BaseProviders dehydratedState={pageProps.dehydratedState}>
      <Component {...pageProps} />
    </BaseProviders>
  )
}
