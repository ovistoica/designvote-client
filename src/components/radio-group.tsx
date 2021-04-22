import {useColorModeValue as mode} from '@chakra-ui/color-mode'
import {Box, SimpleGrid} from '@chakra-ui/layout'
import {useRadio, useRadioGroup, UseRadioProps} from '@chakra-ui/radio'

const RadioCard: React.FC<UseRadioProps> = props => {
  const {getInputProps, getCheckboxProps} = useRadio(props)
  const accentColor = mode('orange.500', 'orange.200')

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
          bg: accentColor,
          // color: 'white',
          color: mode('white', 'gray.800'),
          borderColor: accentColor,
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
  defaultValue?: string | number
}

export function RadioGroup({
  options,
  name,
  onChange,
  defaultValue,
}: RadioGroupProps) {
  const {getRootProps, getRadioProps} = useRadioGroup({
    name,
    defaultValue: defaultValue ?? undefined,
    onChange,
  })

  const group = getRootProps()
  const baseColumns = options.length > 2 ? 3 : 2

  return (
    <SimpleGrid columns={{base: baseColumns, md: 6}} spacing="2" {...group}>
      {options.map(option => {
        const radio = getRadioProps({value: option.value})
        return (
          <RadioCard key={option.value} {...radio}>
            {option.label}
          </RadioCard>
        )
      })}
    </SimpleGrid>
  )
}
