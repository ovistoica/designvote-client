import {LinkIcon} from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useClipboard,
  useColorModeValue as mode,
  useToast,
} from '@chakra-ui/react'
import {usePoll} from 'utils/design-query'

import {DesignInfoTab, PreviewTab, ResultsTab, VersionsTab} from './tabs'
import {useRouter} from 'next/router'
import {AppContainer} from '../../components/app-container'

const ManagePollPage = () => {
  const router = useRouter()
  const {pollId} = router.query
  const {
    data: {poll},
    isLoading,
  } = usePoll(pollId as string)

  const websiteLink =
    typeof window === 'undefined'
      ? 'Building on server'
      : window.location.origin
  const link = isLoading
    ? 'Loading ...'
    : `${websiteLink}/vote/${poll.shortUrl}`
  const {onCopy} = useClipboard(link)
  const toast = useToast()

  const onCopyLinkPress = () => {
    onCopy()
    toast({
      title: 'Link copied to clipboard.',
      description: 'Design link copied to clipboard',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <AppContainer>
      <Tabs isFitted colorScheme="orange" defaultIndex={3}>
        <Flex direction="column" align="stretch">
          <Box
            position={{base: 'fixed', md: 'relative'}}
            bg={{base: mode('gray.50', 'gray.800'), md: 'transparent'}}
            zIndex="dropdown"
          >
            <Box mx="auto">
              <Flex
                direction={{base: 'column', md: 'row'}}
                justify={{base: 'center', md: 'space-between'}}
                align="flex-start"
                mb={{base: '2', md: '10'}}
                px={{base: '6', md: '8'}}
              >
                <HStack mb={{base: '4', md: '0'}}>
                  <Heading size="lg">{poll.name ?? 'Loading'}</Heading>
                  <Text color={mode('gray.500', 'gray.300')} fontSize="sm">
                    ({poll.totalVotes} Vote{poll.totalVotes === 1 ? '' : 's'})
                  </Text>
                </HStack>

                <HStack spacing={{base: '2', md: '4'}}>
                  <Button
                    colorScheme="orange"
                    leftIcon={<LinkIcon />}
                    fontSize="sm"
                    onClick={onCopyLinkPress}
                  >
                    Share link
                  </Button>
                </HStack>
              </Flex>

              <Flex
                justify={{base: 'center', md: 'space-between'}}
                align="center"
              >
                <TabList
                  border="0"
                  position="relative"
                  zIndex={1}
                  w={{base: '100%', md: 'auto'}}
                >
                  <Tab fontWeight="semibold">Design</Tab>
                  <Tab fontWeight="semibold">Versions</Tab>
                  <Tab fontWeight="semibold">Preview</Tab>
                  <Tab fontWeight="semibold">Results</Tab>
                </TabList>
              </Flex>
            </Box>
            <Box pos="relative">
              <Divider
                borderBottomWidth="2px"
                opacity={1}
                borderColor={mode('gray.100', 'gray.700')}
              />
            </Box>
          </Box>
          {isLoading ? (
            <Center mt={8} pt={{base: '10rem', md: '0'}}>
              <Spinner />
            </Center>
          ) : (
            <Box flex="1">
              <Box mx="auto">
                <TabPanels
                  mt="0"
                  h="full"
                  w="full"
                  pt={{base: '10rem', md: '0'}}
                >
                  <TabPanel>
                    <DesignInfoTab pollId={pollId as string} />
                  </TabPanel>
                  <TabPanel>
                    <VersionsTab pollId={pollId as string} />
                  </TabPanel>
                  <TabPanel>
                    <PreviewTab pollId={pollId as string} />
                  </TabPanel>
                  <TabPanel>
                    <ResultsTab designId={pollId as string} />
                  </TabPanel>
                </TabPanels>
              </Box>
            </Box>
          )}
        </Flex>
      </Tabs>
    </AppContainer>
  )
}

export default ManagePollPage
