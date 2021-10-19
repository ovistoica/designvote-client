import React, {useState} from 'react'
import {
  Text,
  Box,
  Flex,
  useColorModeValue as mode,
  Image,
  HStack,
  TextProps,
} from '@chakra-ui/react'
import {CarouselImage} from './current-zoomed-state'
import useKeyboardShortcut from 'use-keyboard-shortcut'
import {Key} from 'ts-key-enum'

const arrowStyles: TextProps = {
  cursor: 'pointer',
  pos: 'absolute',
  top: '50%',
  w: 'auto',
  mt: '-22px',
  p: '16px',
  fontWeight: 'bold',
  fontSize: '18px',
  transition: '0.6s ease',
  borderRadius: '0 3px 3px 0',
  userSelect: 'none',
  _hover: {
    opacity: 0.8,
    bg: 'black',
  },
}

interface ImageCarouselProps {
  images: CarouselImage[]
  startSlide?: number
}

export const ImageCarousel = ({images, startSlide}: ImageCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(startSlide ?? 0)

  const slidesCount = images.length

  const prevSlide = React.useCallback(() => {
    setCurrentSlide(s => (s === 0 ? slidesCount - 1 : s - 1))
  }, [slidesCount])
  const nextSlide = React.useCallback(() => {
    setCurrentSlide(s => (s === slidesCount - 1 ? 0 : s + 1))
  }, [slidesCount])

  const setSlide = (slide: number) => {
    setCurrentSlide(slide)
  }
  const carouselStyle = {
    transition: 'all .5s',
    ml: `-${currentSlide * 100}%`,
  }

  useKeyboardShortcut([Key.ArrowLeft], prevSlide)
  useKeyboardShortcut([Key.ArrowRight], nextSlide)

  return (
    <Flex
      w="full"
      bg={mode('gray.200', 'gray.700')}
      p={10}
      alignItems="center"
      justifyContent="center"
      onClick={e => {
        e.stopPropagation()
      }}
    >
      <Flex w="full" overflow="hidden" pos="relative">
        <Flex maxH="800px" w="full" {...carouselStyle}>
          {images.map((slide, index) => (
            <Box key={`slide-${slide.versionId}`} boxSize="full" flex="none">
              <Text fontSize="xs" p="8px 12px" pos="absolute" top="0">
                {index + 1} / {slidesCount}
              </Text>
              <Image
                src={slide.url}
                h="full"
                boxSize="full"
                objectFit="contain"
                backgroundSize="cover"
                cursor="zoom-in"
              />
            </Box>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({length: slidesCount}).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={{base: '7px', lg: '15px'}}
              m="0 2px"
              bg={
                currentSlide === slide
                  ? mode('orange.500', 'orange.300')
                  : mode('blackAlpha.500', 'gray.500')
              }
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{bg: 'blackAlpha.800'}}
              onClick={() => setSlide(slide)}
            />
          ))}
        </HStack>
      </Flex>
    </Flex>
  )
}
