import * as React from 'react'

import {QuestionIcon} from '@chakra-ui/icons'
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  As,
  Stack,
  Flex,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverArrow,
  PopoverBody,
  PopoverTrigger,
  Button,
  Text,
} from '@chakra-ui/react'
import {Formik, Form, FormikTouched} from 'formik'
import {DesignType, VoteStyle} from 'types'
import {usePoll, useEditDesign} from 'utils/design-query'
import * as yup from 'yup'

interface Values {
  name: string
  question: string
  description: string
  type: DesignType
  voteStyle: VoteStyle
}

const initialTouched: FormikTouched<Values> = {}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name too short')
    .max(50, 'Name too lomng')
    .required('Required'),
  question: yup.string().required('Required'),
  description: yup.string(),
})

interface FormRowsProps {
  id: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  ariaLabel: string
  onBlur: React.FocusEventHandler<HTMLInputElement>
  type?: As<any> | undefined
  placeholder: string
  isInvalid?: boolean
  error?: string | null
  isRequired?: boolean
  autoFocus?: boolean
}

function QuestionPopover() {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <QuestionIcon width="1em" height="1em" mb="0.5rem" cursor="help" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Targeted question</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          The question your voters will see when asked to choose/rate from your
          versions of the poll.
          <Text mt={5} fontStyle="italic">
            <Text as="span" fontWeight="semibold" fontStyle="normal">
              Example:
            </Text>{' '}
            Which version do you think will increase conversion to paying
            costumers?
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

function FormRow({
  id,
  value,
  onChange,
  ariaLabel,
  onBlur,
  placeholder,
  type = 'input',
  isInvalid = false,
  error = null,
  isRequired = false,
  autoFocus = false,
}: FormRowsProps) {
  return (
    <FormControl
      id={id}
      aria-label={ariaLabel}
      isRequired={isRequired}
      isInvalid={isInvalid}
      py="2"
      minW={{base: 'xs', md: 'md'}}
    >
      <Flex alignItems="center">
        <FormLabel marginInlineEnd="0.2rem">{ariaLabel}</FormLabel>
        {id === 'question' ? <QuestionPopover /> : null}
      </Flex>

      <Input
        id={id}
        value={value}
        aria-label={ariaLabel}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        minH={type === 'textarea' ? '4em' : undefined}
        as={type}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

interface DesignInfoProps {
  pollId: string
}

export function DesignInfoTab({pollId}: DesignInfoProps) {
  const {
    data: {poll},
    isLoading: isPollLoading,
    isSuccess,
  } = usePoll(pollId)
  const initialValues = {
    name: poll.name,
    description: poll.description ?? '',
    question: poll.question,
  }
  const {mutate: saveDesign, isLoading: isEditLoading} = useEditDesign(pollId)
  return (
    <Stack pb={6} alignItems="center">
      <Formik
        key={`design${pollId}${isSuccess}`}
        validationSchema={validationSchema}
        initialValues={initialValues}
        initialTouched={initialTouched}
        onSubmit={values => {
          saveDesign(values)
        }}
      >
        {({handleChange, handleBlur, values, errors, touched}) => (
          <Form>
            <FormRow
              id="name"
              ariaLabel="Design name"
              placeholder="my-cool-new-poll"
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              isInvalid={!!(touched.name && errors.name)}
              error={errors.name}
              autoFocus
              isRequired
            />
            <FormRow
              id="question"
              ariaLabel="Targeted question"
              placeholder="Ex: Which button fits better for sign up screen?"
              onChange={handleChange('question')}
              onBlur={handleBlur('question')}
              value={values.question}
              isInvalid={!!(touched.question && errors.question)}
              error={errors.question}
              type="textarea"
              isRequired
            />

            <FormRow
              id="description"
              ariaLabel="Design description"
              placeholder="Ex: This sign-up screen is for a travel app"
              onChange={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              isInvalid={!!(touched.description && errors.description)}
              error={errors.description}
              type="textarea"
            />
            <Button
              colorScheme="orange"
              mt="1em"
              textTransform="uppercase"
              type="submit"
              isLoading={isPollLoading || isEditLoading}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Stack>
  )
}
