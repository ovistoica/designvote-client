import * as React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/modal'
import {Flex, Grid, GridItem, Heading, HStack, Text} from '@chakra-ui/layout'
import {CloseButton} from '@chakra-ui/close-button'
import {FormControl} from '@chakra-ui/form-control'
import {Input} from '@chakra-ui/input'
import {Image} from '@chakra-ui/image'
import {IconButton, Button} from '@chakra-ui/button'
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import {Design, VoteStyle} from 'types'
import {RiSendPlaneFill} from 'react-icons/ri'
import Rating from '@material-ui/lab/Rating'
import useKeyboardShortcut from 'use-keyboard-shortcut'
import {Key} from 'ts-key-enum'
import {useDesign, VoteFunction} from 'utils/design-query'
import {useColorModeValue as mode, useToken} from '@chakra-ui/react'
import {withStyles} from '@material-ui/core'
import {getRating, useVoteDesignState} from 'store/vote-design'
import {useVoterId} from 'utils/votes'

interface VersionModalProps {
  designId: string
  isOpen: boolean
  onClose: () => void
  initialVersionId: string
  onVote?: VoteFunction
}

interface UseMoveWithArrowKeysProps {
  currentIndex: number
  design: Design
  setNextVersion: (nextVersion: string) => void
}

/**
 * Change through the images using arrow keys
 * @param config
 */
function useMoveWithArrowKeys({
  currentIndex,
  design,
  setNextVersion,
}: UseMoveWithArrowKeysProps) {
  const goToPrevious = React.useCallback(() => {
    const totalDesigns = design.versions.length
    const nextIndex = currentIndex - 1 < 0 ? totalDesigns - 1 : currentIndex - 1
    setNextVersion(design.versions[nextIndex])
  }, [currentIndex, design.versions, setNextVersion])
  const goToNext = React.useCallback(() => {
    const totalDesigns = design.versions.length
    const nextIndex = totalDesigns - 1 === currentIndex ? 0 : currentIndex + 1
    setNextVersion(design.versions[nextIndex])
  }, [currentIndex, design.versions, setNextVersion])
  useKeyboardShortcut([Key.ArrowLeft], goToPrevious)
  useKeyboardShortcut([Key.ArrowRight], goToNext)

  return {goToPrevious, goToNext}
}

export function ImageCarouselModal({
  isOpen,
  onClose,
  initialVersionId,
  designId,
  onVote,
}: VersionModalProps) {
  const [versionId, setVersionId] = React.useState(initialVersionId)
  const {data} = useDesign(designId)
  const {design, versions, pictures} = data
  const currentIndex = design.versions.indexOf(versionId)

  const {
    pictures: [picId],
  } = versions[versionId]
  const {uri: imageUrl} = pictures[picId]

  // Move through images with arrow keys
  const {goToNext, goToPrevious} = useMoveWithArrowKeys({
    currentIndex,
    design,
    setNextVersion: setVersionId,
  })

  // Style the 5 star rating w dark mode
  const textColor = mode('gray.400', 'gray.600')
  const colorHex = useToken('colors', textColor)
  const StyledRating = withStyles({
    iconEmpty: {
      color: colorHex,
    },
  })(Rating)

  const voterId = useVoterId()
  const currentRating = useVoteDesignState(getRating(versionId))
  const setRating = useVoteDesignState(state => state.setRating)
  const setChosen = useVoteDesignState(state => state.setChosen)

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="full">
      <DrawerOverlay zIndex={99998}>
        <DrawerContent zIndex={99999}>
          <DrawerBody p="0" position="relative">
            <CloseButton
              onClick={onClose}
              position="absolute"
              size="lg"
              top={{base: 1, md: 2}}
              right={{base: 1, md: 2}}
              zIndex={999999}
            />
            <Grid
              maxH="100vh"
              gridTemplateColumns={{
                base: undefined,
                md: undefined,
                lg: '6fr 2fr',
              }}
              gridTemplateRows={{base: '2fr 6fr', lg: undefined}}
            >
              <GridItem position="relative" p={{base: 1, md: 4}}>
                <HStack position="absolute">
                  <IconButton
                    variant="ghost"
                    aria-label="previous version"
                    icon={<ChevronLeftIcon />}
                    onClick={goToPrevious}
                    fontSize={{base: '2xl', md: '4xl'}}
                  />
                  <Text fontWeight="bold" fontSize={{base: 'xl', md: 'xl'}}>
                    {currentIndex + 1} / {design.versions.length}
                  </Text>
                  <IconButton
                    variant="ghost"
                    aria-label="next version"
                    icon={<ChevronRightIcon />}
                    onClick={goToNext}
                    fontSize={{base: '2xl', md: '4xl'}}
                  />
                </HStack>
                <Flex direction="column" alignItems="center" flex={0}>
                  <Image
                    mt="2.8em"
                    src={imageUrl}
                    objectFit="contain"
                    align="center"
                    maxH={{base: '60vh', lg: '90vh'}}
                  />
                </Flex>
              </GridItem>
              <GridItem boxShadow="xl" position="relative" p={{base: 4, md: 4}}>
                <Heading fontWeight="400" fontSize="xl">
                  {design.name}{' '}
                  <Text as="span" color={mode('gray.500', 'gray.300')}>
                    #{currentIndex + 1}
                  </Text>
                </Heading>

                <Flex
                  borderTopWidth="1px"
                  borderBottomWidth="1px"
                  py="1em"
                  my="1em"
                >
                  {design.voteStyle === VoteStyle.Choose ? (
                    <Button
                      colorScheme="brand"
                      alignSelf="center"
                      size="md"
                      w="100%"
                      onClick={() => {
                        setChosen(designId, versionId)
                        onClose()
                      }}
                    >
                      Choose as best
                    </Button>
                  ) : (
                    <StyledRating
                      name={`rating for ${imageUrl}`}
                      precision={0.5}
                      defaultValue={currentRating ?? 0}
                      onChange={(e, rating) => {
                        onVote?.({
                          versionId,
                          rating,
                          voterId,
                          voteStyle: design.voteStyle,
                        })
                        if (typeof rating === 'number') {
                          setRating(versionId, rating)
                        }
                      }}
                      size="large"
                    />
                  )}
                </Flex>

                <FormControl id="opinion" maxW="40em" display="flex" pt="0.5em">
                  <Input
                    type="text"
                    as="textarea"
                    placeholder="Leave a comment"
                  />
                  <IconButton
                    colorScheme="brand"
                    marginInlineStart="0.5em"
                    aria-label="Send comment"
                    icon={<RiSendPlaneFill />}
                    variant="outline"
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}