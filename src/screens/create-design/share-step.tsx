import {Button} from '@chakra-ui/button'
import {useColorModeValue} from '@chakra-ui/color-mode'
import {FormControl} from '@chakra-ui/form-control'
import {useClipboard} from '@chakra-ui/hooks'
import {LinkIcon} from '@chakra-ui/icons'

import {Divider, Flex, Heading, Text} from '@chakra-ui/layout'
import {useToast} from '@chakra-ui/toast'
import {useCreateFromDraft} from 'utils/design-query'
import {useDesign} from 'utils/design-query'
import {loadingDesign} from 'utils/loading-data'

export function ShareStep() {
  const toast = useToast()
  const {onCopy} = useClipboard('https://designvote/test-link')
  const linkBackground = useColorModeValue('gray.100', 'gray.600')
  const {mutate, data: designId} = useCreateFromDraft()
  const {data} = useDesign(designId ?? '', {
    enabled: !!designId,
  })

  const {design} = data ?? loadingDesign

  return (
    <Flex direction="column" align="center" mt="1em">
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
      >
        Generate link
      </Button>

      <Divider my="2em" />

      <FormControl>
        <Text textAlign="center">Share the link</Text>
        <Flex
          bg={linkBackground}
          p="0.8em"
          justify="space-between"
          align="center"
          borderRadius="10em"
          width="100%"
        >
          <Text>{design.shortUrl}</Text>
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
    </Flex>
  )
}
