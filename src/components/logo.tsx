import {Box, BoxProps, Text} from '@chakra-ui/react'

export default function Logo(props: BoxProps) {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold">
        designvote
      </Text>
    </Box>
  )
}
