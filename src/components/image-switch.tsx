import {IconButton} from '@chakra-ui/button'
import {HStack, StackProps} from '@chakra-ui/layout'
import {RiComputerFill} from 'react-icons/ri'
import {FaMobile} from 'react-icons/fa'
import {Tooltip} from '@chakra-ui/tooltip'

export enum Mode {
  Mobile = 'mobile',
  Web = 'web',
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
      <Tooltip hasArrow label="Mobile designs">
        <IconButton
          aria-label="mobile-mode"
          icon={<FaMobile />}
          colorScheme={mode === Mode.Mobile ? 'brand' : undefined}
          onClick={() => toggle(Mode.Mobile)}
        />
      </Tooltip>
      <Tooltip hasArrow label="Web designs">
        <IconButton
          aria-label="web-mode"
          colorScheme={mode === Mode.Web ? 'brand' : undefined}
          icon={<RiComputerFill />}
          onClick={() => toggle(Mode.Web)}
        />
      </Tooltip>
    </HStack>
  )
}
