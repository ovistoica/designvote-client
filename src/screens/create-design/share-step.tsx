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
import {useCreateFromDraft} from 'utils/design-query'
import {useDesign} from 'utils/design-query'
import {useNavigate} from 'react-router'
import {useCreateDesignStore} from 'store'
import {CreateDesignStep} from 'types'

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

export function ShareStep() {
  const {
    mutate,
    data: designId,
    isSuccess,
    isIdle,
    isLoading: isCreateLoading,
  } = useCreateFromDraft()
  const designDraft = useCreateDesignStore(
    React.useCallback(
      state => ({
        name: state.name ?? '',
        description: state.description ?? '',
        type: state.type,
        question: state.question ?? '',
        voteStyle: state.voteStyle,
      }),
      [],
    ),
  )
  const {data, isLoading, isSuccess: designLoaded} = useDesign(designId ?? '', {
    enabled: isSuccess,
  })
  const setStep = useCreateDesignStore(
    React.useCallback(state => state.setStep, []),
  )

  const isDesignLoading = isCreateLoading || isLoading

  const {design} = data
  const pressedGenerateLink = !isIdle

  // get current website link (for production and development)
  const end = window.location.href.lastIndexOf(`/create`)
  const websiteLink = window.location.href.slice(0, end)
  const link = isLoading
    ? 'Loading ...'
    : `${websiteLink}/vote/${design.shortUrl}`

  const navigate = useNavigate()

  React.useEffect(() => {
    if (designLoaded) {
      navigate(`/manage-design/${design.designId}`)
    }
  }, [design.designId, designLoaded, navigate])

  if (!designDraft.name || !designDraft.question) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You are missing the name or the targeted question for this design
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setStep(CreateDesignStep.Create)}
          colorScheme="brand"
        >
          Go back and complete
        </Button>
      </Stack>
    )
  }

  return (
    <Flex direction="column" align="center" mt="1em">
      {designLoaded ? (
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
      ) : (
        <>
          <Heading fontWeight="500" fontSize="xl" textAlign="center">
            Generate share link!
          </Heading>
          <Text mt=".5em" w="md" textAlign="center">
            If you are happy with how your design looks, go ahead and generate a
            share link, which will appear below!
          </Text>
          <Button
            colorScheme="brand"
            mt="2em"
            leftIcon={<LinkIcon />}
            onClick={() => mutate()}
            isLoading={isDesignLoading}
            disabled={designLoaded}
          >
            Generate link
          </Button>
        </>
      )}

      <Divider my="2em" />

      {pressedGenerateLink ? (
        <Link isLoading={isDesignLoading} link={link} />
      ) : null}
    </Flex>
  )
}
