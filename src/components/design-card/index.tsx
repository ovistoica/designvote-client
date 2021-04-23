import {Flex, FlexProps, useColorModeValue as mode} from '@chakra-ui/react'
import {DesignMenu} from './design-menu'

interface DesignCardProps extends FlexProps {
  designId: string
}

export const DesignCard = (props: DesignCardProps) => {
  const {children, designId, ...rest} = props
  const behavior = mode({}, {bg: 'gray.600'})
  return (
    <Flex
      direction="column"
      alignItems="center"
      rounded="md"
      justify="center"
      p="4"
      h="48"
      w="40"
      position="relative"
      cursor="pointer"
      maxW={{base: '15', md: '15'}}
      bg={mode('white', 'gray.700')}
      shadow="base"
      role="group"
      transition="0.25s all"
      _hover={{
        ...behavior,
        shadow: 'lg',
      }}
      {...rest}
    >
      <DesignMenu designId={designId} />
      {children}
    </Flex>
  )
}

export * from './design-info'
export * from './votes-count'
