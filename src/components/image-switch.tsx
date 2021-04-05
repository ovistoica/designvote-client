import {IconButton} from '@chakra-ui/button'
import {HStack, StackProps} from '@chakra-ui/layout'
import {RiComputerFill} from 'react-icons/ri'
import {FaMobile} from 'react-icons/fa'
import {Tooltip} from '@chakra-ui/tooltip'
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
          colorScheme={mode === DesignType.Mobile ? 'brand' : undefined}
          onClick={() => toggle(DesignType.Mobile)}
        />
      </Tooltip>
      <Tooltip hasArrow label="Web designs">
        <IconButton
          aria-label="web-mode"
          colorScheme={mode === DesignType.Web ? 'brand' : undefined}
          icon={<RiComputerFill />}
          onClick={() => toggle(DesignType.Web)}
        />
      </Tooltip>
    </HStack>
  )
}
