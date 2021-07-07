import {Box, BoxProps} from '@chakra-ui/react'
import Link from 'next/link'
import * as React from 'react'

interface LinkProps extends BoxProps {
  href: string
}

export const UnderlineLink = ({children, ...props}: LinkProps) => {
  return (
    <Box
      pos="relative"
      display="inline-block"
      transition="opacity 0.2s"
      _hover={{opacity: 0.8}}
      _after={{
        display: 'block',
        w: 'full',
        h: '2px',
        bottom: 0,
        bg: 'blue.500',
        insetX: 0,
        insetY: 0,
      }}
      {...props}
    >
      <Link href={props.href ?? '/auth/register'}>{children}</Link>
    </Box>
  )
}
