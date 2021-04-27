import {IconButton} from '@chakra-ui/button'
import {FormControl, FormErrorMessage} from '@chakra-ui/form-control'
import {Input} from '@chakra-ui/input'
import {RiSendPlaneFill} from 'react-icons/ri'
import {useAddOpinion} from 'utils/design-query'
import {FormikTouched, useFormik} from 'formik'
import * as yup from 'yup'
import {useVoterId} from 'utils/votes'

interface Values {
  opinion: string
}

const validationSchema = yup.object().shape({
  opinion: yup
    .string()
    .min(2, 'comment too short')
    .max(265, 'comment too lomng')
    .required('Required'),
})

const initialTouched: FormikTouched<Values> = {}

const initialValues = {opinion: ''}

interface CommentsSectionProps {
  designId: string
  versionId: string
  onSubmitComment: (comment: string) => void
}

export function CommentsSection({
  designId,
  versionId,
  onSubmitComment,
}: CommentsSectionProps) {
  const {mutate: addOpinion, isLoading: isOpinionLoading} = useAddOpinion(
    designId,
  )
  const voterId = useVoterId()
  const {errors, handleSubmit, handleChange, values} = useFormik({
    validationSchema,
    initialTouched,
    initialValues,
    onSubmit: ({opinion}, helpers) => {
      addOpinion({opinion, voterId, versionId})
      onSubmitComment(opinion)
      helpers.resetForm()
    },
  })
  return (
    <form style={{marginTop: '1em'}} onSubmit={handleSubmit}>
      <FormControl
        isInvalid={!!errors.opinion}
        maxW="40em"
        display="flex"
        pt="0.5em"
      >
        <Input
          id="opinion"
          name="opinion"
          type="text"
          as="textarea"
          placeholder="Leave a comment"
          onChange={handleChange}
          value={values.opinion}
        />
        <FormErrorMessage>{errors.opinion && errors.opinion}</FormErrorMessage>
        <IconButton
          colorScheme="teal"
          marginInlineStart="0.5em"
          aria-label="Send comment"
          icon={<RiSendPlaneFill />}
          variant="outline"
          isLoading={isOpinionLoading}
          type="submit"
        />
      </FormControl>
    </form>
  )
}
