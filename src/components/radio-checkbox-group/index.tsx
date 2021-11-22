import {Box, Stack, useRadioGroup} from '@chakra-ui/react'
import * as React from 'react'
import {ButtonCheckbox} from './checkbox'
import {IconType} from 'react-icons'

interface Value {
  value: string
  icon: IconType
  title: string
  description: string
}

interface RadioGroupProps {
  values: Value[]
  name: string
  onChange: (val: string) => void
  defaultValue?: string
}

export const RadioCheckboxGroup: React.FC<RadioGroupProps> = ({
  values,
  name,
  onChange,
  defaultValue,
}) => {
  const {getRadioProps} = useRadioGroup({
    name,
    defaultValue: defaultValue ?? undefined,
    onChange,
  })
  return (
    <Box maxW="xl" width="full" px={{base: '6', md: '0'}}>
      <Stack spacing="5" justify="flex-start">
        {values.map(({value, icon, title, description}) => (
          <ButtonCheckbox
            {...getRadioProps({value})}
            icon={icon}
            title={title}
            description={description}
          />
        ))}
      </Stack>
    </Box>
  )
}
