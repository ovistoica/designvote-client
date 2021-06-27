import {Box} from '@chakra-ui/react'
import {Footer} from 'components/footer'
import {UnauthenticatedNavBar} from 'components/nav-bar'

import {CTASection} from './cta-section'
import {FeaturesSection} from './features-section'
import {FeedbackSection} from './feedback-section'
import {HeroSection} from './hero-section'
import {PhoneSection} from './phone-section'
import {TestimonialSection} from './testimonials-section'

export const LandingPage = () => (
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

export default LandingPage
