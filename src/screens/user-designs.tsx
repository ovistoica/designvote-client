import * as React from 'react'
import {
  Box,
  Button,
  DarkMode,
  Divider,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {useDesigns} from '../api/design-query'
import {FullPageSpinner, Container} from '../components/lib'
import {DesignInfo} from 'components/cards/design-info'
import {Footer} from '../components/footer'
import {useNavigate} from 'react-router-dom'
import {withAuthenticationRequired} from '@auth0/auth0-react'

export const UserDesigns = withAuthenticationRequired(() => {
  const {data: designs, isLoading} = useDesigns()
  const navigate = useNavigate()

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <>
      <Container>
        <Flex justifyContent="center" align="center" direction="column">
          <Box as="section" py="4" w="full" px={{base: '4', lg: '8', xl: '4'}}>
            <Box maxW={{base: 'xl', md: '5xl', lg: '6xl'}} mx="auto">
              <Grid
                templateColumns={'1fr'}
                gap={4}
                justifyContent="center"
                gridAutoFlow={{base: 'row', lg: 'row'}}
              >
                <Box
                  rounded="lg"
                  bg={mode('white', 'gray.700')}
                  maxW={{base: 'xl', md: '3xl'}}
                  w="full"
                  mx="auto"
                  shadow="base"
                  overflow="hidden"
                  minH={'32em'}
                >
                  <Flex align="center" justify="space-between" px="6" py="4">
                    <Stack spacing={8} align={'center'} w={'full'}>
                      <Heading as="h1" fontWeight="bold" fontSize="2xl">
                        My Designs
                      </Heading>
                      <Text>You don't have any designs yet</Text>
                      <Button
                        colorScheme={'orange'}
                        onClick={() => navigate('/create', {replace: true})}
                      >
                        Create your first design
                      </Button>
                    </Stack>
                  </Flex>
                  <Stack spacing="6" py="5" px="8" flex={1}>
                    {designs.map((design, index) => (
                      <>
                        <DesignInfo
                          key={`latestDesign${design.shortUrl}`}
                          question={design.question}
                          votes={design.totalVotes}
                          opinions={design?.totalOpinions ?? 0}
                          createdAt={design.createdAt}
                          img={design.img}
                          ownerPicture={design.ownerPicture}
                          ownerName={design.ownerName ?? design.ownerNickname}
                          onClick={() => navigate(`/design/${design.shortUrl}`)}
                        />
                        {index !== 4 ? (
                          <Divider borderColor="gray.200" />
                        ) : null}
                      </>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Flex>
      </Container>

      <Box bg="gray.700" maxW="full" w="full">
        <DarkMode>
          <Footer color="gray.200" />
        </DarkMode>
      </Box>
    </>
  )
})
