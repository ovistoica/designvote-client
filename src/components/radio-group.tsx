import {Box, HStack} from '@chakra-ui/layout'
import {useRadio, useRadioGroup, UseRadioProps} from '@chakra-ui/radio'

const RadioCard: React.FC<UseRadioProps> = props => {
  const {getInputProps, getCheckboxProps} = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'brand.500',
          color: 'white',
          borderColor: 'brand.500',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

interface RadioGroupProps {
  options: {value: string; label: string}[]
  name: string
  onChange: (val: string | number) => void
}

export function RadioGroup({options, name, onChange}: RadioGroupProps) {
  const {getRootProps, getRadioProps} = useRadioGroup({
    name,
    defaultValue: options[0].value,
    onChange,
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map(option => {
        const radio = getRadioProps({value: option.value})
        return (
          <RadioCard key={option.value} {...radio}>
            {option.label}
          </RadioCard>
        )
      })}
    </HStack>
  )
}