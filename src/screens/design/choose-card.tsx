import {
  Box,
  chakra,
  Text,
  useRadio,
  UseRadioProps,
  VStack,
  useColorModeValue as mode,
  useId,
  Image,
} from '@chakra-ui/react'
import * as React from 'react'
import {MdRadioButtonChecked, MdRadioButtonUnchecked} from 'react-icons/md'

const RadioBox = chakra('div', {
  baseStyle: {
    borderWidth: '2px',
    pt: '6',
    pb: '6',
    borderRadius: 'md',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _focus: {shadow: 'outline'},
  },
})

const CheckboxIcon = (props: {checked: boolean}) => (
  <Box
    fontSize="4xl"
    color={props.checked ? 'orange.500' : mode('gray.300', 'whiteAlpha.400')}
  >
    {props.checked ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
  </Box>
)

interface ButtonRadioProps extends UseRadioProps {
  icon: React.ReactElement
  label: string
  imageUrl: string
  onClick: () => void
}

export const ChooseDesignCard = (props: ButtonRadioProps) => {
  const {imageUrl, label, onClick} = props
  const {getCheckboxProps, getInputProps, getLabelProps, state} = useRadio(
    props,
  )
  const id = useId()

  const checkedStyles = {
    bg: mode('orange.50', 'rgb(0 31 71)'),
    borderColor: 'orange.600',
  }

  return (
    <label style={{width: '100%'}} {...getLabelProps()}>
      <input {...getInputProps()} aria-labelledby={id} />
      <RadioBox
        {...getCheckboxProps()}
        _checked={checkedStyles}
        id={id}
        _focus={{}}
      >
        <VStack spacing="4">
          <VStack textAlign="center">
            <Text fontWeight="extrabold" fontSize="xl">
              {label}
            </Text>
            <Image
              onClick={onClick}
              objectFit="contain"
              boxSize="15em"
              align="center"
              src={imageUrl}
              cursor="zoom-in"
            />
          </VStack>
          <CheckboxIcon checked={state.isChecked} />
        </VStack>
      </RadioBox>
    </label>
  )
}
