import {AddIcon} from '@chakra-ui/icons'
import {
  Circle,
  Flex,
  FlexProps,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import Link from 'next/link'

interface DesignCardProps extends FlexProps {}

export const CreateDesignCard = (props: DesignCardProps) => {
  return (
    <Link href="/create-survey">
      <Flex
        aria-label="Add design"
        direction="column"
        alignItems="center"
        rounded="md"
        justify="center"
        bg={mode('orange.500', 'orange.500')}
        p="4"
        position="relative"
        cursor="pointer"
        maxW={{base: '15', md: '15'}}
        shadow="base"
        h="48"
        w="40"
        transition="0.25s all"
        role="group"
        _hover={{
          bg: 'orange.400',
        }}
        {...props}
      >
        <Text
          color="whiteAlpha.900"
          fontWeight="medium"
          textAlign="start"
          fontSize="xl"
        >
          New Design
        </Text>
        <Circle shadow="md" p="2" mt="2">
          <AddIcon color="whiteAlpha.900" />
        </Circle>
      </Flex>
    </Link>
  )
}
