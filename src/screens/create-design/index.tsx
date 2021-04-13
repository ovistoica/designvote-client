import {useCreateDesignStore} from 'store'
import {CreateDesignStep} from 'types'
import {Box, HStack} from '@chakra-ui/react'
import {Step} from 'components/step-with-arrow'

import {CreateStep} from './create-step'
import {PreviewStep} from './preview-step'
import {ShareStep} from './share-step'
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
      return <ShareStep />
    }
  }
}

export function CreateDesign() {
  const {step, setStep} = useCreateDesignStore()

  return (
    <Box
      p={0}
      mx="auto"
      maxW="3xl"
      px={{base: '6', md: '8'}}
      py={{base: '5em', md: '5em'}}
    >
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
            Review
          </Step>
          <Step
            isCurrent={step === CreateDesignStep.Share}
            onClick={() => setStep(CreateDesignStep.Share)}
          >
            Publish
          </Step>
        </HStack>
      </nav>
      <CurrentScreen />
    </Box>
  )
}
