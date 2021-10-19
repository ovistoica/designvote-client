import {FormControl, FormErrorMessage} from '@chakra-ui/form-control'
import {Input} from '@chakra-ui/input'
import {Button, ButtonGroup, useColorModeValue as mode} from '@chakra-ui/react'
import {FormikTouched, useFormik} from 'formik'
import * as yup from 'yup'

interface Values {
  comment: string
}

const validationSchema = yup.object().shape({
  comment: yup
    .string()
    .min(2, 'comment too short')
    .max(265, 'comment too long'),
})

const initialTouched: FormikTouched<Values> = {}

interface CommentsSectionProps {
  onChange?: (comment: string) => void
  onSubmit: (comment: string) => void
  initialValue?: string
  isLoading?: boolean
}

export function CommentInput({
  onChange,
  onSubmit,
  initialValue = '',
  isLoading = false,
}: CommentsSectionProps) {
  const initialValues = {comment: initialValue}
  const {
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    resetForm,
  } = useFormik({
    validationSchema,
    initialTouched,
    initialValues,
    onSubmit: (values, helpers) => {
      onSubmit(values.comment)
      helpers.resetForm()
    },
  })
  return (
    <form style={{marginTop: '1em'}} onSubmit={handleSubmit}>
      <FormControl
        id="comment"
        isInvalid={!!(touched.comment && errors.comment)}
      >
        <Input
          name="comment"
          variant="flushed"
          type="text"
          bg={mode('white', 'gray.700')}
          as="textarea"
          placeholder="Leave your opinion"
          focusBorderColor="gray.400"
          onChange={e => {
            handleChange(e)
            onChange?.(e.target.value)
          }}
          onBlur={e => {
            handleBlur(e)
          }}
          value={values.comment}
          transition="0.2s all"
        />
        <FormErrorMessage>
          {touched.comment && errors.comment && errors.comment}
        </FormErrorMessage>
        {values.comment ? (
          <ButtonGroup mt={4} colorScheme="gray">
            <Button isLoading={isLoading} type="submit">
              Submit
            </Button>
            <Button
              variant="ghost"
              isLoading={isLoading}
              onClick={() => resetForm()}
            >
              Cancel
            </Button>
          </ButtonGroup>
        ) : null}
      </FormControl>
    </form>
  )
}
