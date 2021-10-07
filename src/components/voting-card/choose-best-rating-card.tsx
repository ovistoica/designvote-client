import {useColorModeValue as mode} from '@chakra-ui/color-mode'
import {getChosen, useVoteDesignState} from 'store/vote-design'
import {Center, Circle, Flex, Stack, Text} from '@chakra-ui/layout'
import {Image} from '@chakra-ui/image'
import {CheckIcon} from '@chakra-ui/icons'
import {NormalizedDesign} from 'types'

interface ChooseBestCardProps {
  versionId: string
  index: number
  designData: NormalizedDesign
}

export function ChooseBestVotingCard({
  designData,
  versionId,
  index,
}: ChooseBestCardProps) {
  const {versions, design} = designData
  const {imageUrl} = versions[versionId]
  const setChosen = useVoteDesignState(state => state.setChosen)
  const currentChosen = useVoteDesignState(getChosen(design.designId))
  const isChosen = currentChosen === versionId
  const selectedColor = mode('teal.500', 'teal.400')
  const defaultColor = mode('gray.300', 'gray.600')

  return (
    <Stack spacing={1}>
      <Text
        alignSelf="flex-start"
        ml={2}
        color={mode('gray.500', 'gray.300')}
        fontSize="xl"
      >
        #{index + 1}
      </Text>
      <Flex
        py={1}
        key={imageUrl}
        direction="column"
        position="relative"
        bg={mode('inherit', 'gray.700')}
        flex="0"
        boxShadow="base"
        role="group"
        transition="0.25s all"
        cursor="zoom-in"
        _hover={{
          boxShadow: '2xl',
          bg: mode('inherit', 'gray.600'),
        }}
        alignItems="center"
      >
        <Image
          src={imageUrl}
          objectFit="contain"
          boxSize="15em"
          align="center"
        />
      </Flex>
      <Center
        pt={2}
        cursor="pointer"
        onClick={() => setChosen(design.designId, versionId)}
      >
        <Circle
          size="md"
          bg={isChosen ? selectedColor : defaultColor}
          h="2em"
          w="2em"
        >
          {isChosen ? <CheckIcon color="white" /> : null}
        </Circle>
      </Center>
    </Stack>
  )
}
