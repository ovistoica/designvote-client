import {
  HStack,
  StackProps,
  Text,
  useColorModeValue as mode,
  VStack,
} from '@chakra-ui/react'

interface DesignInfoProps extends StackProps {
  name: string
  description?: string | null
  isVerified?: boolean
}

export const DesignInfo = (props: DesignInfoProps) => {
  const {name, description, ...stackProps} = props
  return (
    <VStack spacing="1" flex="1" {...stackProps}>
      <HStack>
        <Text fontWeight="bold" textAlign="center">
          {name}
        </Text>
      </HStack>
      {description ? (
        <Text
          fontSize="sm"
          textAlign="center"
          noOfLines={2}
          color={mode('gray.600', 'gray.400')}
        >
          {description}
        </Text>
      ) : null}
    </VStack>
  )
}
