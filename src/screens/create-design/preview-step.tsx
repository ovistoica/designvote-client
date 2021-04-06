import {Button} from '@chakra-ui/button'
import {useColorModeValue} from '@chakra-ui/color-mode'
import {FormControl, FormLabel} from '@chakra-ui/form-control'
import {Image} from '@chakra-ui/image'
import {Input} from '@chakra-ui/input'
import {Box, Flex, Grid, Heading, Stack, Text} from '@chakra-ui/layout'
import {Check} from 'assets/icons'
import {useCallback} from 'react'
import {useCreateDesignStore} from 'store'
import {DesignStep} from 'types'

// TODO: Different design for choosing system
// TODO: Choose/vote inside modal
export function PreviewStep() {
  const design = useCreateDesignStore(
    useCallback(
      state => ({
        question: state.question,
        name: state.name,
        description: state.description,
        images: state.images,
        imagesByUrl: state.imagesByUrl,
        voteStyle: state.voteStyle,
      }),
      [],
    ),
  )
  const setStep = useCreateDesignStore(useCallback(state => state.setStep, []))
  const headerBg = useColorModeValue('white', 'gray.700')

  const numOfColumns = design.imagesByUrl.length === 2 ? 2 : 3

  if (!design.name || !design.question) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You are missing the name or the targeted question for this design
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setStep(DesignStep.Create)}
          colorScheme="brand"
        >
          Go back and complete
        </Button>
      </Stack>
    )
  }

  if (design.imagesByUrl.length < 2) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You need at least two versions of this design in order to publish it
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setStep(DesignStep.Upload)}
          colorScheme="brand"
        >
          Go back and upload
        </Button>
      </Stack>
    )
  }
  return (
    <Flex
      flex="1"
      align="center"
      flexDir="column"
      maxW={['512px', '1024px', '1440px']}
    >
      <Stack mb="1em" w="100%" p="1em" align="center">
        <Heading>{design.question}</Heading>
        {design.description ? (
          <Text fontWeight="300" fontSize="xl">
            {design.description}
          </Text>
        ) : null}
      </Stack>

      <Grid
        m="1em"
        mt="0em"
        column={numOfColumns}
        gridTemplateColumns={`repeat(${numOfColumns}, 1fr)`}
        rowGap="1em"
        columnGap="1.5em"
        alignContent="center"
      >
        {design.imagesByUrl.map((imageUrl, index) => {
          return (
            <Flex
              key={imageUrl}
              direction="column"
              position="relative"
              flex="0"
              boxShadow="base"
              role="group"
              transition="0.25s all"
              cursor="zoom-in"
              boxSize="15em"
              //   onClick={() => setSelectedVersion(versionId)}
              pb="1em"
            >
              <Image
                src={imageUrl}
                objectFit="cover"
                boxSize="15em"
                align="top"
              />
            </Flex>
          )
        })}
      </Grid>
      <FormControl id="opinion" maxW="40em" mt="1em">
        <FormLabel fontSize="sm">Leave opinion (optional)</FormLabel>
        <Input
          type="text"
          as="textarea"
          placeholder="Opinions help the designer to better understand your choice"
          minH="5em"
        />
      </FormControl>
      <Button
        w="12.5em"
        mt="1em"
        colorScheme="brand"
        // disabled={!selectedVersion}
      >
        Choose
      </Button>
    </Flex>
  )
}
