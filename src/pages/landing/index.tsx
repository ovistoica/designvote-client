import {Box} from '@chakra-ui/react'
import {HeroSection} from './hero-section'
import {TestimonialSection} from './testimonials-section'
import {FeedbackSection} from './feedback-section'
import {FeaturesSection} from './features-section'
import {PhoneSection} from './phone-section'
import {CTASection} from './cta-section'
import {Footer} from 'components/footer'
import {UnauthenticatedNavBar} from 'components/nav-bar'

export const LandingPage = () => {
  return (
    <Box>
      <UnauthenticatedNavBar />

      <HeroSection />
      <TestimonialSection />
      <FeedbackSection />
      <FeaturesSection />
      <PhoneSection />
      <CTASection />
      <Footer />
    </Box>
  )
}

export default LandingPage
