import {
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {Stamp, Comment} from 'assets/icons'
import {FaShare, FaStar} from 'react-icons/fa'

interface DesignStatsProps {
  votes: number
  opinions: number
}
export function DesignStats({votes, opinions}: DesignStatsProps) {
  const statsBg = mode('white', 'gray.700')
  const iconColor = mode('#1A202C', 'rgba(255, 255, 255, 0.92)')
  return (
    <Flex
      flexDir="column"
      shadow="base"
      w="22em"
      h="15em"
      p="4"
      bg={statsBg}
      rounded="md"
      align="center"
      justify="space-evenly"
    >
      <Flex w="100%" justify="center">
        <Stack p="1em" w="49%" align="center">
          <Stamp fill={iconColor} />
          <Text fontWeight="bold">{votes}</Text>
          <Text>Vote{votes !== 1 ? 's' : ''}</Text>
        </Stack>
        <Divider orientation="vertical" />
        <Stack p="1em" w="49%" align="center">
          <Comment fill={iconColor} />
          <Text fontWeight="bold">{opinions}</Text>
          <Text>Opinions</Text>
        </Stack>
      </Flex>
      <HStack gridTemplateColumns="1fr 1fr" w="full" pt="8">
        <Button
          colorScheme="orange"
          variant="outline"
          w="full"
          leftIcon={<FaStar />}
        >
          Favorite
        </Button>
        <Button
          colorScheme="orange"
          variant="outline"
          w="full"
          leftIcon={<FaShare />}
        >
          Share
        </Button>
      </HStack>
    </Flex>
  )
}
