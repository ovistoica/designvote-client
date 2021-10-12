import * as React from 'react'
import {FormControl, FormErrorMessage} from '@chakra-ui/form-control'
import {Input} from '@chakra-ui/input'
import {Button, ButtonGroup} from '@chakra-ui/react'
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
  const [isActive, setIsActive] = React.useState(false)
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
          bg="white"
          as="textarea"
          placeholder="Leave your opinion"
          focusBorderColor="gray.400"
          onChange={e => {
            handleChange(e)
            onChange?.(e.target.value)
          }}
          onFocus={() => setIsActive(true)}
          onBlur={e => {
            handleBlur(e)
            setIsActive(false)
          }}
          value={values.comment}
          transition="0.2s all"
          // h={touched.comment && values.comment ? '20' : 'auto'}
          // _focus={{h: '20'}}
        />
        <FormErrorMessage>
          {touched.comment && errors.comment && errors.comment}
        </FormErrorMessage>
        {isActive ? (
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
