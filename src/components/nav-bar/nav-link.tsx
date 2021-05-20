import {
  Box,
  Flex,
  HTMLChakraProps,
  Icon,
  Link,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import * as React from 'react'

interface DesktopNavLinkProps extends HTMLChakraProps<'a'> {
  active?: boolean
  href?: string
}

const DesktopNavLink = (props: DesktopNavLinkProps) => {
  const {active, href = '', ...rest} = props
  return (
    <NextLink href={href}>
      <Link
        aria-current={active ? 'page' : undefined}
        fontWeight="semibold"
        color={mode('gray.600', 'gray.300')}
        {...rest}
        _activeLink={{
          color: mode('orange.600', 'orange.300'),
          fontWeight: 'bold',
        }}
      />
    </NextLink>
  )
}

interface MobileNavLinkProps {
  icon: React.ElementType
  children: React.ReactNode
  href?: string
}

const MobileNavLink = (props: MobileNavLinkProps) => {
  const {icon, children, href = ''} = props
  return (
    <NextLink href={href}>
      <Flex m="-3" p="3" align="center" rounded="md" cursor="pointer">
        <Icon
          as={icon}
          color={mode('orange.600', 'orange.400')}
          fontSize="xl"
        />
        <Link
          _hover={{bg: mode('gray.50', 'gray.600')}}
          marginStart="3"
          fontWeight="medium"
          color={mode('gray.600', 'gray.300')}
        >
          {children}
        </Link>
      </Flex>
    </NextLink>
  )
}

export const NavLink = {
  Desktop: DesktopNavLink,
  Mobile: MobileNavLink,
}
