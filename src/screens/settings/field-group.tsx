import {Box, BoxProps, Text, useColorModeValue as mode} from '@chakra-ui/react'

interface FieldGroupProps extends BoxProps {
  title: string
  description?: string
}

export const FieldGroup = (props: FieldGroupProps) => {
  const {title, description, ...boxProps} = props
  const descriptionColor = mode('gray.600', 'gray.400')
  return (
    <Box>
      <Text fontWeight="semibold">{title}</Text>
      {description ? (
        <Text color={descriptionColor} fontSize="sm">
          {description}
        </Text>
      ) : null}
      <Box pt="5" {...boxProps} />
    </Box>
  )
}
