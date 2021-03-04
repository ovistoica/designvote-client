import {
  Divider,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/react'
import {FullPageSpinner} from 'components/lib'
import {useParams} from 'react-router-dom'
import {useDesign} from 'utils/designs'
import {ArrowUpIcon} from '@chakra-ui/icons'
import {DesignStats} from './design-stats'
import {DesignVersion} from './design-version'

function Design() {
  const {designId} = useParams()
  const {data, isLoading} = useDesign(designId)
  const {design, versions, pictures, opinions} = data

  if (isLoading) {
    return <FullPageSpinner />
  }

  const totalVotes = design.totalVotes
  const totalOpinions = design.opinions.length ?? 0

  return (
    <Flex flex="1" flexDir="column">
      <SimpleGrid
        column={2}
        gridTemplateColumns="2fr 1fr"
        columnGap="2.5em"
        alignItems="center"
      >
        <Stack maxW="40em" align="flex-start">
          <Heading fontSize="2rem">{design.name}</Heading>
          {/*//TODO: change this */}
          <Text fontWeight="300" fontSize="xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Stack>
        <DesignStats
          totalVotes={totalVotes}
          totalOpinions={totalOpinions}
          designId={designId}
        />
      </SimpleGrid>
      <SimpleGrid
        m="1em"
        column={3}
        gridTemplateColumns="repeat(3, 1fr)"
        columnGap="2em"
        alignContent="center"
        maxW="80%"
      >
        {design.versions.map(versionId => {
          return <DesignVersion versionId={versionId} designId={designId} />
        })}
      </SimpleGrid>

      {/* Opinions part */}
      <Stack maxW="80%" m="1em" p="1em" borderRadius="0.5em" boxShadow="base">
        <Text fontSize="xl">
          <Text as="span" fontWeight="bold">
            {totalOpinions}{' '}
          </Text>
          Opinions
        </Text>
        {design.opinions.map((opinionId, index, array) => {
          const {versionId, opinion} = opinions[opinionId]
          const version = versions[versionId]
          const pictureId = version.pictures[0]
          const {uri} = pictures[pictureId] ?? 'not found'

          return (
            <>
              <SimpleGrid
                key={opinionId}
                columns={3}
                gridTemplateColumns="1fr 6fr 1fr"
                columnGap="1em"
                align="center"
                p="1em"
              >
                <Stack
                  borderWidth="1px"
                  maxW="3em"
                  align="center"
                  justify="center"
                  color="info"
                  cursor="pointer"
                  borderRadius="0.5em"
                >
                  <ArrowUpIcon />
                  <Text>15</Text>
                </Stack>
                <Flex alignItems="center">
                  <Text>{opinion}</Text>
                </Flex>
                <Image
                  src={uri}
                  maxH="6em"
                  maxW="6em"
                  objectFit="contain"
                  borderRadius="0.5em"
                  resize="contain"
                />
              </SimpleGrid>
              {index !== array.length - 1 ? <Divider /> : null}
            </>
          )
        })}
      </Stack>
    </Flex>
  )
}

export {Design}
