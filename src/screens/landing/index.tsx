import {Box} from '@chakra-ui/react'
import {HeroSection} from './hero-section'
import {TestimonialSection} from './testimonials-section'
import {FeedbackSection} from './feedback-section'
import {FeaturesSection} from './features-section'

export const LandingPage = () => {
  return (
    <Box>
      <HeroSection />
      <TestimonialSection />
      <FeedbackSection />
      <FeaturesSection />
    </Box>
  )
}
