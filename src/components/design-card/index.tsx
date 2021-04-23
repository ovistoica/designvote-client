import {Box, Flex, FlexProps, useColorModeValue} from '@chakra-ui/react'
import {DesignMenu} from './design-menu'

interface DesignCardProps extends FlexProps {
  designId: string
}

export const DesignCard = (props: DesignCardProps) => {
  const {children, designId, ...rest} = props
  return (
    <Flex
      direction="column"
      alignItems="center"
      rounded="md"
      justify="center"
      padding="8"
      position="relative"
      cursor="pointer"
      bg={useColorModeValue('white', 'gray.700')}
      shadow="base"
      role="group"
      _hover={{
        bg: useColorModeValue('gray.50', 'gray.600'),
        transition: '0.2s all',
      }}
      // pt={20}
      {...rest}
    >
      <Box
        position="absolute"
        inset="0"
        height="20"
        // bg={useColorModeValue('orange.600', 'orange.400')}
        roundedTop="inherit"
      />
      <DesignMenu designId={designId} />
      {children}
    </Flex>
  )
}

export * from './design-info'
export * from './votes-count'
