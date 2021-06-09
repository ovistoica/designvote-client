import {Box} from '@chakra-ui/react'
import {HeroSection} from './hero-section'
import {TestimonialSection} from './testimonials-section'
import {FeedbackSection} from './feedback-section'
import {FeaturesSection} from './features-section'
import {PhoneSection} from './phone-section'
import {CTASection} from './cta-section'
import {Footer} from 'components/footer'
import {Helmet} from 'react-helmet'

export const LandingPage = () => {
  return (
    <Box>
      {
        // Track campaigns w clickmagick
        process.env.NODE_ENV === 'production' ? (
          <Helmet>
            <script type="text/javascript">
              {`var clickmagick_cmc = {
        uid: '145419',
        hid: '1945973',
        utm_source: 'organic',
      }`}
            </script>
            <script src="//cdn.clkmc.com/cmc.js"></script>
          </Helmet>
        ) : null
      }
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
