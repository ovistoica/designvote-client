import {
  Flex,
  FlexProps,
  useColorModeValue,
  Image,
  ImageProps,
  StackProps,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import {FaStamp} from 'react-icons/fa'
import {HiBadgeCheck} from 'react-icons/hi'

interface CardWithPicture extends FlexProps {
  imageProps: ImageProps
}

export const CardWithImage = (props: CardWithPicture) => {
  const {children, imageProps, ...rest} = props
  return (
    <Flex
      direction="column"
      alignItems="center"
      rounded="md"
      padding="2"
      position="relative"
      bg={useColorModeValue('white', 'gray.700')}
      shadow={{md: 'base'}}
      {...rest}
    >
      <Image size="xl" rounded="lg" shadow="lg" {...imageProps} />
      {children}
    </Flex>
  )
}

interface VotesCountProps extends StackProps {
  count: number
}

export const VotesCount = (props: VotesCountProps) => {
  const {count, ...stackProps} = props
  return (
    <HStack
      spacing="1"
      fontSize="sm"
      color={useColorModeValue('gray.600', 'gray.400')}
      {...stackProps}
    >
      <Icon as={FaStamp} />
      <Text>
        {count} vote{count === 1 ? '' : 's'}
      </Text>
    </HStack>
  )
}

interface UserInfoProps extends StackProps {
  name: string
  isVerified?: boolean
}

export const UserInfo = (props: UserInfoProps) => {
  const {name, isVerified, ...stackProps} = props
  return (
    <VStack spacing="1" flex="1" {...stackProps}>
      <HStack>
        <Text fontWeight="bold">{name}</Text>
        {isVerified && (
          <Icon
            as={HiBadgeCheck}
            color="blue.300"
            verticalAlign="text-bottom"
          />
        )}
      </HStack>
      {/* <Text
        fontSize="sm"
        textAlign="center"
        noOfLines={2}
        color={useColorModeValue('gray.600', 'gray.400')}
      >
        {bio}
      </Text> */}
    </VStack>
  )
}
