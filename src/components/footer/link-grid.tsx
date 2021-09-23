import {
  Box,
  DarkMode,
  Link,
  SimpleGrid,
  SimpleGridProps,
  Stack,
} from '@chakra-ui/react'
import {useAuth} from 'context/auth-context'
import {Link as RouterLink, useLocation} from 'react-router-dom'
import {FooterHeading} from './footer-heading'

export const LinkGrid = (props: SimpleGridProps) => {
  const {login} = useAuth()
  const {pathname} = useLocation()
  return (
    <DarkMode>
      <SimpleGrid columns={2} {...props}>
        <Box minW="130px">
          <FooterHeading mb="4">Product</FooterHeading>
          <Stack>
            <Link color="gray.200" onClick={login}>
              Sign in
            </Link>
            <Link as={RouterLink} to="/pricing">
              Pricing
            </Link>
            <Link
              as={RouterLink}
              to="/"
              onClick={() => {
                if (pathname === '/') {
                  window.scrollTo({top: 0})
                }
              }}
            >
              Features
            </Link>
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
    </DarkMode>
  )
}
