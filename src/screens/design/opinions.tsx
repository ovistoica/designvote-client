import * as React from 'react'
import {
  Stack,
  Text,
  Box,
  StackDivider,
  Spinner,
  Avatar,
  HStack,
  Heading,
  Grid,
} from '@chakra-ui/react'
import {CommentInput} from 'components/comment-input'
import {Opinion} from 'types'
import {useUrlDesign} from 'api/design-query'
// import {usePublicUser} from 'api/user-query'
import {useAddOpinion} from 'api/design-voting-queries'
import {formatCreatedAt} from 'utils/date'

interface OpinionsSectionProps {
  designUrl: string
}

function OpinionView({opinion, name, picture, createdAt}: Opinion) {
  return (
    <Grid gridTemplateColumns="1fr 24fr" alignContent="center">
      <Avatar boxSize="1.8em" src={picture} name={name} />
      <Stack spacing={1}>
        <HStack>
          <Text fontWeight="600" color="gray.800">
            {name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {formatCreatedAt(createdAt)}
          </Text>
        </HStack>
        <Text color="gray.700">{opinion}</Text>
      </Stack>
    </Grid>
  )
}

export function OpinionsSection({designUrl}: OpinionsSectionProps) {
  const {data: design, isLoading} = useUrlDesign(designUrl)
  const {mutate: submitOpinion, isLoading: isAddOpinionLoading} = useAddOpinion(
    design.designId,
    designUrl,
  )
  if (isLoading) {
    return <Spinner />
  }

  return (
    <Box
      maxW={{base: 'xl', md: '5xl', lg: '6xl'}}
      mt="12"
      alignSelf="center"
      px={{base: '6', md: '8'}}
      py="4"
      bg="white"
      rounded="md"
      shadow="base"
    >
      <Heading size="md" fontWeight="400" color="gray.700">
        {design.opinions.length} Opinions
      </Heading>
      <CommentInput onSubmit={submitOpinion} isLoading={isAddOpinionLoading} />
      {design.opinions.length ? (
        <Stack divider={<StackDivider color="gray.200" />} mt="5" spacing="4">
          {design.opinions.map(opinion => {
            return (
              <OpinionView {...opinion} key={`opinion${opinion.opinionId}`} />
            )
          })}
        </Stack>
      ) : (
        <Text color="gray.400">Be the first to leave an opinion</Text>
      )}
    </Box>
  )
}
