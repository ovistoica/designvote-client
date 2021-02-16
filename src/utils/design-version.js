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

// upload multiple design versisons at once
// USAGE:
// const {mutate} = useUploadDesignVersions(designIid);
// mutate(versions);
function useUploadDesignVersions(designId, options = {}) {
  const client = useClient()
  const qc = useQueryClient()

  return useMutation(
    versions =>
      client(`v1/designs/${designId}/versions/multiple`, {
        data: {
          versions: versions.map(
            ({name, pictures = [], description = null}) => ({
              name,
              pictures,
              description,
            }),
          ),
        },
      }),
    {
      ...defaultMutationOptions,
      ...options,
      onSettled: async () => {
        qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]})
      },
    },
  )
}

export {useCreateDesignVersion, useUploadDesignVersions}
