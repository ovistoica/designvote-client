import {Button, ButtonProps} from '@chakra-ui/button'
import {useColorModeValue} from '@chakra-ui/color-mode'
import {ArrowForwardIcon} from '@chakra-ui/icons'
import {Divider, Flex, Heading, Stack, Text} from '@chakra-ui/layout'
import {useCreateDesignStore} from 'store'
import {DesignStep} from 'types'

import {DesignInfoForm} from './design-info-step'
import {UploadStep} from './upload-step'

const linkStyle: ButtonProps = {
  textTransform: 'uppercase',
  variant: 'link',
  mx: '0.3em',
  fontWeight: '400',
}

interface StepLinkProps extends ButtonProps {}

function StepLink(props: StepLinkProps) {
  const textInfoColor = useColorModeValue('textInfoLight', 'gray.400')
  const rightIcon = <ArrowForwardIcon mb="1px" color={textInfoColor} />

  const selectedProps: ButtonProps = props['aria-selected']
    ? {
        color: 'brand.500',
        textDecoration: 'underline',
      }
    : {}

  return (
    <Button
      {...linkStyle}
      rightIcon={rightIcon}
      {...props}
      {...selectedProps}
      _active={{}}
      _focus={{}}
    />
  )
}

export function CurrentScreen() {
  const step = useCreateDesignStore(state => state.step)

  switch (step) {
    case DesignStep.Create: {
      return <DesignInfoForm />
    }
    case DesignStep.Upload: {
      return (
        <>
          <UploadStep />
        </>
      )
    }
    case DesignStep.Preview: {
      return (
        <>
          <Text>Preview </Text>
        </>
      )
    }
    case DesignStep.Share: {
      return (
        <>
          <Text>Share </Text>
        </>
      )
    }
  }
}

export function CreateDesign() {
  const {step, setStep, name} = useCreateDesignStore()
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
          {name ?? 'Create Design'}
        </Heading>
        <Divider w="100%" />
        <Flex>
          <StepLink
            ml="0em"
            aria-selected={step === DesignStep.Create}
            onClick={() => setStep(DesignStep.Create)}
          >
            Design info
          </StepLink>
          <StepLink
            aria-selected={step === DesignStep.Upload}
            onClick={() => setStep(DesignStep.Upload)}
          >
            Upload versions
          </StepLink>
          <StepLink
            aria-selected={step === DesignStep.Preview}
            onClick={() => setStep(DesignStep.Preview)}
          >
            Preview
          </StepLink>
          <StepLink
            rightIcon={undefined}
            aria-selected={step === DesignStep.Share}
            onClick={() => setStep(DesignStep.Share)}
          >
            Share
          </StepLink>
        </Flex>
      </Stack>

      <CurrentScreen />
    </Flex>
  )
}
