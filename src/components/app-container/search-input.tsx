import {
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react'
import {BsSearch} from 'react-icons/bs'

export const SearchInput = (
  props: InputProps & {rootProps?: InputGroupProps},
) => {
  const {rootProps, ...rest} = props
  return (
    <InputGroup
      maxW="2xs"
      size="sm"
      variant="filled"
      display={{base: 'none', lg: 'block'}}
      {...rootProps}
    >
      <InputLeftElement color="gray.400" pointerEvents="none">
        <BsSearch />
      </InputLeftElement>
      <Input
        {...rest}
        placeholder="Search"
        rounded="md"
        _placeholder={{color: 'gray.400'}}
      />
    </InputGroup>
  )
}
