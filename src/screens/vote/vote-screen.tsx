import * as React from 'react'
import {Flex, Heading, Stack, Text} from '@chakra-ui/react'
import {Button, Container, FullPageSpinner} from 'components/lib'
import {useParams} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import {useUrlDesign} from 'utils/design-query'
import {useVoteDesignVersion} from 'utils/design-query'
import {MobileVersions} from './mobile-vote'
import {WebVote} from './web-vote'
import {useIsMobile} from 'utils/hooks'
import {MetaDecorator} from 'components/meta-decorator'

export function VoteDesign() {
  const {shortUrl} = useParams()
  const {data, isLoading} = useUrlDesign(shortUrl)
  const {design} = data
  const {
    mutate: vote,
    isSuccess,
    isLoading: isVoteLoading,
  } = useVoteDesignVersion(design.designId)
  const [selectedVersion, setSelectedVersion] = React.useState<
    string | undefined
  >()
  const [cookies, setCookie] = useCookies([shortUrl])
  const deviceIsMobile = useIsMobile()

  const {voted} = cookies[shortUrl] ?? {voted: false}

  React.useEffect(() => {
    if (!voted && isSuccess) {
      setCookie(shortUrl, {voted: true})
    }
  }, [isSuccess, setCookie, shortUrl, voted])

  if (isLoading || isVoteLoading) {
    return <FullPageSpinner />
  }

  return (
    <Container>
      <Flex
        flex="1"
        align="center"
        flexDir="column"
        justify="center"
        minH="100vh"
      >
        <MetaDecorator
          title="Designvote - Vote on a design"
          description="This is the public voting page. A designer shared their design link with you for you to vote on their versions"
        />
        {voted ? (
          <Text fontSize="xl">Thank you for voting!</Text>
        ) : (
          <>
            <Stack mb="1em" w="100%" p="1em">
              <Heading>{design.question}</Heading>
              {design.description ? (
                <Text fontWeight="300" fontSize="xl">
                  {design.description}
                </Text>
              ) : null}

              {/* use mobile type of designs only when opening from desktop  */}
              {design.designType === 'mobile' && !deviceIsMobile ? (
                <MobileVersions
                  selectedVersion={selectedVersion}
                  shortUrl={shortUrl}
                  onVersionClick={setSelectedVersion}
                />
              ) : (
                <WebVote
                  selectedVersion={selectedVersion}
                  shortUrl={shortUrl}
                  onVersionClick={setSelectedVersion}
                />
              )}
            </Stack>

            <Button
              variant="secondary"
              w="12.5em"
              mt="1em"
              disabled={!selectedVersion}
              onClick={() => {
                if (!selectedVersion) {
                  throw new Error('Voted version must be a valid ID')
                }
                vote(selectedVersion)
              }}
            >
              Choose
            </Button>
          </>
        )}
      </Flex>
    </Container>
  )
}
