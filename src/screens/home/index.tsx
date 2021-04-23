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
import {MetaDecorator} from 'components/meta-decorator'
import {Design} from 'types'
import {DesignCard, DesignInfo, VotesCount} from 'components/design-card'
import {NoDesigns} from './no-designs'

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
      <Box as="section" maxW={{base: 'full', md: '3xl'}} px={{base: 4, md: 0}}>
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
          <NoDesigns onClick={() => navigate('/create')} />
        )}
      </Box>
    </>
  )
}
