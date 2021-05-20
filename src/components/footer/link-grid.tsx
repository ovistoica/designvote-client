import {Box, Link, SimpleGrid, SimpleGridProps, Stack} from '@chakra-ui/react'
import {useAuth} from 'context/auth-context'
import NextLink from 'next/link'
import {FooterHeading} from './footer-heading'

export const LinkGrid = (props: SimpleGridProps) => {
  const {login} = useAuth()
  return (
    <SimpleGrid columns={2} {...props}>
      <Box minW="130px">
        <FooterHeading mb="4">Product</FooterHeading>
        <Stack>
          <Link onClick={login}>Sign in</Link>
          <Link as={NextLink} href="/pricing">
            Pricing
          </Link>
          <Link as={NextLink} href="/">
            Features
          </Link>
          <Link href="mailto:ovidiu.stoica1094@gmail.com">Contact</Link>
        </Stack>
      </Box>
      <Box minW="130px">
        <FooterHeading mb="4">Legal</FooterHeading>
        <Stack>
          <Link as={NextLink} href="/privacy">
            Privacy
          </Link>
          <Link as={NextLink} href="/terms">
            Terms
          </Link>
        </Stack>
      </Box>
    </SimpleGrid>
  )
}
