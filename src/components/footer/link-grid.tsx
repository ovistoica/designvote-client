import {Box, Link, SimpleGrid, SimpleGridProps, Stack} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'
import {FooterHeading} from './footer-heading'

export const LinkGrid = (props: SimpleGridProps) => (
  <SimpleGrid columns={2} {...props}>
    <Box minW="130px">
      <FooterHeading mb="4">Product</FooterHeading>
      <Stack>
        <Link>How it works</Link>
        <Link>Pricing</Link>
        <Link>Use Cases</Link>
        <Link href="mailto:ovidiu.stoica1094@gmail.com">Contact</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">Legal</FooterHeading>
      <Stack>
        <Link as={RouterLink} to="/privacy">
          Privacy
        </Link>
        <Link as={RouterLink} to="/terms">
          Terms
        </Link>
      </Stack>
    </Box>
  </SimpleGrid>
)
