import {
  Box,
  Flex,
  HTMLChakraProps,
  Icon,
  Link,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'
import * as React from 'react'

interface DesktopNavLinkProps extends HTMLChakraProps<'a'> {
  active?: boolean
  to?: string
}

const DesktopNavLink = (props: DesktopNavLinkProps) => {
  const {active, ...rest} = props
  return (
    <Link
      as={RouterLink}
      aria-current={active ? 'page' : undefined}
      // fontWeight="semibold"
      color={mode('gray.600', 'gray.300')}
      {...rest}
      _activeLink={{
        color: mode('orange.600', 'orange.300'),
        // fontWeight: 'bold',
      }}
    />
  )
}

interface MobileNavLinkProps {
  icon: React.ElementType
  children: React.ReactNode
  to?: string
}

const MobileNavLink = (props: MobileNavLinkProps) => {
  const {icon, children, to} = props
  return (
    <Flex
      as={RouterLink}
      to={to as any}
      m="-3"
      p="3"
      align="center"
      rounded="md"
      cursor="pointer"
      _hover={{bg: mode('gray.50', 'gray.600')}}
    >
      <Icon as={icon} color={mode('orange.600', 'orange.400')} fontSize="xl" />
      <Box
        marginStart="3"
        fontWeight="medium"
        color={mode('gray.600', 'gray.300')}
      >
        {children}
      </Box>
    </Flex>
  )
}

export const NavLink = {
  Desktop: DesktopNavLink,
  Mobile: MobileNavLink,
}
