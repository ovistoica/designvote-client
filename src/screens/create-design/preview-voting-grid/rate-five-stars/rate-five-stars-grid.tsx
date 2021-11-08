import {Button, SimpleGrid, Flex} from '@chakra-ui/react'
import {RateStarsVotingCard} from 'components/voting-grid/rate-five-stars/star-rating-card'
import {useUploadDesignImagesStore} from 'store'

interface RateFiveStarsGridProps {
  onVersionClick: (index: number) => void
}

export function RateFiveStarsGrid({onVersionClick}: RateFiveStarsGridProps) {
  const images = useUploadDesignImagesStore(state => state.images)
  return (
    <>
      <SimpleGrid
        alignContent="center"
        alignItems="center"
        columns={{base: 1, md: 2, lg: images.length > 2 ? 3 : 2}}
        spacing={{base: '2', md: '8', lg: '8'}}
        rowGap={{base: 8, md: 8, lg: 8}}
        mt="8"
        maxW={{base: 'xl', md: '6xl'}}
      >
        {images.map((version, index) => {
          const {url} = version
          return (
            <RateStarsVotingCard
              index={index}
              key={`designVersion${url}`}
              versionId={`preview${index}`}
              inPreview={true}
              imageUrl={url}
              onClick={() => onVersionClick(index)}
            />
          )
        })}
      </SimpleGrid>

      <Flex mt="12" alignItems="center">
        <Button
          size="lg"
          width={{base: 'full', md: 'auto'}}
          colorScheme="orange"
          disabled={true}
        >
          Submit feedback
        </Button>
      </Flex>
    </>
  )
}
