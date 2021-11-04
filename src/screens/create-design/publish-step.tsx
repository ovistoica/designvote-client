import * as React from 'react'
import {Button} from '@chakra-ui/button'
import {CheckIcon} from '@chakra-ui/icons'
import {Flex, Heading, Stack, Text} from '@chakra-ui/layout'
import {useCreateDesignFromDraft} from 'api/design-query'
import {useDesign} from 'api/design-query'
import {useCreateDesignStore, useUploadDesignImagesStore} from 'store'
import {CreateDesignStep} from 'types'
import {useNavigate} from 'react-router'

export function PublishStep() {
  const navigate = useNavigate()
  const {
    mutate,
    data: designId,
    isSuccess,
    isLoading: isCreateLoading,
  } = useCreateDesignFromDraft()
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
  const images = useUploadDesignImagesStore(state => state.images)

  const {isLoading, isSuccess: designLoaded, data} = useDesign(designId ?? '', {
    enabled: isSuccess,
  })
  const setStep = useCreateDesignStore(
    React.useCallback(state => state.setStep, []),
  )

  const isDesignLoading = isCreateLoading || isLoading
  const notEnoughVersions = images.length < 2

  React.useEffect(() => {
    if (designLoaded && data.shortUrl) {
      navigate(`/results/${data.shortUrl}`)
    }
  }, [data.shortUrl, designLoaded, navigate])

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
          colorScheme="orange"
        >
          Go back and complete
        </Button>
      </Stack>
    )
  }

  if (notEnoughVersions) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="semibold" fontSize="xl">
          You need at least two versions of this design in order to publish it
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setStep(CreateDesignStep.Upload)}
          colorScheme="orange"
        >
          Go back and upload
        </Button>
      </Stack>
    )
  }

  return (
    <Flex direction="column" align="center" mt="8" mx="auto">
      <Heading fontWeight="semibold" fontSize="3xl" textAlign="center">
        Publish the design
      </Heading>
      <Text mt=".5em" w={{base: 'xs', md: 'sm'}} textAlign="center">
        If you are happy with how your design looks, go ahead and publish it so
        you can share it with the world
      </Text>
      <Button
        colorScheme="orange"
        mt="2em"
        leftIcon={<CheckIcon />}
        onClick={() => mutate()}
        isLoading={isDesignLoading}
        disabled={designLoaded}
      >
        Publish design
      </Button>
    </Flex>
  )
}
