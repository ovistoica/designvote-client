import {useClient} from 'context/auth-context'
import {useMutation, useQueryClient} from 'react-query'

const defaultMutationOptions = {
  onError: (_, _1, recover) =>
    typeof recover === 'function' ? recover() : null,
}

function useCreateDesignVersion(designId, options = {}) {
  const qc = useQueryClient()
  const client = useClient()
  return useMutation(
    ({name, pictures = [], description = ''}) =>
      client(`v1/designs/${designId}/versions`, {
        data: {name, pictures, description},
      }),
    {
      ...defaultMutationOptions,
      ...options,
      onSettled: () => qc.invalidateQueries({queryKey: ['design', {designId}]}),
    },
  )
}

export {useCreateDesignVersion}
