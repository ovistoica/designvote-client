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
import {FaShare} from 'react-icons/fa'
import {useShareDesignLink} from '../utils/hooks'

interface DesignStatsProps {
  votes: number
  opinions: number
  designUrl: string
}

export function DesignStats({votes, opinions, designUrl}: DesignStatsProps) {
  const statsBg = mode('white', 'gray.700')
  const iconColor = mode('#1A202C', 'rgba(255, 255, 255, 0.92)')
  const onCopyLinkPress = useShareDesignLink(designUrl)

  return (
    <Flex
      flexDir="column"
      shadow="base"
      maxW="22em"
      h="15em"
      p="4"
      bg={statsBg}
      rounded="md"
      align="center"
      justify="space-evenly"
      display={{base: 'none', md: 'flex'}}
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
          <Text>Opinion{opinions === 1 ? '' : 's'}</Text>
        </Stack>
      </Flex>
      <HStack gridTemplateColumns="1fr 1fr" w="full" pt="8">
        {/*<Button*/}
        {/*  colorScheme="orange"*/}
        {/*  variant="outline"*/}
        {/*  w="full"*/}
        {/*  leftIcon={<FaStar />}*/}
        {/*>*/}
        {/*  Favorite*/}
        {/*</Button>*/}
        <Button
          colorScheme="orange"
          variant="outline"
          w="full"
          onClick={onCopyLinkPress}
          leftIcon={<FaShare />}
        >
          Share
        </Button>
      </HStack>
    </Flex>
  )
}
