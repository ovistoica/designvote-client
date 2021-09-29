import {chakra, HTMLChakraProps} from '@chakra-ui/react'
import * as React from 'react'

function SvgComponent(props: HTMLChakraProps<'svg'>) {
  return (
    <chakra.svg
      width="16px"
      height="16px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 8h-2.094A.907.907 0 0110 7.094v-.282c0-.875.25-1.687.656-2.437.281-.563.406-1.219.281-1.906C10.72 1.28 9.75.28 8.531.063 8.344.03 8.156 0 8 0a2.98 2.98 0 00-3 3c0 .469.094.875.25 1.25.438.906.75 1.844.75 2.844 0 .5-.438.906-.938.906H3a2.98 2.98 0 00-3 3v1c0 .563.438 1 1 1v2c0 .563.438 1 1 1h12c.531 0 1-.438 1-1v-2c.531 0 1-.438 1-1v-1a3 3 0 00-3-3zm1 7H2v-2h12v2zm1-3H1v-1c0-1.094.875-2 2-2h2.063C6.125 9 7 8.156 7 7.094c0-1-.281-2.063-.844-3.25C6.031 3.563 6 3.313 6 3c0-1.094.875-2 2-2 .094 0 .219.031.344.063.812.125 1.469.812 1.594 1.593.093.438.03.875-.157 1.25C9.25 4.937 9 5.875 9 6.812v.282C9 8.156 9.844 9 10.906 9H13c1.094 0 2 .906 2 2v1z"
        fill={(props.fill as string) || '#2D3748'}
      />
    </chakra.svg>
  )
}

export const Stamp = React.memo(SvgComponent)
