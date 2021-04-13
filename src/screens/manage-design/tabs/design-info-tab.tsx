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

import * as yup from 'yup'
import * as React from 'react'
import {QuestionIcon} from '@chakra-ui/icons'
import {DesignType, VoteStyle} from 'types'
import {useDesign, useEditDesign} from 'utils/design-query'

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
          versions of the design.
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
        _focus={{borderColor: 'brand.500'}}
        as={type}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

interface DesignInfoProps {
  designId: string
}

export function DesignInfoTab({designId}: DesignInfoProps) {
  const {
    data: {design},
    isLoading: isDesignLoading,
    isSuccess,
  } = useDesign(designId)
  const initialValues = {
    name: design.name,
    description: design.description ?? '',
    question: design.question,
  }
  const {mutate: saveDesign, isLoading: isEditLoading} = useEditDesign(designId)
  return (
    <Stack pb={6} alignItems="center">
      <Formik
        key={`design${designId}${isSuccess}`}
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
              placeholder="my-cool-new-design"
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
              colorScheme="brand"
              mt="1em"
              textTransform="uppercase"
              type="submit"
              isLoading={isDesignLoading || isEditLoading}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Stack>
  )
}
