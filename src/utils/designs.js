import {useClient} from 'context/auth-context'
import {useMutation, useQueryClient} from 'react-query'

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
}

export function useCreateDesign(options = {}) {
  const qc = useQueryClient()
  const client = useClient()
  return useMutation(
    ({name, description = null, img = null, question = null}) =>
      client(`v1/designs`, {data: {name, description, img, question}}),
    {
      ...defaultMutationOptions,
      ...options,
      onSettled: () => qc.invalidateQueries({queryKey: 'designs'}),
    },
  )
}

export function useDeleteDesign(options = {}) {
  const qc = useQueryClient()
  const client = useClient()
  return useMutation(
    designId => client(`v1/designs/${designId}`, {method: 'DELETE'}),
    {
      ...defaultMutationOptions,
      ...options,
      onSettled: () => qc.invalidateQueries({queryKey: 'designs'}),
    },
  )
}
