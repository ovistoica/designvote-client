import {IconButton} from '@chakra-ui/button'
import {HStack, StackProps} from '@chakra-ui/layout'
import {RiComputerFill} from 'react-icons/ri'
import {FaMobile} from 'react-icons/fa'

export enum Mode {
  Mobile,
  Web,
}

interface SwitchProps extends StackProps {
  mode: Mode
  toggle: (mode: Mode) => void
}

export function ImageSwitch({
  mode = Mode.Mobile,
  toggle,
  ...stackProps
}: SwitchProps) {
  return (
    <HStack {...stackProps}>
      <IconButton
        aria-label="mobile-mode"
        icon={<FaMobile />}
        colorScheme={mode === Mode.Mobile ? 'brand' : undefined}
        onClick={() => toggle(Mode.Mobile)}
      />
      <IconButton
        aria-label="web-mode"
        colorScheme={mode === Mode.Web ? 'brand' : undefined}
        icon={<RiComputerFill />}
        onClick={() => toggle(Mode.Web)}
      />
    </HStack>
  )
}
