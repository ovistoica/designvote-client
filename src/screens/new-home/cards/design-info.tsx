import {
  Image,
  Box,
  BoxProps,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
  Avatar,
} from '@chakra-ui/react'
import {FaStamp, FaComment} from 'react-icons/fa'
// import {HiCash} from 'react-icons/hi'
import {formatCreatedAt} from 'utils/date'

export const Card = (props: BoxProps) => (
  <Box
    maxW="3xl"
    mx="auto"
    bg={useColorModeValue('white', 'gray.700')}
    rounded={{md: 'xl'}}
    padding="10"
    px={{base: '0', md: '8', lg: '2', xl: '8'}}
    {...props}
  />
)

interface DesignProps {
  question: string
  img: string
  votes: number
  opinions: number
  createdAt: string
  onClick: () => void
  ownerPicture?: string
  ownerName: string
}

export function DesignInfo(props: DesignProps) {
  const timeAgo = formatCreatedAt(props.createdAt)
  return (
    <Card
      onClick={props.onClick}
      cursor="pointer"
      py={{base: '4', md: '10', lg: '4', xl: '10'}}
    >
      <Stack
        direction={{base: 'column', md: 'row'}}
        spacing={{base: '3', md: '10'}}
        align={{base: 'center', md: 'center'}}
      >
        <Stack spacing="4" alignItems="center">
          <Image src={props.img} rounded="lg" shadow="lg" h="full" />
        </Stack>
        <Box>
          <HStack>
            <Avatar size="xs" src={props.ownerPicture} name={props.ownerName} />
            <Text fontWeight="600" fontSize="sm">
              {props.ownerName}
            </Text>
            <Text color="gray.400" fontSize="sm">
              {timeAgo}
            </Text>
          </HStack>
          <Text as="h2" mt="2" fontWeight="bold" fontSize="xl">
            {props.question}
          </Text>
          <Wrap shouldWrapChildren my="4" spacing="4">
            <HStack>
              <Icon as={FaStamp} color="gray.400" />
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                <b>{props.votes}</b> vote{props.votes === 1 ? '' : 's'}
              </Text>
            </HStack>

            <HStack spacing="2">
              <Icon as={FaComment} color="gray.400" />
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                <b>{props.opinions}</b> opinion{props.opinions === 1 ? '' : 's'}
              </Text>
            </HStack>
          </Wrap>
          <Wrap
            shouldWrapChildren
            mt="5"
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            {['Adobe Photoshop', 'UX/UI', 'Landing Page', 'Web Design'].map(
              tag => (
                <Tag key={tag} color="inherit" px="3">
                  {tag}
                </Tag>
              ),
            )}
          </Wrap>
        </Box>
      </Stack>
    </Card>
  )
}
