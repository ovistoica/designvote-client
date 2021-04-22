import {AbsoluteCenter, Center, CenterProps} from '@chakra-ui/react'

export const StepContent = (props: CenterProps) => (
  <AbsoluteCenter height="full" width="full" position="absolute" zIndex={1}>
    <Center height="full" fontSize="sm" fontWeight="semibold" {...props} />
  </AbsoluteCenter>
)
