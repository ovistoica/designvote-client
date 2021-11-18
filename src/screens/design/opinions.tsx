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
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {CommentInput} from 'components/comment-input'
import {Opinion} from 'types'
import {useUrlDesign} from 'api/design-query'
import {useAddOpinion} from 'api/design-voting-queries'
import {formatCreatedAt} from 'utils/date'
import {Comment} from 'assets/icons'
import {useAuth} from '../../context/auth-context'

interface OpinionsSectionProps {
  designUrl: string
}

function OpinionView({
  opinion,
  ownerName,
  ownerPicture,
  ownerNickname,
  createdAt,
}: Opinion) {
  return (
    <Grid
      gridTemplateColumns={{base: '2fr 12fr', md: '2fr 24fr', lg: '1fr 24fr'}}
      alignContent="center"
    >
      <Avatar
        mt={'1'}
        boxSize={{base: '1.5em', md: '1.8em'}}
        src={ownerPicture}
        name={ownerName}
      />
      <Stack spacing={1}>
        <HStack>
          <Text fontWeight="600" color={mode('gray.800', 'gray.200')}>
            {ownerName ?? ownerNickname}
          </Text>
          <Text fontSize="sm" color={mode('gray.500', 'gray.500')}>
            {formatCreatedAt(createdAt)}
          </Text>
        </HStack>
        <Text color={mode('gray.700', 'gray.300')}>{opinion}</Text>
      </Stack>
    </Grid>
  )
}

export function OpinionsSection({designUrl}: OpinionsSectionProps) {
  const {isAuthenticated, login} = useAuth()
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
      bg={mode('white', 'gray.700')}
      rounded="md"
      shadow="base"
    >
      <HStack>
        <Comment fill={mode('gray.700', 'gray.300')} />
        <Heading
          size="md"
          fontWeight="400"
          color={mode('gray.700', 'gray.300')}
        >
          {design.opinions.length} Opinions
        </Heading>
      </HStack>
      <CommentInput
        onClick={() => {
          if (!isAuthenticated) {
            login({
              appState: {
                returnTo: `${window.location.origin}/results/${designUrl}`,
              },
            })
          }
        }}
        onSubmit={submitOpinion}
        isLoading={isAddOpinionLoading}
      />
      <Stack divider={<StackDivider color="gray.200" />} mt="5" spacing="4">
        {design.opinions.map(opinion => {
          return (
            <OpinionView {...opinion} key={`opinion${opinion.opinionId}`} />
          )
        })}
      </Stack>
    </Box>
  )
}
