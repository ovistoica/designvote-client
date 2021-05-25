import * as React from 'react'

import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  Image,
  FormControl,
  useColorModeValue,
  CloseButton,
  IconButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Input,
} from '@chakra-ui/react'
import Rating from '@material-ui/lab/Rating'
import {useAuth} from 'context/auth-context'
import {RiSendPlaneFill} from 'react-icons/ri'
import {useCreateDesignStore} from 'store'
import {VoteStyle} from 'types'

interface VersionModalProps {
  isOpen: boolean
  onClose: () => void
  initialImage: string
}

export function PreviewDesignFullImageModal({
  isOpen,
  onClose,
  initialImage,
}: VersionModalProps) {
  const [imageUrl, setImageUrl] = React.useState(initialImage)
  const design = useCreateDesignStore(
    React.useCallback(
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
  const {user} = useAuth()
  const currentIndex = design.imagesByUrl.indexOf(imageUrl)
  const textInfoColor = useColorModeValue('textInfoLight', 'gray.400')

  const goToPrevious = React.useCallback(() => {
    const totalDesigns = design.imagesByUrl.length
    const nextIndex = currentIndex - 1 < 0 ? totalDesigns - 1 : currentIndex - 1
    setImageUrl(design.imagesByUrl[nextIndex])
  }, [currentIndex, design.imagesByUrl])

  const goToNext = React.useCallback(() => {
    const totalDesigns = design.imagesByUrl.length
    const nextIndex = totalDesigns - 1 === currentIndex ? 0 : currentIndex + 1
    setImageUrl(design.imagesByUrl[nextIndex])
  }, [currentIndex, design.imagesByUrl])

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="full">
      <DrawerOverlay zIndex={99998}>
        <DrawerContent zIndex={99999}>
          <DrawerBody p="0">
            <Grid
              w="100%"
              h="100%"
              gridTemplateColumns="6fr 2fr"
              columnGap="1em"
            >
              <GridItem p="1em" position="relative">
                <HStack position="absolute">
                  <IconButton
                    variant="ghost"
                    aria-label="previous version"
                    icon={<ChevronLeftIcon />}
                    onClick={goToPrevious}
                  />
                  <Text>
                    {currentIndex + 1} / {design.imagesByUrl.length}
                  </Text>
                  <IconButton
                    variant="ghost"
                    aria-label="next version"
                    icon={<ChevronRightIcon />}
                    onClick={goToNext}
                  />
                </HStack>
                <Flex w="100%" mb="1em" h="40px" alignItems="center">
                  <Heading fontWeight="400" fontSize="xl" m="0 auto">
                    {design.name}
                  </Heading>
                </Flex>
                <Image src={imageUrl} objectFit="contain" m="1em auto" />
              </GridItem>
              <GridItem boxShadow="xl" position="relative" p="2em 1em">
                <CloseButton
                  onClick={onClose}
                  position="absolute"
                  size="lg"
                  top={2}
                  right={2}
                />
                <Heading fontWeight="400" fontSize="xl">
                  #{currentIndex + 1}
                </Heading>

                {user ? (
                  <Text color={textInfoColor} fontStyle="italic">
                    {' '}
                    by {user.name}
                  </Text>
                ) : null}
                <Flex
                  borderTopWidth="1px"
                  borderBottomWidth="1px"
                  py="1em"
                  my="1em"
                >
                  {design.voteStyle === VoteStyle.Choose ? (
                    <Button
                      colorScheme="teal"
                      alignSelf="center"
                      size="md"
                      w="100%"
                    >
                      Choose as best
                    </Button>
                  ) : (
                    <Rating
                      name={`rating for ${imageUrl}`}
                      precision={0.5}
                      defaultValue={0}
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
                    colorScheme="teal"
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
