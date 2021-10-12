import {StarIcon} from '@chakra-ui/icons'
import {Button, SimpleGrid, useRadioGroup} from '@chakra-ui/react'
import {useUrlDesign} from 'api/design-query'
import {useVoteDesignVersion} from 'api/design-voting-queries'
import {ChooseDesignCard} from './choose-card'

interface ChooseGridProps {
  onVersionClick: (index: number) => void
  designUrl: string
}

export function ChooseOneDesignGrid({
  designUrl,
  onVersionClick,
}: ChooseGridProps) {
  const {getRadioProps, getRootProps, value: selectedVersion} = useRadioGroup()
  const {data: design} = useUrlDesign(designUrl)
  const {mutate: vote, isLoading} = useVoteDesignVersion(
    design.designId,
    designUrl,
  )
  return (
    <>
      <SimpleGrid
        alignContent="center"
        alignItems="center"
        columns={{base: 1, md: 2, lg: design.versions.length > 2 ? 3 : 2}}
        spacing={{base: '2', md: '8', lg: '8'}}
        rowGap={{base: 8, md: 8, lg: 8}}
        mt="8"
        maxW={{base: 'xl', md: '6xl'}}
        {...getRootProps()}
      >
        {design.versions
          .sort((a, b) => {
            const {name: nameA} = a
            const {name: nameB} = b
            if (nameA === nameB) {
              return 0
            }
            return nameA > nameB ? 1 : -1
          })
          .map((version, index) => {
            const {imageUrl, versionId} = version
            return (
              <ChooseDesignCard
                icon={<StarIcon />}
                label={`#${index + 1}`}
                imageUrl={imageUrl}
                key={`designVersion${versionId}`}
                {...getRadioProps({value: versionId})}
                onClick={() => onVersionClick(index)}
              />
            )
          })}
      </SimpleGrid>
      <Button
        size="lg"
        width={{base: 'full', md: 'auto'}}
        mt="12"
        colorScheme="orange"
        disabled={!selectedVersion}
        onClick={() => vote(selectedVersion as string)}
        isLoading={isLoading}
      >
        Submit feedback
      </Button>
    </>
  )
}
