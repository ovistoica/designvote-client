import * as React from 'react'
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
import {useNavigate, useParams} from 'react-router-dom'
import {useDesign} from 'utils/designs'
import {ArrowUpIcon} from '@chakra-ui/icons'
import {DesignStats} from './design-stats'
import {MobileDesignVersions} from './mobile-versions'
import {WebVersions} from './web-versions'

function Design() {
  const {designId} = useParams()
  const {data, isLoading, isSuccess} = useDesign(designId)
  const {design, versions, pictures, opinions} = data
  const navigate = useNavigate()

  const versionsLength = data.design?.versions?.length ?? 0

  // If no versions were created redirect user
  // to upload design versions
  React.useLayoutEffect(() => {
    if (isSuccess && !versionsLength) {
      navigate(`/upload-design/${designId}`)
    }
  }, [versionsLength, designId, isSuccess, navigate])

  if (isLoading) {
    return <FullPageSpinner />
  }

  const totalVotes = design.totalVotes
  const totalOpinions = design.opinions?.length ?? 0

  return (
    <Flex flex="1" flexDir="column">
      <SimpleGrid
        column={2}
        gridTemplateColumns="2fr 1fr"
        columnGap="2.5em"
        alignItems="center"
      >
        <Stack maxW="40em" align="flex-start">
          <Heading fontSize="2rem">{design.question}</Heading>
          {design.description ? (
            <Text fontWeight="300" fontSize="xl">
              {design.description}
            </Text>
          ) : null}
        </Stack>
        {design.designType !== 'web' ? (
          <DesignStats
            totalVotes={totalVotes}
            totalOpinions={totalOpinions}
            designId={designId}
          />
        ) : null}
      </SimpleGrid>
      {design.designType === 'web' ? (
        <WebVersions designId={designId} versionsById={design.versions ?? []} />
      ) : (
        <MobileDesignVersions
          designId={designId}
          versionsById={design.versions ?? []}
        />
      )}

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
            <div key={`k${opinionId}`}>
              <SimpleGrid
                key={`${opinionId}${index}`}
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
                />
              </SimpleGrid>
              {index !== array.length - 1 ? (
                <Divider key={`divider${opinion}`} />
              ) : null}
            </div>
          )
        })}
      </Stack>
    </Flex>
  )
}

export {Design}
