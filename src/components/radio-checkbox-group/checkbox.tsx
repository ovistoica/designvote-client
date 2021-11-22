import {
  Box,
  HStack,
  Text,
  useColorModeValue as mode,
  useId,
  useRadio,
  UseRadioProps,
  Icon,
} from '@chakra-ui/react'
import * as React from 'react'
import {MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md'
import {CheckboxBox} from './checkbox-box'
import {IconType} from 'react-icons'

interface ButtonCheckboxProps extends UseRadioProps {
  icon: IconType
  title: string
  description: string
  children?: React.ReactNode
}

export const ButtonCheckbox = (props: ButtonCheckboxProps) => {
  const {icon, title, description, ...rest} = props
  const {getCheckboxProps, getInputProps, getLabelProps, state} = useRadio(rest)
  const id = useId()

  const checkedColor = mode('orange.500', 'orange.300')
  const uncheckedColor = mode('gray.600', 'gray.300')

  return (
    <label {...getLabelProps()}>
      <input {...getInputProps()} aria-labelledby={id} />
      <CheckboxBox {...getCheckboxProps()} id={id}>
        <HStack spacing="4">
          <Box
            data-checked={state.isChecked ? '' : undefined}
            fontSize="2xl"
            _checked={{
              color: mode('orange.500', 'orange.300'),
            }}
            color={mode('gray.300', 'whiteAlpha.400')}
          >
            {state.isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </Box>
          <Icon
            boxSize={'1.5em'}
            as={icon}
            color={state.isChecked ? checkedColor : uncheckedColor}
          />
          <Box flex="1">
            <Text fontWeight="bold">{title}</Text>
            <Text fontSize="sm">{description}</Text>
          </Box>
        </HStack>
      </CheckboxBox>
    </label>
  )
}
