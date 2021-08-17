import {MotionBox, MotionBoxProps} from './motion-box'

export const Circle = (props: MotionBoxProps) => (
  <MotionBox bg="white" width="4" height="4" rounded="full" {...props} />
)
