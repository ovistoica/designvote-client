import {Box, Flex, FlexProps, useColorModeValue} from '@chakra-ui/react'

interface Props extends FlexProps {
  label: string
  value: string
  action?: React.ReactNode
}

export const Property = (props: Props) => {
  const {label, value, action, ...flexProps} = props
  return (
    <Flex
      as="dl"
      direction={{base: 'column', sm: 'row'}}
      px="6"
      py="4"
      alignContent="center"
      _even={{bg: useColorModeValue('gray.50', 'gray.600')}}
      {...flexProps}
    >
      <Box as="dt" minWidth="180px">
        {label}
      </Box>
      <Box as="dd" flex="1" fontWeight="semibold">
        {value}
      </Box>
      {action}
    </Flex>
  )
}
