import * as React from 'react'
import {
  Box,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react'
import {useDesigns} from 'api/design-query'
import {useNavigate} from 'react-router-dom'
import {FullPageSpinner} from 'components/lib'
import {MetaDecorator} from 'components/meta-decorator'
import {Design} from 'types'
import {DesignCard, DesignInfo, VotesCount} from 'components/design-card'
import {NoDesigns} from './no-designs'
import {CreateDesignCard} from './create-design-card'

function getQueryParams() {
  const queryArray = document.location.search
    .substring(1)
    .split('&')
    .map(q => q.split('='))

  const queryObject: Record<string, string | boolean> = {}
  queryArray.forEach(([k, v]) => {
    if (v === 'true' || v === 'false') {
      queryObject[k] = Boolean(v)
    } else {
      queryObject[k] = v
    }
  })
  return queryObject
}

const FAIL_PAYMENT_TOAST: UseToastOptions = {
  title: 'Payment was unsuccesfull',
  description:
    'It seems something went wrong with your payment. Please try again',
  status: 'error',
  duration: 10000,
  isClosable: true,
}

const SUCCESS_PAYMENT_TOAST: UseToastOptions = {
  title: 'Upgrade succesfull',
  description:
    'Your account upgrade was succesfull! Go ahead and share your designs!',
  status: 'success',
  duration: 10000,
  isClosable: true,
}

export function HomeScreen() {
  const navigate = useNavigate()
  const {data: designs, isLoading} = useDesigns()

  const toast = useToast()

  React.useEffect(() => {
    const params = getQueryParams()
    if (params.payment_failure) {
      toast(FAIL_PAYMENT_TOAST)
    }
    if (params.payment_success) {
      toast(SUCCESS_PAYMENT_TOAST)
    }
  }, [toast])

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <>
      <MetaDecorator
        title="Designvote - Dashboard"
        description="Dashboard containing all of your designs. Share a design for people to vote."
      >
        {process.env.NODE_ENV === 'production' ? (
          <>
            {' '}
            <script type="text/javascript">
              {` var clickmagick_cmc = {
        uid: '145419',
        hid: '1945973',
        cmc_goal: 'a',
        cmc_ref: 'signup',
     }`}
            </script>
            <script src="//cdn.clkmc.com/cmc.js" />{' '}
          </>
        ) : null}
      </MetaDecorator>
      <Box as="section" maxW={{base: 'full', md: '3xl'}} px={{base: 4, md: 0}}>
        <Flex alignItems="center" flex="0">
          <Text fontSize="xl" fontWeight="500">
            Designs
          </Text>
        </Flex>
        {designs.length ? (
          <SimpleGrid
            columns={{base: 2, md: 3}}
            spacing={{base: '4', md: '4', lg: '6'}}
            mt="4"
            p="1"
            maxW="xl"
            pb="4"
          >
            <GridItem>
              <CreateDesignCard />
            </GridItem>
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
                <GridItem>
                  <DesignCard key={name} designId={designId} onClick={onClick}>
                    <DesignInfo mt="3" name={name} description={description} />
                    <VotesCount
                      my="4"
                      count={totalVotes}
                      voteStyle={voteStyle}
                    />
                  </DesignCard>
                </GridItem>
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
