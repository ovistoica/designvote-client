import {chakra, HTMLChakraProps} from '@chakra-ui/react'
import * as React from 'react'

function SvgComponent(props: HTMLChakraProps<'svg'>) {
  return (
    <chakra.svg
      width={18}
      height={17}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.625 6.156l-5.5-5.75C11.375-.406 10 .125 10 1.281v2.75c-5.188.063-10 1-10 6.344 0 2.969 1.719 4.688 2.781 5.438.75.562 1.813-.157 1.531-1.063-1.187-4.219.844-4.688 5.688-4.719v2.719c0 1.156 1.375 1.688 2.125.875l5.5-5.75a1.226 1.226 0 000-1.719zm-.719 1.032l-5.5 5.75C11.25 13.094 11 13 11 12.75V9c-5.375 0-9.25.313-7.625 6C2.25 14.187 1 12.687 1 10.375 1 5.375 6.063 5 11 5V1.25c0-.219.25-.313.406-.156l5.5 5.75c.063.031.094.125.094.156 0 .063-.031.156-.094.188z"
        fill={(props.fill as string) ?? '#ED8936'}
      />
    </chakra.svg>
  )
}

export const Share = SvgComponent
