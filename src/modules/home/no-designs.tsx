import {Button, Flex, Text, useColorModeValue as mode} from '@chakra-ui/react'
import {NotFoundLogo} from 'assets/icons'

interface NoDesignsProps {
  onClick: () => void
}

export function NoDesigns({onClick}: NoDesignsProps) {
  const textInfoColor = mode('gray.600', 'gray.400')

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      mx="auto"
      mt={4}
      bg={mode('gray.100', 'gray.600')}
      p={8}
      w={{base: 'full', md: 'inherit'}}
    >
      <NotFoundLogo w="3em" h="3em" color={mode('orange.500', 'orange.300')} />
      <Text mt={4} fontWeight="medium" fontSize="md" textAlign="center">
        You haven&apos;t uploaded any designs yet
      </Text>
      <Text mt={1} color={textInfoColor} textAlign="center">
        Click here to start the process
      </Text>
      <Button
        my={4}
        fontWeigh="300"
        fontSize="sm"
        onClick={onClick}
        colorScheme="orange"
      >
        Create your design
      </Button>
    </Flex>
  )
}
