import {
  Heading,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

interface HeadingGroupProps extends StackProps {
  title: string
  description?: string
}

export const HeadingGroup = (props: HeadingGroupProps) => {
  const {title, description, ...stackProps} = props
  const descriptionColor = useColorModeValue('gray.600', 'gray.400')
  return (
    <Stack spacing="1" {...stackProps}>
      <Heading size="md" fontWeight="semibold">
        {title}
      </Heading>
      {description ? <Text color={descriptionColor}>{description}</Text> : null}
    </Stack>
  )
}
