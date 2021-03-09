import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Text,
  Heading,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import {Button} from 'components/lib'
import {useCreateDesign} from 'utils/designs'
import {useNavigate} from 'react-router-dom'
import {Formik, Form} from 'formik'
import * as yup from 'yup'

const initialValues = {
  name: '',
  question: '',
  description: '',
}

const initialTouched = {
  name: '',
  question: '',
  description: '',
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name too short')
    .max(50, 'Name too lomng')
    .required('Required'),
  question: yup.string().required('Required'),
  description: yup.string(),
})

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
}) {
  return (
    <FormControl
      id={id}
      aria-label={ariaLabel}
      isRequired={isRequired}
      isInvalid={isInvalid}
    >
      <FormLabel>{ariaLabel}</FormLabel>

      <Input
        id={id}
        value={value}
        aria-label={ariaLabel}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        minH={type === 'textarea' ? '3em' : null}
        _focus={{borderColor: 'primary.500'}}
        as={type}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

function CreateDesignModal({isOpen, onClose}) {
  const {mutate: createDesign, isLoading} = useCreateDesign()

  const navigate = useNavigate()

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontWeight="400">Create a Design</Heading>
        </ModalHeader>
        <ModalCloseButton
          color="gray.500"
          fontSize="xl"
          fontWeight="800"
          onClick={onClose}
        />
        <ModalBody pb={6}>
          <Text color="textSecondary" fontSize="md">
            Designs contain multiple versions from which your partners/costumers
            can choose{' '}
          </Text>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            initialTouched={initialTouched}
            onSubmit={values =>
              createDesign(values, {
                onSettled: data =>
                  navigate(`/upload-design/${data['design-id']}`),
              })
            }
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <Form style={{marginTop: '1em'}}>
                <FormRow
                  id="name"
                  ariaLabel="Design name"
                  placeholder="my-cool-new-design"
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  isInvalid={touched.name && errors.name}
                  error={errors.name}
                  autoFocus
                  isRequired
                />
                <FormRow
                  id="question"
                  ariaLabel="Targeted question"
                  placeholder="Which button fits better for sign up screen?"
                  onChange={handleChange('question')}
                  onBlur={handleBlur('question')}
                  value={values.question}
                  isInvalid={touched.question && errors.question}
                  error={errors.question}
                  type="textarea"
                  isRequired
                />

                <FormRow
                  id="description"
                  ariaLabel="Design description"
                  placeholder="This sign-up screen is for a travel app"
                  onChange={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  isInvalid={touched.description && errors.description}
                  error={errors.description}
                  type="textarea"
                />
                <Button
                  isLoading={isLoading}
                  mt="1em"
                  textTransform="uppercase"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export {CreateDesignModal}
