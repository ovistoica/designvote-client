import {FormControl, FormErrorMessage} from '@chakra-ui/form-control'
import {Input} from '@chakra-ui/input'
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
  onChange: (comment: string) => void
  initialValue?: string
}

export function CommentInput({
  onChange,
  initialValue = '',
}: CommentsSectionProps) {
  const initialValues = {comment: initialValue}
  const {
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
  } = useFormik({
    validationSchema,
    initialTouched,
    initialValues,
    onSubmit: (_, helpers) => {
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
          type="text"
          as="textarea"
          placeholder="Add your comment"
          onChange={e => {
            handleChange(e)
            onChange(e.target.value)
          }}
          onBlur={handleBlur}
          value={values.comment}
          transition="0.2s all"
          h={touched.comment && values.comment ? '20' : 'auto'}
          _focus={{h: '20'}}
        />
        <FormErrorMessage>
          {touched.comment && errors.comment && errors.comment}
        </FormErrorMessage>
      </FormControl>
    </form>
  )
}
