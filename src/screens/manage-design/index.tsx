import * as React from 'react'
import {Button, ButtonProps} from '@chakra-ui/button'
import {useColorModeValue} from '@chakra-ui/color-mode'
import {Divider, Flex, Heading, Stack, Text} from '@chakra-ui/layout'
import {DesignTab} from 'types'
import {useDesign} from 'utils/design-query'
import {useParams} from 'react-router'
import {VersionsTab} from './versions-tab'

const linkStyle: ButtonProps = {
  textTransform: 'uppercase',
  variant: 'link',
  mx: 5,
  fontWeight: 'semibold',
}

interface StepLinkProps extends ButtonProps {}

function Tab(props: StepLinkProps) {
  const selectedProps: ButtonProps = props['aria-selected']
    ? {
        color: 'brand.500',
        textDecoration: 'underline',
      }
    : {}

  return (
    <Button
      size="lg"
      {...linkStyle}
      {...props}
      {...selectedProps}
      _active={{}}
      _focus={{}}
    />
  )
}

interface CurrentScreenProps {
  designId: string
  step: DesignTab
}

export function CurrentScreen({step, designId}: CurrentScreenProps) {
  switch (step) {
    case DesignTab.Info: {
      return <Text>Design info</Text>
    }
    case DesignTab.Versions: {
      return <VersionsTab designId={designId} />
    }
    case DesignTab.Preview: {
      return <Text>Preview</Text>
    }
    case DesignTab.Share: {
      return <Text>Share</Text>
    }
    case DesignTab.Analyse: {
      return <Text>Analyse results</Text>
    }
  }
}

export function ManageDesign() {
  const [step, setStep] = React.useState(DesignTab.Share)
  const {designId} = useParams()
  const {
    data: {design},
  } = useDesign(designId)
  const bg = useColorModeValue('whiteAlpha.900', 'gray.700')

  return (
    <Flex
      direction="column"
      alignItems="center"
      minH="100vh"
      w="100%"
      p={['5em 1em', '5em 2em', '4em 0em']}
    >
      <Stack spacing="1em" bg={bg} w="100vw" p="1em" borderBottomWidth="1px">
        <Heading fontSize="1.8rem" fontWeight="400">
          {design.name ?? 'Loading'}
        </Heading>
        <Divider w="100%" />
        <Flex w="100%" justify="center">
          <Tab
            ml="0em"
            aria-selected={step === DesignTab.Info}
            onClick={() => setStep(DesignTab.Info)}
          >
            Design info
          </Tab>
          <Tab
            aria-selected={step === DesignTab.Versions}
            onClick={() => setStep(DesignTab.Versions)}
          >
            Manage versions
          </Tab>
          <Tab
            aria-selected={step === DesignTab.Preview}
            onClick={() => setStep(DesignTab.Preview)}
          >
            Preview
          </Tab>
          <Tab
            aria-selected={step === DesignTab.Share}
            onClick={() => setStep(DesignTab.Share)}
          >
            Share
          </Tab>
          <Tab
            rightIcon={undefined}
            aria-selected={step === DesignTab.Analyse}
            onClick={() => setStep(DesignTab.Analyse)}
          >
            Analyse results
          </Tab>
        </Flex>
      </Stack>

      <CurrentScreen step={step} designId={designId} />
    </Flex>
  )
}
