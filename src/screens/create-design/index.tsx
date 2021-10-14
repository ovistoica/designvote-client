import {useCreateDesignStore} from 'store'
import {CreateDesignStep} from 'types'
import {Box, Flex, HStack} from '@chakra-ui/react'
import {Step} from 'components/step-with-arrow'
import {Container} from 'components/lib'

import {CreateStep} from './create-step'
import {PreviewStep} from './preview-step'
import {PublishStep} from './publish-step'
import {UploadStep} from './upload-step'

export function CurrentScreen() {
  const step = useCreateDesignStore(state => state.step)

  switch (step) {
    case CreateDesignStep.Create: {
      return <CreateStep />
    }
    case CreateDesignStep.Upload: {
      return <UploadStep />
    }
    case CreateDesignStep.Preview: {
      return <PreviewStep />
    }
    case CreateDesignStep.Share: {
      return <PublishStep />
    }
  }
}

function ProgressSteps() {
  const {step, setStep} = useCreateDesignStore()

  return (
    <Box p={0} w={{base: 'full', md: '3xl'}} mx="auto" px={{base: '6'}}>
      <nav aria-label="Progress steps">
        <HStack as="ol" listStyleType="none" spacing="0">
          <Step
            isCurrent={step === CreateDesignStep.Create}
            onClick={() => setStep(CreateDesignStep.Create)}
          >
            Create Design
          </Step>
          <Step
            isCurrent={step === CreateDesignStep.Upload}
            onClick={() => setStep(CreateDesignStep.Upload)}
          >
            Upload Versions
          </Step>
          <Step
            isCurrent={step === CreateDesignStep.Preview}
            onClick={() => setStep(CreateDesignStep.Preview)}
          >
            Preview
          </Step>
          <Step
            isCurrent={step === CreateDesignStep.Share}
            onClick={() => setStep(CreateDesignStep.Share)}
          >
            Publish
          </Step>
        </HStack>
      </nav>
    </Box>
  )
}

export function CreateDesign() {
  return (
    <Container>
      <Flex flexDir="column" align="center" pt="4" justifyContent="center">
        <ProgressSteps />
        <CurrentScreen />
      </Flex>
    </Container>
  )
}
