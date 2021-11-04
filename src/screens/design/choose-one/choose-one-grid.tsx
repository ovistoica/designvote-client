import {StarIcon} from '@chakra-ui/icons'
import {
  Button,
  Flex,
  SimpleGrid,
  useRadioGroup,
  Text,
  Link,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {useUrlDesign} from 'api/design-query'
import {useVoteDesignVersion} from 'api/design-voting-queries'
import {useAuth} from 'context/auth-context'
import {ChooseDesignCard} from './choose-card'

interface ChooseGridProps {
  onVersionClick: (index: number) => void
  designUrl: string
}

export function ChooseOneDesignGrid({
  designUrl,
  onVersionClick,
}: ChooseGridProps) {
  const {isAuthenticated, login} = useAuth()
  const {getRadioProps, getRootProps, value: selectedVersion} = useRadioGroup()
  const {data: design} = useUrlDesign(designUrl)
  const {mutate: vote, isLoading} = useVoteDesignVersion(
    design.designId,
    designUrl,
  )
  const canSubmit = isAuthenticated && selectedVersion

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
      <Flex mt="12" alignItems="center">
        {!isAuthenticated ? (
          <Text color={mode('gray.600', 'gray.400')} px="2">
            You must be logged in to provide feedback.{' '}
            <Link
              fontWeight="500"
              onClick={() => {
                login({
                  appState: {
                    returnTo: `${window.location.origin}/design/${designUrl}`,
                  },
                })
              }}
            >
              Sign in
            </Link>
          </Text>
        ) : null}
        <Button
          size="lg"
          width={{base: 'full', md: 'auto'}}
          colorScheme="orange"
          disabled={!canSubmit}
          onClick={() => vote(selectedVersion as string)}
          isLoading={isLoading}
        >
          Submit feedback
        </Button>
      </Flex>
    </>
  )
}
