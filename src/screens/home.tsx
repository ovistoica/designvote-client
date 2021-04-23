import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import {useDesigns} from 'utils/design-query'
import {useNavigate} from 'react-router-dom'
import {FullPageSpinner} from 'components/lib'
import {Logo} from 'assets/icons'
import {MetaDecorator} from 'components/meta-decorator'
import {Design} from 'types'
import {DesignCard, DesignInfo, VotesCount} from 'components/design-card'

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

export function HomeScreen() {
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
      <Box as="section" maxW={{base: 'xs', md: '3xl'}}>
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
          <SimpleGrid columns={{base: 1, md: 3}} spacing="6" mt={42}>
            {designs.map((design: Design) => {
              const {
                name,
                description,
                totalVotes,
                voteStyle,
                designId,
              } = design
              const onClick = () => navigate(`/design/${designId}`)
              return (
                <DesignCard key={name} designId={designId} onClick={onClick}>
                  <DesignInfo mt="3" name={name} description={description} />
                  <VotesCount my="4" count={totalVotes} voteStyle={voteStyle} />
                </DesignCard>
              )
            })}
          </SimpleGrid>
        ) : (
          <EmptyDashboard onClick={() => navigate('/create')} />
        )}
      </Box>
    </>
  )
}
