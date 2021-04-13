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
  Code,
  Button,
  Text,
  Alert,
  AlertIcon,
  FormHelperText,
} from '@chakra-ui/react'
import {Formik, Form, FormikTouched} from 'formik'
import {Persist} from 'formik-persist'

import * as yup from 'yup'
import * as React from 'react'
import {QuestionIcon} from '@chakra-ui/icons'
import {RadioGroup} from 'components/radio-group'
import {CreateDesignStep, DesignType, VoteStyle} from 'types'
import {useCreateDesignStore} from 'store'

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
  type: yup
    .string()
    .oneOf([
      DesignType.Mobile,
      DesignType.Web,
      DesignType.Illustration,
      DesignType.Logo,
      DesignType.Other,
    ]),
  voteStyle: yup.string().oneOf([VoteStyle.Choose, VoteStyle.FiveStar]),
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
          <Code></Code>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
function ModePopover() {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <QuestionIcon width="1em" height="1em" mb="0.5rem" cursor="help" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Design type</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Choosing the purpose of your design helps us provide a better layout
          for your versions.
          <Text mt={5}>
            <Text as="span" fontWeight="semibold">
              Example:
            </Text>{' '}
            Designs for a mobile app will be displayed in the size of a mobile
            phone (where possible)
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

function VoteStylePopover() {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <QuestionIcon width="4" height="4" mb="0.5rem" cursor="help" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Voting style</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Mode in which your design versions should be rated.{' '}
          <Text mt={5}>
            <Text as="span" fontWeight="semibold">
              Mention 1:
            </Text>{' '}
            The individual rating system is based on a 1-5 star rating.
          </Text>
          <Text mt={5}>
            <Text as="span" fontWeight="semibold">
              Mention 2:
            </Text>{' '}
            Voters can leave comments on each design regardless of voting style
          </Text>
          <Alert status="info" mt={5} borderRadius=".5em">
            <AlertIcon />
            <Text>
              Voting style{' '}
              <Text as="span" fontWeight="semibold">
                CANNOT
              </Text>{' '}
              changed after design is created
            </Text>
          </Alert>
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
      py="0.5em"
      minW={{base: 'xs', md: 'sm'}}
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
        minH={type === 'textarea' ? '3em' : undefined}
        _focus={{borderColor: 'brand.500'}}
        as={type}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

function CreateStep() {
  const saveDesign = useCreateDesignStore(state => state.saveDesignInfo)
  const setStep = useCreateDesignStore(
    React.useCallback(state => state.setStep, []),
  )
  const initialValues = useCreateDesignStore(
    React.useCallback(
      state => ({
        name: state.name ?? '',
        description: state.description ?? '',
        type: state.type,
        question: state.question ?? '',
        voteStyle: state.voteStyle,
      }),
      [],
    ),
  )
  const set = useCreateDesignStore(
    React.useCallback(
      state => ({
        name: state.setName,
        description: state.setDescription,
        question: state.setQuestion,
        type: state.setType,
        voteStyle: state.setVoteStyle,
      }),
      [],
    ),
  )
  return (
    <Stack pb={6} maxW="3xl" px={{base: '6', md: '8'}}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        initialTouched={initialTouched}
        onSubmit={values => {
          saveDesign(values)
          setStep(CreateDesignStep.Upload)
        }}
      >
        {({handleChange, handleBlur, values, errors, touched}) => (
          <Form style={{marginTop: '1em'}}>
            <FormRow
              id="name"
              ariaLabel="Design name"
              placeholder="my-cool-new-design"
              onChange={e => {
                handleChange('name')(e)
                set.name(e.target.value)
              }}
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
              onChange={e => {
                handleChange('question')(e)
                set.question(e.target.value)
              }}
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
              onChange={e => {
                handleChange('description')(e)
                set.description(e.target.value)
              }}
              onBlur={handleBlur('description')}
              value={values.description}
              isInvalid={!!(touched.description && errors.description)}
              error={errors.description}
              type="textarea"
            />

            <FormControl
              id="type"
              py="0.5em"
              // minW={{base: 'xs', md: 'sm'}}
              isRequired
            >
              <Flex alignItems="center">
                <FormLabel marginInlineEnd="0.2rem">Design type</FormLabel>
                <ModePopover />
              </Flex>

              <RadioGroup
                options={[
                  {label: 'Mobile', value: DesignType.Mobile},
                  {label: 'Web', value: DesignType.Web},
                  {
                    label: 'Illustration',
                    value: DesignType.Illustration,
                  },
                  {label: 'Logo', value: DesignType.Logo},
                  {label: 'Other', value: DesignType.Other},
                ]}
                name="type"
                onChange={e => {
                  const formikHandler = handleChange('type') as (
                    e: string | number,
                  ) => void
                  formikHandler(e)
                  set.type(e as DesignType)
                }}
              />
            </FormControl>

            <FormControl
              id="voteStyle"
              py="0.5em"
              // minW={{base: 'xs', md: 'sm'}}
              isRequired
            >
              <Flex alignItems="center">
                <FormLabel marginInlineEnd="0.2rem">Voting style</FormLabel>
                <VoteStylePopover />
              </Flex>

              <RadioGroup
                // defaultValue={values.voteStyle}
                options={[
                  {label: 'Choose the best', value: VoteStyle.Choose},
                  {label: 'Rate individually', value: VoteStyle.FiveStar},
                ]}
                name="voteStyle"
                onChange={e => {
                  const formikHandler = handleChange('voteStyle') as (
                    e: string | number,
                  ) => void
                  formikHandler(e)
                  set.voteStyle(e as VoteStyle)
                }}
              />
              <FormHelperText>
                Wether voters should choose the best of all or rate each one
                individually
              </FormHelperText>
            </FormControl>

            <Button
              colorScheme="brand"
              mt="1em"
              textTransform="uppercase"
              type="submit"
            >
              Save
            </Button>
            <Persist name="design-info" />
          </Form>
        )}
      </Formik>
    </Stack>
  )
}

export {CreateStep}
