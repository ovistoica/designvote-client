import {
  Box,
  Center,
  Flex,
  Portal,
  SimpleGrid,
  useBoolean,
  useFocusOnShow,
  useColorModeValue as mode,
  VStack,
  Button,
  HStack,
  Avatar,
  Text,
} from '@chakra-ui/react'
import {useAuth} from 'context/auth-context'
import {HTMLMotionProps, motion, Variants} from 'framer-motion'
import * as React from 'react'
import FocusLock from 'react-focus-lock'
import {HiCog, HiOutlineMenu, HiOutlineX, HiHome} from 'react-icons/hi'
import {MdDesignServices} from 'react-icons/md'
import {RemoveScroll} from 'react-remove-scroll'
import {useNavigate} from 'react-router'
import {Logo} from '../logo'
import {NavLink} from './nav-link'

const variants: Variants = {
  show: {
    display: 'revert',
    opacity: 1,
    scale: 1,
    transition: {duration: 0.2, ease: 'easeOut'},
  },
  hide: {
    opacity: 0,
    scale: 0.98,
    transition: {duration: 0.1, ease: 'easeIn'},
    transitionEnd: {display: 'none'},
  },
}

const Backdrop = ({show, off}: {show?: boolean; off: () => void}) => (
  <Portal>
    <motion.div
      initial={false}
      animate={show ? 'show' : 'hide'}
      onClick={off}
      transition={{duration: 0.1}}
      variants={{
        show: {opacity: 1, display: 'revert'},
        hide: {opacity: 0, transitionEnd: {display: 'none'}},
      }}
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        background: 'rgba(0,0,0,0.2)',
        inset: 0,
      }}
    />
  </Portal>
)

const Transition = (props: HTMLMotionProps<'div'> & {in?: boolean}) => {
  const {in: inProp, ...rest} = props
  return (
    <motion.div
      {...rest}
      initial={false}
      variants={variants}
      animate={inProp ? 'show' : 'hide'}
      style={{
        transformOrigin: 'top right',
        position: 'absolute',
        width: 'calc(100% - 32px)',
        top: '24px',
        left: '16px',
        margin: '0 auto',
        zIndex: 100,
      }}
    />
  )
}

export const AuthenticatedMobileNav = () => {
  const [show, {toggle, off}] = useBoolean()
  const ref = React.useRef<HTMLDivElement>(null)
  useFocusOnShow(ref, {visible: show, shouldFocus: true})
  const navigate = useNavigate()
  const {user} = useAuth()

  return (
    <>
      <Box
        as="button"
        type="button"
        p="2"
        fontSize="2xl"
        color="gray.600"
        onClick={toggle}
        display={{base: 'block', lg: 'none'}}
      >
        <HiOutlineMenu />
      </Box>

      <Transition in={show}>
        <RemoveScroll enabled={show}>
          <Backdrop show={show} off={off} />
        </RemoveScroll>
        <FocusLock disabled={!show} returnFocus>
          <Box
            bg={mode('white', 'gray.700')}
            shadow="lg"
            rounded="lg"
            ref={ref}
            tabIndex={0}
            outline={0}
          >
            <Box pt="5" pb="6" px="5">
              <Flex justify="space-between" align="center">
                <Logo h="6" iconColor="orange.600" />
                <Box mr="-2" mt="-2">
                  <Center
                    as="button"
                    type="button"
                    onClick={off}
                    rounded="base"
                    p="1"
                    color={mode('gray.600', 'gray.400')}
                    _hover={{bg: mode('gray.100', 'gray.600')}}
                  >
                    <Box srOnly>Close menu</Box>
                    <HiOutlineX aria-hidden fontSize="1.5rem" />
                  </Center>
                </Box>
              </Flex>
              <HStack spacing="4" mt="8">
                <Avatar src={user?.picture} name={user?.name} size="sm" />
                <Box>
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {user?.email}
                  </Text>
                </Box>
              </HStack>
              <SimpleGrid as="nav" gap="8" mt="8" columns={{base: 1, sm: 2}}>
                <NavLink.Mobile icon={HiHome} to="/" onClick={off}>
                  Discover
                </NavLink.Mobile>
                <NavLink.Mobile
                  icon={MdDesignServices}
                  to="/my-designs"
                  onClick={off}
                >
                  My designs
                </NavLink.Mobile>
                <NavLink.Mobile icon={HiCog} to="/settings" onClick={off}>
                  Settings
                </NavLink.Mobile>
              </SimpleGrid>
              <VStack mt="8" spacing="4">
                <Button
                  w="full"
                  colorScheme="orange"
                  onClick={() => navigate('/create')}
                >
                  Create poll
                </Button>
                {/* <Button
                  w="full"
                  onClick={() => navigate('/create')}
                  leftIcon={<FaRegStar />}
                  fontWeight="regular"
                >
                  <Text as="span" fontWeight="bold" mr="1">
                    4
                  </Text>
                  Favorites
                </Button> */}
              </VStack>
            </Box>
          </Box>
        </FocusLock>
      </Transition>
    </>
  )
}
