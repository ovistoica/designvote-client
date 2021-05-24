import * as React from 'react'

import {DarkMode, LightMode, useColorMode} from '@chakra-ui/react'
import {useScrollPosition} from '@n8tb1t/use-scroll-position'

import {NavBar} from './nav-bar'

export function LightModeNav() {
  const [startedScrolling, setStartedScrolling] = React.useState(false)
  useScrollPosition(({currPos}) => {
    if (currPos.y < -60) {
      setStartedScrolling(true)
    } else {
      setStartedScrolling(false)
    }
  })
  return (
    <>
      <DarkMode>
        <NavBar
          transition="0.3s all"
          {...{
            opacity: startedScrolling ? 0 : 1,
            visibility: startedScrolling ? 'hidden' : 'visible',
          }}
        />
      </DarkMode>
      <LightMode>
        <NavBar
          transition="0.3s all"
          {...{
            opacity: startedScrolling ? 1 : 0,
            visibility: startedScrolling ? 'visible' : 'hidden',
          }}
        />
      </LightMode>
    </>
  )
}

export function UnauthenticatedNavBar() {
  const {colorMode} = useColorMode()
  return colorMode === 'light' ? <LightModeNav /> : <NavBar />
}
