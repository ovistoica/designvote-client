import {
  Box,
  Text,
  SimpleGrid,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  useColorModeValue as mode,
  Center,
} from '@chakra-ui/react'

const RadioCard: React.FC<UseRadioProps & {icon?: JSX.Element}> = props => {
  const {getInputProps, getCheckboxProps} = useRadio(props)
  const accentColor = mode('orange.500', 'orange.200')

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Center
        flexDir="column"
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        textAlign={'center'}
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
      </Center>
    </Box>
  )
}

interface RadioGroupProps {
  options: {value: string; label: string; icon?: JSX.Element}[]
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
            {option.icon ?? null}
            <Text textAlign={'center'}>{option.label}</Text>
          </RadioCard>
        )
      })}
    </SimpleGrid>
  )
}
