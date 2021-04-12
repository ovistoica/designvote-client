import {useClient} from 'context/auth-context'
import {useMutation, useQueryClient} from 'react-query'

const defaultMutationOptions = {
  onError: (_, _1, recover) =>
    typeof recover === 'function' ? recover() : null,
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
      onSettled: () => {
        qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]})
      },
    },
  )
}

function useVoteDesignVersion(designId, options = {}) {
  const qc = useQueryClient()
  const client = useClient()
  return useMutation(
    ({versionId, opinion = null}) => {
      return client(`v1/designs/${designId}/votes`, {
        data: {'version-id': versionId, opinion: !!opinion ? opinion : null},
      })
    },
    {
      ...defaultMutationOptions,
      ...options,
      onSettled: () => {
        qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]})
      },
    },
  )
}

export {useUploadDesignVersions, useVoteDesignVersion}
