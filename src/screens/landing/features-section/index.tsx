import * as React from 'react'
import {
  Box,
  forwardRef,
  Center,
  DarkMode,
  Heading,
  SimpleGrid,
  HTMLChakraProps,
  chakra,
} from '@chakra-ui/react'
import {useRef} from 'react'
import {
  FcComments,
  FcDoughnutChart,
  FcLink,
  FcMultipleDevices,
  FcRating,
  FcTimeline,
} from 'react-icons/fc'
import {useInViewport} from 'react-in-viewport'

import {Feature} from './feature'
import {HTMLMotionProps, motion} from 'framer-motion'

type Merge<P, T> = Omit<P, keyof T> & T
type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>
const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div)

// 2. You'll get access to `motion` and `chakra` props in `MotionBox`
function Example() {
  return (
    <MotionBox
      boxSize="40px"
      bg="red.300"
      drag="x"
      dragConstraints={{left: -100, right: 100}}
      whileHover={{scale: 1.1}}
      whileTap={{scale: 0.9}}
    />
  )
}

export const FeaturesSection = () => {
  const gridRef = React.createRef<HTMLDivElement>()
  const {inViewport} = useInViewport(
    gridRef,
    undefined,
    {
      disconnectOnLeave: true,
    },
    {},
  )
  return (
    <Center
      as="section"
      bg="blue.700"
      py={{base: '8', md: '16'}}
      h={{base: 'auto', md: '3xl', lg: '2xl'}}
    >
      <Box maxW={{base: 'xl', md: '8xl'}} mx="auto" px={{base: '6', md: '6'}}>
        <DarkMode>
          <Heading
            as="h2"
            fontWeight="medium"
            color="white"
            textAlign="center"
            letterSpacing="wide"
            size="2xl"
            mb={{base: '8', md: '16', lg: '24'}}
          >
            Everything you need to get validation.
          </Heading>
          <SimpleGrid
            ref={gridRef}
            columns={{base: 1, md: 2, lg: 3}}
            spacingX="10"
            spacingY={{base: '8', md: '14'}}
          >
            <Feature title="Share designs fast" icon={<FcLink />}>
              Seamlessy share surveys so you can start building the best
              versions.
            </Feature>
            <Feature title="Support for user comments" icon={<FcComments />}>
              Users can leave comments on every design so you can take the best
              from each variation.
            </Feature>
            <Feature
              title="Support for different voting styles"
              icon={<FcRating />}
            >
              Choose how your audience votes on your designs. Either choose the
              best version or rate each one with 1-5 stars.
            </Feature>
            <Feature title="Always up to date" icon={<FcTimeline />}>
              Feedback from users is displayed in real time.
            </Feature>
            <Feature
              title="Analyse results and draw conclusions"
              icon={<FcDoughnutChart />}
            >
              See which design variant performed better and why.
            </Feature>
            <Feature
              title="Support for multiple devices"
              icon={<FcMultipleDevices />}
            >
              Create, share and analyse design surveys even if you are on the
              move.
            </Feature>
          </SimpleGrid>
        </DarkMode>
      </Box>
    </Center>
  )
}
