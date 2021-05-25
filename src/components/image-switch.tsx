import {Tooltip, HStack, StackProps, IconButton} from '@chakra-ui/react'
import {FaMobile} from 'react-icons/fa'
import {RiComputerFill} from 'react-icons/ri'
import {DesignType} from 'types'

interface SwitchProps extends StackProps {
  mode: DesignType
  toggle: (mode: DesignType) => void
}

export function ImageSwitch({
  mode = DesignType.Mobile,
  toggle,
  ...stackProps
}: SwitchProps) {
  return (
    <HStack {...stackProps}>
      <Tooltip hasArrow label="Mobile designs">
        <IconButton
          aria-label="mobile-mode"
          icon={<FaMobile />}
          colorScheme={mode === DesignType.Mobile ? 'teal' : undefined}
          onClick={() => toggle(DesignType.Mobile)}
        />
      </Tooltip>
      <Tooltip hasArrow label="Web designs">
        <IconButton
          aria-label="web-mode"
          colorScheme={mode === DesignType.Web ? 'teal' : undefined}
          icon={<RiComputerFill />}
          onClick={() => toggle(DesignType.Web)}
        />
      </Tooltip>
    </HStack>
  )
}
