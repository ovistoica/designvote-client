import {useState, useEffect} from 'react'
import ApplicationEntryPoint from 'app'
import {AppProviders} from 'context'

function App() {
  return (
    <AppProviders>
      <ApplicationEntryPoint />
    </AppProviders>
  )
}

export default App
