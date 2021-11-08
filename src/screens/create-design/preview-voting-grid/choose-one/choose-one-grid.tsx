import {StarIcon} from '@chakra-ui/icons'
import {Button, Flex, SimpleGrid, useRadioGroup} from '@chakra-ui/react'
import {useUploadDesignImagesStore} from 'store'
import {ChooseDesignCard} from 'components/voting-grid/choose-one/choose-card'

interface ChooseGridProps {
  onVersionClick: (index: number) => void
}

export function ChooseOneDesignGrid({onVersionClick}: ChooseGridProps) {
  const {getRadioProps, getRootProps} = useRadioGroup()
  const canSubmit = false
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
        {...getRootProps()}
      >
        {images.map((version, index) => {
          const {url} = version
          return (
            <ChooseDesignCard
              icon={<StarIcon />}
              label={`#${index + 1}`}
              imageUrl={url}
              key={`designVersion${url}`}
              {...getRadioProps({value: url})}
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
          disabled={!canSubmit}
        >
          Submit feedback
        </Button>
      </Flex>
    </>
  )
}
