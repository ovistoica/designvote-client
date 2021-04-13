import {LinkIcon} from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
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
import {useParams} from 'react-router'
import {useDesign} from 'utils/design-query'
import {DesignInfoTab, PreviewTab, ResultsTab, VersionsTab} from './tabs'

export const ManageDesign = () => {
  const {designId} = useParams()
  const {
    data: {design},
    isLoading,
  } = useDesign(designId)

  // get current website link (for production and development)
  const end = window.location.href.lastIndexOf(`/design`)
  const websiteLink = window.location.href.slice(0, end)
  const link = isLoading
    ? 'Loading ...'
    : `${websiteLink}/vote/${design.shortUrl}`
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
    <Tabs isFitted colorScheme="brand" defaultIndex={3}>
      <Flex
        direction="column"
        align="stretch"
        minH="100vh"
        pt={{base: '5em', md: '5em'}}
      >
        <Box bg={mode('gray.50', 'gray.800')}>
          <Box maxW="7xl" mx="auto">
            <Flex
              direction={{base: 'column', md: 'row'}}
              justify="space-between"
              align="flex-start"
              mb="10"
              px="8"
            >
              <HStack mb={{base: '4', md: '0'}}>
                <Heading size="lg">{design.name ?? 'Loading'}</Heading>
                <Text color={mode('gray.500', 'gray.300')} fontSize="sm">
                  ({design.totalVotes} Vote{design.totalVotes === 1 ? '' : 's'})
                </Text>
              </HStack>

              <HStack spacing={{base: '2', md: '4'}}>
                <Button
                  colorScheme="brand"
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
              px={{base: '0', md: '8'}}
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
        </Box>
        <Box pos="relative" zIndex={0}>
          <Divider
            borderBottomWidth="2px"
            opacity={1}
            borderColor={mode('gray.100', 'gray.700')}
          />
        </Box>
        <Box px="4" flex="1">
          <Box maxW="7xl" mx="auto">
            <TabPanels mt="2" h="full">
              <TabPanel>
                <DesignInfoTab designId={designId} />
              </TabPanel>
              <TabPanel>
                <VersionsTab designId={designId} />
              </TabPanel>
              <TabPanel>
                <PreviewTab designId={designId} />
              </TabPanel>
              <TabPanel>
                <ResultsTab designId={designId} />
              </TabPanel>
            </TabPanels>
          </Box>
        </Box>
      </Flex>
    </Tabs>
  )
}
