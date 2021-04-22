import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import {AddIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons'
import {HiDotsHorizontal} from 'react-icons/hi'
import {FiLink} from 'react-icons/fi'
import {useDesigns, useDeleteDesign} from 'utils/design-query'
import {useNavigate} from 'react-router-dom'
import {DeleteResourceAlert, FullPageSpinner} from 'components/lib'
import {Logo} from 'assets/icons'
import {MetaDecorator} from 'components/meta-decorator'
import {Design} from 'types'

interface DesignCardProps {
  designId: string
  name: string
}

function DesignCard({designId, name}: DesignCardProps) {
  const navigate = useNavigate()
  const {mutate: deleteDesign} = useDeleteDesign()

  // dark mode support
  const cardBg = useColorModeValue('white', 'gray.700')
  const menuBG = useColorModeValue('white', 'gray.700')
  const cardHover = useColorModeValue('rgba(55, 53, 47, 0.03)', '#283240')

  // Delete alert specific
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure()

  return (
    <>
      <Flex
        aria-label={`Design ${name}`}
        boxShadow="md"
        h="5em"
        align="center"
        justify="space-between"
        p="1em"
        borderRadius="8px"
        flex="1"
        maxW="300px"
        backgroundColor={cardBg}
        cursor="pointer"
        _hover={{background: cardHover}}
        transition="0.25s all"
        onClick={() => navigate(`/design/${designId}`)}
        role="group"
        position="relative"
      >
        <Text>{name}</Text>
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            w="1.5em"
            h="1.5em"
            m="0.5em"
            position="absolute"
            top="0"
            right="0"
            background={menuBG}
            onClick={e => e.stopPropagation()}
            opacity={0}
            _groupHover={{opacity: 1}}
            _focus={{border: 'none'}}
            _active={{border: 'none'}}
          >
            <HiDotsHorizontal />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<EditIcon />}>Edit</MenuItem>
            <MenuItem icon={<FiLink />}>Get link</MenuItem>
            <MenuItem
              icon={<DeleteIcon />}
              onClick={e => {
                e.stopPropagation()
                onAlertOpen()
              }}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <DeleteResourceAlert
        onClose={onAlertClose}
        isOpen={isAlertOpen}
        onDeletePress={() => {
          deleteDesign(designId)
          onAlertClose()
        }}
        title="Delete design"
        body="Are you sure? This action cannot be undone"
      />
    </>
  )
}

interface EmptyDashboardProps {
  onClick: () => void
}

function EmptyDashboard({onClick}: EmptyDashboardProps) {
  const bg = useColorModeValue('surface', 'gray.700')
  const textInfoColor = useColorModeValue('textSecondary', 'gray.400')
  return (
    <Flex
      w={['90%', '80%', '60%']}
      bg={bg}
      alignSelf="center"
      mt="2em"
      py={['3em', '3em', '3em']}
      direction="column"
      align="center"
      justify="center"
    >
      <Logo />
      <Text fontSize={['1.5rem', '2rem', '2rem']} fontWeight="500" mt="0.5em">
        Huh, no designs?
      </Text>
      <Text mt="1em" color={textInfoColor}>
        C'mon now don't be lazy...
      </Text>
      <Button
        mt="2em"
        fontWeigh="300"
        fontSize="sm"
        onClick={onClick}
        colorScheme="orange"
      >
        Choose your design
      </Button>
    </Flex>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  const {data: designs, isLoading} = useDesigns()
  const cardBg = useColorModeValue('white', 'gray.700')

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <>
      <MetaDecorator
        title="Designvote - Dashboard"
        description="Dashboard containing all of your designs. Share a design for people to vote."
      />
      <Flex h="100%" w="100%" flexDir="column" px={{base: '10', md: '0'}}>
        <Flex alignItems="center" flex="0">
          <Text fontSize="xl" fontWeight="500">
            Designs
          </Text>
          <Button
            aria-label="Add design"
            variant="ghost"
            ml="1em"
            size="sm"
            boxShadow="md"
            align="center"
            justify="center"
            borderRadius="100px"
            p="0.1em"
            _hover={{
              color: 'teal',
            }}
            _focus={{outline: 'none'}}
            background={cardBg}
            onClick={() => navigate('/create')}
          >
            <AddIcon />
          </Button>
        </Flex>
        {designs.length ? (
          <SimpleGrid
            mt="1em"
            gridTemplateColumns={{sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)'}}
            minChildWidth="300px"
            spacing="1.5em"
          >
            {designs.map((design: Design) => (
              <DesignCard
                key={design.designId}
                designId={design.designId}
                name={design.name}
              />
            ))}
          </SimpleGrid>
        ) : (
          <EmptyDashboard onClick={() => navigate('/create')} />
        )}
      </Flex>
    </>
  )
}

export {Dashboard}
