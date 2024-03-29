import {
  As,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react'
import {Form, Formik, FormikTouched} from 'formik'
import {Persist} from 'formik-persist'
import debounce from 'lodash.debounce'
import memoize from 'lodash.memoize'

import * as yup from 'yup'
import * as React from 'react'
import {CheckCircleIcon, QuestionIcon, StarIcon} from '@chakra-ui/icons'
import {RadioGroup} from 'components/radio-group'
import {RadioCheckboxGroup} from 'components/radio-checkbox-group'
import {CreateDesignStep, DesignType, VoteAccess, VoteStyle} from 'types'
import {useCreateDesignStore} from 'store'
import {AiOutlineQuestion} from 'react-icons/ai'
import {MdPublic, MdLockOutline} from 'react-icons/md'
import {BiGroup} from 'react-icons/bi'

interface Values {
  name: string
  question: string
  description: string
  type: DesignType
  voteStyle: VoteStyle
  voteAccess: VoteAccess
  isPublic: 'true' | 'false'
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
  voteStyle: yup.string().oneOf([VoteStyle.FiveStar, VoteStyle.Choose]),
  voteAccess: yup.string().oneOf([VoteAccess.Anonymous, VoteAccess.LoggedIn]),
  isPublic: yup.string().oneOf(['true', 'false']),
})

interface FormRowsProps {
  id: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  ariaLabel: string
  onBlur: React.FocusEventHandler<HTMLInputElement>
  helper?: string
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
          The question or description your voters will see when asked to
          choose/rate from your versions of the design.
          <Text mt={5} fontStyle="italic">
            <Text as="span" fontWeight="semibold" fontStyle="normal">
              Example:
            </Text>{' '}
            Which logo better suggests this app is for designers?
          </Text>
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
        <QuestionIcon width="1em" height="1em" mb="0.5rem" cursor="help" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Voting style</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          How should people vote on your design versions.
          <Text mt={2}>
            <Text as="span" fontWeight="semibold">
              Five Stars
            </Text>{' '}
            Voters vote with ratings from 1-5 stars. You are shown the design
            version with the best average.
          </Text>
          <Text mt={2}>
            <Text as="span" fontWeight="semibold">
              Choose the best
            </Text>{' '}
            Voters just select their favorite design. You are shown % how many
            people chose a certain design
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

function VoteAccessPopover() {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <QuestionIcon width="1em" height="1em" mb="0.5rem" cursor="help" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">
          Who can vote on your survey
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Choose if you allow anonymous voting on your designs. People still
          need to login in order to leave comments.
          <Text mt={2}>
            <Text as="span" fontWeight="semibold">
              Anonymoys voting
            </Text>{' '}
            Anyone can vote
          </Text>
          <Text mt={2}>
            <Text as="span" fontWeight="semibold">
              Only people with accounts
            </Text>{' '}
            Voters need to register an account before they can vote
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
  helper,
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
        as={type}
      />
      {helper ? <FormHelperText>{helper}</FormHelperText> : null}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
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
        isPublic: state.isPublic,
        voteAccess: state.voteAccess,
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
        isPublic: state.setIsPublic,
        voteStyle: state.setVoteStyle,
        voteAccess: state.setVoteAccess,
      }),
      [],
    ),
  )

  const debouncedSetName = memoize(debounce(set.name, 1000))
  const debouncedSetQuestion = memoize(debounce(set.question, 1000))

  return (
    <Stack pb={6} px={{base: '6', md: '0'}}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        initialTouched={initialTouched}
        onSubmit={values => {
          saveDesign({...values})
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
                debouncedSetName(e.target.value)
              }}
              value={values.name}
              onBlur={handleBlur('name')}
              isInvalid={!!(touched.name && errors.name)}
              error={errors.name}
              autoFocus
              isRequired
            />
            <FormRow
              id="question"
              ariaLabel="Targeted question"
              placeholder="Ex: Which logo do you prefer?"
              value={values.question}
              onChange={e => {
                handleChange('question')(e)
                debouncedSetQuestion(e.target.value)
              }}
              onBlur={handleBlur('question')}
              isInvalid={!!(touched.question && errors.question)}
              error={errors.question}
              type="textarea"
              isRequired
            />

            <FormRow
              id="description"
              ariaLabel="Design description"
              placeholder="Ex: The design is made for a company doing space travel. They want to express innovation and courage."
              value={values.description}
              onChange={e => {
                handleChange('description')(e)
              }}
              onBlur={handleBlur('description')}
              isInvalid={!!(touched.description && errors.description)}
              error={errors.description}
              type="textarea"
            />
            <FormControl id="isPublic" py="0.5em" isRequired>
              <Flex alignItems="center">
                <FormLabel marginInlineEnd="0.2rem">Survey Type</FormLabel>
                <VoteStylePopover />
              </Flex>
              <RadioCheckboxGroup
                values={[
                  {
                    icon: MdPublic,
                    value: 'true',
                    title: 'Public survey',
                    description:
                      'This survey will be visible on the front page',
                  },
                  {
                    icon: MdLockOutline,
                    value: 'false',
                    title: 'Private survey',
                    description:
                      'This survey will only be available for internal usage',
                  },
                ]}
                name="isPublic"
                onChange={e => {
                  const formikHandler = handleChange('isPublic') as (
                    e: string,
                  ) => void
                  if (e !== 'true' && e !== 'false') {
                    return
                  }
                  formikHandler(e)
                  set.isPublic(e)
                }}
              />
            </FormControl>
            <FormControl id="voteStyle" py="0.5em" isRequired>
              <Flex alignItems="center">
                <FormLabel marginInlineEnd="0.2rem">Voting style</FormLabel>
                <VoteStylePopover />
              </Flex>

              <RadioGroup
                options={[
                  {
                    label: '1-5 Star Rating',
                    value: VoteStyle.FiveStar,
                    icon: <StarIcon mb="1" color="yellow.400" />,
                  },
                  {
                    label: 'Choose the best',
                    value: VoteStyle.Choose,
                    icon: <CheckCircleIcon mb="1" color="teal.400" />,
                  },
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
            </FormControl>
            <FormControl id="voteAccess" py="0.5em" isRequired>
              <Flex alignItems="center">
                <FormLabel marginInlineEnd="0.2rem">Who can vote?</FormLabel>
                <VoteAccessPopover />
              </Flex>

              <RadioGroup
                options={[
                  {
                    label: 'Anonymous voting',
                    value: VoteAccess.Anonymous,
                    icon: (
                      <Icon
                        as={AiOutlineQuestion}
                        mb="1"
                        color="teal.500"
                        boxSize={'1.5em'}
                      />
                    ),
                  },
                  {
                    label: 'Only people with accounts',
                    value: VoteAccess.LoggedIn,
                    icon: (
                      <Icon
                        as={BiGroup}
                        mb="1"
                        color="teal.500"
                        boxSize={'1.5em'}
                      />
                    ),
                  },
                ]}
                name="voteAccess"
                defaultValue={initialValues.voteAccess}
                onChange={e => {
                  const formikHandler = handleChange('voteAccess') as (
                    e: string | number,
                  ) => void
                  formikHandler(e)
                  set.voteAccess(e as VoteAccess)
                }}
              />
            </FormControl>

            <FormControl id="type" py="0.5em" isRequired>
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

            <Button
              colorScheme="orange"
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
