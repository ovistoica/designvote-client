import {Box, BoxProps, useColorModeValue} from '@chakra-ui/react'
import * as React from 'react'

const properties = {
  top: {
    transform: 'skew(var(--arrow-skew))',
    borderToOmit: 'borderBottom',
  },
  bottom: {
    transform: 'skew(calc(var(--arrow-skew) * -1))',
    borderToOmit: 'borderTop',
  },
}

interface SkewBoxProps extends BoxProps {
  placement: 'top' | 'bottom'
  isCurrent?: boolean
}

export const SkewBox = (props: SkewBoxProps) => {
  const {placement, isCurrent, ...rest} = props

  const defaultColor = useColorModeValue('white', 'gray.800')
  const accentColor = useColorModeValue('orange.500', 'orange.200')
  const hoverBgColor = useColorModeValue('gray.100', 'gray.700')

  const {borderToOmit, transform} = properties[placement]
  const placementProps = {
    [placement]: 0,
    transform,
    [borderToOmit]: '0',
  }

  return (
    <Box
      aria-hidden
      bg={isCurrent ? accentColor : defaultColor}
      borderWidth="1px"
      position="absolute"
      height="50%"
      _groupHover={{
        bg: !isCurrent ? hoverBgColor : undefined,
      }}
      _groupFocus={{
        border: '2px solid',
        borderColor: useColorModeValue('blue.200', 'blue.300'),
        [borderToOmit]: '0',
      }}
      width="full"
      {...placementProps}
      {...rest}
    />
  )
}
