import {SimpleGrid} from '@chakra-ui/layout'
import {DesignVersion} from './design-version'

interface MobileVersionProps {
  versionsById: string[]
  designId: string
}

export function MobileDesignVersions({
  versionsById,
  designId,
}: MobileVersionProps) {
  return (
    <SimpleGrid
      m="1em"
      column={3}
      gridTemplateColumns="repeat(3, 1fr)"
      columnGap="2em"
      alignContent="center"
      maxW="80%"
    >
      {versionsById.map(versionId => {
        return (
          <DesignVersion
            key={`version${versionId}`}
            versionId={versionId}
            designId={designId}
          />
        )
      })}
    </SimpleGrid>
  )
}
