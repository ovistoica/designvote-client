import {AddIcon} from '@chakra-ui/icons'
import {
  Circle,
  Flex,
  FlexProps,
  Link,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {useNavigate, Link as RouterLink} from 'react-router-dom'
import {useCanCreateDesigns} from 'utils/hooks'

interface DesignCardProps extends FlexProps {}

const TrialExpiredCard = () => (
  <Flex
    position="absolute"
    bg={mode('orange.50', 'orange.800')}
    zIndex="overlay"
    top="0"
    bottom="0"
    direction="column"
    left="0"
    right="0"
    rounded="md"
    transition="0.25s all"
    role="group"
    opacity="0.5"
    _hover={{opacity: '1'}}
  >
    <Text
      color="orange.800"
      fontSize="sm"
      p="2"
      opacity="0"
      _groupHover={{opacity: '1'}}
    >
      Designvote limit reached!
    </Text>
    <Link
      as={RouterLink}
      to="/checkout"
      p="2"
      pt="1"
      textDecor="underline"
      // color="blackAlpha.800"
      opacity="0"
      _groupHover={{opacity: '1'}}
    >
      Upgrade to create more
    </Link>
  </Flex>
)

export const CreateDesignCard = (props: DesignCardProps) => {
  const navigate = useNavigate()
  const canCreate = useCanCreateDesigns()

  return (
    <>
      <Flex
        aria-label="Add design"
        direction="column"
        alignItems="center"
        rounded="md"
        justify="center"
        bg={mode('orange.500', 'orange.500')}
        p="4"
        position="relative"
        cursor={canCreate ? 'pointer' : undefined}
        maxW={{base: '15', md: '15'}}
        shadow="base"
        h="48"
        w="40"
        transition="0.25s all"
        role="group"
        onClick={() => canCreate && navigate('/create')}
        _hover={{
          bg: 'orange.400',
        }}
        {...props}
      >
        {!canCreate ? <TrialExpiredCard /> : null}
        <Text
          color="whiteAlpha.900"
          fontWeight="medium"
          textAlign="start"
          fontSize="xl"
        >
          {canCreate ? 'New Design' : undefined}
        </Text>
        <Circle shadow="md" p="2" mt={canCreate ? '2' : undefined}>
          <AddIcon color="whiteAlpha.900" />
        </Circle>
      </Flex>
    </>
  )
}
