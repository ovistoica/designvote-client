import * as React from 'react'
import {Button} from '@chakra-ui/button'
import {useColorModeValue} from '@chakra-ui/color-mode'
import {FormControl} from '@chakra-ui/form-control'
import {useClipboard} from '@chakra-ui/hooks'
import {LinkIcon} from '@chakra-ui/icons'
import {Divider, Flex, Heading, Stack, Text} from '@chakra-ui/layout'
import {Spinner} from '@chakra-ui/spinner'
import {useToast} from '@chakra-ui/toast'
import {Alert, AlertDescription, AlertIcon, AlertTitle} from '@chakra-ui/alert'
import {useDesign, usePublishDesign} from 'utils/design-query'
import {DesignTab} from 'types'
import {useManageDesign} from 'store'

interface LinkProps {
  isLoading: boolean
  link: string
}

function Link({isLoading, link}: LinkProps) {
  const linkBackground = useColorModeValue('gray.100', 'gray.600')
  const {onCopy} = useClipboard(link)
  const toast = useToast()

  return isLoading ? (
    <Spinner />
  ) : (
    <FormControl>
      <Text textAlign="center" mb={1}>
        Share the link
      </Text>
      <Flex
        bg={linkBackground}
        p="0.8em"
        justify="space-between"
        align="center"
        borderRadius="10em"
        width="100%"
      >
        <Text>{link}</Text>
        <Button
          colorScheme="brand"
          borderRadius="10em"
          _focus={{}}
          _active={{}}
          color="white"
          leftIcon={<LinkIcon />}
          onClick={() => {
            onCopy()
            toast({
              title: 'Link copied to clipboard.',
              description: 'Design link copied to clipboard',
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
          }}
        >
          Copy
        </Button>
      </Flex>
    </FormControl>
  )
}

interface ShareTabProps {
  designId: string
}

export function ShareTab({designId}: ShareTabProps) {
  const {
    data: {design},
    isSuccess: designLoaded,
    isLoading: isDesignLoading,
  } = useDesign(designId)
  const {mutate: publish, isLoading: isPublishLoading} = usePublishDesign(
    designId,
  )
  const {setTab} = useManageDesign(
    React.useCallback(state => ({setTab: state.setTab}), []),
  )
  const isLoading = isDesignLoading || isPublishLoading

  // If the design is somehow not published, publish it
  React.useEffect(() => {
    if (designLoaded && !design.public) {
      publish()
    }
  }, [design.public, publish, designLoaded])

  // get current website link (for production and development)
  const end = window.location.href.lastIndexOf(`/manage-design`)
  const websiteLink = window.location.href.slice(0, end)
  const link = isLoading
    ? 'Loading ...'
    : `${websiteLink}/vote/${design.shortUrl}`

  if (!design.name || !design.question) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You are missing the name or the targeted question for this design
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setTab(DesignTab.Info)}
          colorScheme="brand"
        >
          Go back and complete
        </Button>
      </Stack>
    )
  }

  return (
    <Flex direction="column" align="center" mt="1em">
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="10em"
        borderRadius=".5em"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Design created!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Go ahead and share it with the people who matter!
        </AlertDescription>
      </Alert>

      <Divider my="2em" />

      <Link isLoading={isLoading} link={link} />
    </Flex>
  )
}
