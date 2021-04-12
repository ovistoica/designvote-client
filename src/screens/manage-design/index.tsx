import * as React from 'react'
import {Button, ButtonProps} from '@chakra-ui/button'
import {useColorModeValue} from '@chakra-ui/color-mode'
import {Divider, Flex, Heading, Stack, Text} from '@chakra-ui/layout'
import {DesignTab} from 'types'
import {useDesign} from 'utils/design-query'
import {useParams} from 'react-router'
import {VersionsTab} from './versions-tab'
import {DesignInfoTab} from './design-info-tab'
import {PreviewTab} from './preview-tab'
import {ShareTab} from './share-tab'
import {useManageDesign} from 'store'

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
}

export function CurrentScreen({designId}: CurrentScreenProps) {
  const {tab} = useManageDesign(
    React.useCallback(state => ({tab: state.tab, setTab: state.setTab}), []),
  )
  switch (tab) {
    case DesignTab.Info: {
      return <DesignInfoTab designId={designId} />
    }
    case DesignTab.Versions: {
      return <VersionsTab designId={designId} />
    }
    case DesignTab.Preview: {
      return <PreviewTab designId={designId} />
    }
    case DesignTab.Share: {
      return <ShareTab designId={designId} />
    }
    case DesignTab.Analyse: {
      return <Text>Analyse results</Text>
    }
  }
}

export function ManageDesign() {
  const {designId} = useParams()
  const {
    data: {design},
  } = useDesign(designId)
  const bg = useColorModeValue('whiteAlpha.900', 'gray.700')
  const {tab, setTab} = useManageDesign(
    React.useCallback(state => ({tab: state.tab, setTab: state.setTab}), []),
  )

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
            aria-selected={tab === DesignTab.Info}
            onClick={() => setTab(DesignTab.Info)}
          >
            Design info
          </Tab>
          <Tab
            aria-selected={tab === DesignTab.Versions}
            onClick={() => setTab(DesignTab.Versions)}
          >
            Manage versions
          </Tab>
          <Tab
            aria-selected={tab === DesignTab.Preview}
            onClick={() => setTab(DesignTab.Preview)}
          >
            Preview
          </Tab>
          <Tab
            aria-selected={tab === DesignTab.Share}
            onClick={() => setTab(DesignTab.Share)}
          >
            Share
          </Tab>
          <Tab
            rightIcon={undefined}
            aria-selected={tab === DesignTab.Analyse}
            onClick={() => setTab(DesignTab.Analyse)}
          >
            Analyse results
          </Tab>
        </Flex>
      </Stack>

      <CurrentScreen designId={designId} />
    </Flex>
  )
}
