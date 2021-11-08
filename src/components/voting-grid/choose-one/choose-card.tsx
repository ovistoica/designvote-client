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
  IconButton,
} from '@chakra-ui/react'
import * as React from 'react'
import {HiZoomIn} from 'react-icons/hi'
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
    color={
      props.checked
        ? mode('orange.500', 'orange.300')
        : mode('gray.300', 'whiteAlpha.400')
    }
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
    bg: mode('orange.50', 'rgba(246, 173, 85, 0.5)'),
    borderColor: mode('orange.600', 'orange.300'),
  }

  return (
    <label style={{width: '100%'}} {...getLabelProps()}>
      <input {...getInputProps()} aria-labelledby={id} />
      <RadioBox
        {...getCheckboxProps()}
        _checked={checkedStyles}
        id={id}
        _focus={{}}
        role="group"
        position="relative"
      >
        <IconButton
          position="absolute"
          right={2}
          top={2}
          aria-label="zoom in"
          icon={<HiZoomIn />}
          size="lg"
          borderWidth="1px"
          display={{base: 'inline-flex', md: 'none'}}
          opacity={{base: 1, md: 0}}
          transition="0.25s all"
          onClick={onClick}
          _groupHover={{
            display: 'inline-flex',
            opacity: 1,
          }}
          bg={mode('white', 'gray.800')}
        />
        <VStack spacing="4">
          <VStack textAlign="center">
            <Text fontWeight="extrabold" fontSize="xl">
              {label}
            </Text>
            <Image
              objectFit="contain"
              boxSize="15em"
              align="center"
              src={imageUrl}
            />
          </VStack>
          <CheckboxIcon checked={state.isChecked} />
        </VStack>
      </RadioBox>
    </label>
  )
}
