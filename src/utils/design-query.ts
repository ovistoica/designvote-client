import {AxiosError} from 'axios'
import * as React from 'react'
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import {useNavigate} from 'react-router'
import {useCreateDesignStore} from 'store'
import {ApiDesign, Design, DesignType, NormalizedDesign, VoteStyle} from 'types'
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from './axios-client'
import {loadingDesign} from './loading-data'
import {normalizeDesign} from './normalize'
import {keysToCamel} from './object'

interface CreateDesignBody {
  name: string
  description: string | null | undefined
  question: string
  'design-type': DesignType
  'vote-style': VoteStyle
  img: null
}

interface CreateDesignResponse {
  'design-id': string
}

interface CreateDesignVersionResponse {
  'version-id': string
}

interface ApiVersion {
  name: string
  pictures: string[]
  description: null
}

interface EditDesignBody {
  name: string | null
  description: string | null
  question: string | null
  img: string | null
  'design-type': DesignType | null
  public: boolean | null
}

type QueryOptions<Data, Error> = Omit<
  UseQueryOptions<Data, Error>,
  'queryKey' | 'queryFn'
>

function createDesign(design: CreateDesignBody) {
  return postRequest<CreateDesignResponse, CreateDesignBody>(
    'v1/designs',
    design,
  )
}

function createDesignVersions(designId: string, versions: ApiVersion[]) {
  return postRequest<CreateDesignResponse, {versions: ApiVersion[]}>(
    `v1/designs/${designId}/versions/multiple`,
    {versions},
  )
}

function publishDesign(designId: string) {
  return postRequest<Design>(`v1/designs/${designId}/publish`)
}

async function getDesign(designId: string) {
  return getRequest<ApiDesign>(`v1/designs/${designId}`).then(result =>
    normalizeDesign(result),
  )
}

async function getDesignByShortUrl(shortUrl: string) {
  return getRequest<ApiDesign>(`v1/designs/short/${shortUrl}`).then(result =>
    normalizeDesign(result),
  )
}

async function getDesigns() {
  return getRequest<ApiDesign[]>('v1/designs').then(apiDesigns =>
    keysToCamel<ApiDesign[], Design[]>(apiDesigns),
  )
}

function createDesignVersion(designId: string, version: ApiVersion) {
  return postRequest<CreateDesignVersionResponse, ApiVersion>(
    `v1/designs/${designId}/versions`,
    version,
  )
}

function deleteDesignVersion(designId: string, versionId: string) {
  return deleteRequest<null>(`v1/designs/${designId}/versions`, {
    data: {'version-id': versionId},
  })
}

function editDesign(designId: string, body: EditDesignBody) {
  return putRequest<Design, EditDesignBody>(`v1/designs/${designId}`, body)
}

function voteDesignVersion(designId: string, versionId: string) {
  return postRequest<null, {'version-id': string}>(
    `v1/designs/${designId}/votes`,
    {
      'version-id': versionId,
    },
  )
}

function deleteDesign(designId: string) {
  return deleteRequest<null>(`v1/designs/${designId}`)
}

export function useCreateFromDraft() {
  const qc = useQueryClient()

  const {images, imagesByUrl, ...design} = useCreateDesignStore(
    React.useCallback(
      state => ({
        name: state.name ?? '',
        description: state.description,
        question: state.question,
        type: state.type,
        voteStyle: state.voteStyle,
        images: state.images,
        imagesByUrl: state.imagesByUrl,
      }),
      [],
    ),
  )
  const clearDraftState = useCreateDesignStore(state => state.clearState)
  const navigate = useNavigate()
  const designVersions = imagesByUrl.map((img, index) => ({
    name: images[img].description ?? `#${index + 1}`,
    pictures: [img],
    description: null,
  }))

  return useMutation(
    () =>
      createDesign({
        name: design.name,
        description: design.description ?? null,
        question: design.question ?? '',
        'vote-style': design.voteStyle,
        'design-type': design.type,
        img: null,
      }).then(async data => {
        const designId = data?.['design-id']
        const [result] = await Promise.all([
          createDesignVersions(designId, designVersions),
          publishDesign(designId),
        ])
        return result['design-id']
      }),
    {
      onSettled: designId => {
        // clear out draft from localstorage and zustand
        // refetch designs to include the new one
        navigate(`/design/${designId}`)
        window.localStorage.removeItem('design-info')
        clearDraftState()
        qc.invalidateQueries({queryKey: 'designs'})
      },
    },
  )
}

export function useDesign(
  designId: string,
  options: QueryOptions<NormalizedDesign, AxiosError> = {},
) {
  const {data, ...rest} = useQuery<NormalizedDesign, AxiosError>({
    queryKey: ['design', {designId}],
    queryFn: () => getDesign(designId),
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 3,
    ...options,
  })

  return {data: data ?? loadingDesign, ...rest}
}

export function useUrlDesign(
  shortUrl: string,
  options: QueryOptions<NormalizedDesign, AxiosError> = {},
) {
  const qc = useQueryClient()
  const {data, ...rest} = useQuery({
    queryKey: ['design', {shortUrl}],
    queryFn: () => getDesignByShortUrl(shortUrl),
    onSettled(data) {
      qc.setQueryData<NormalizedDesign>(
        ['design', {designId: data?.design.designId}],
        old => {
          if (data) {
            return data
          }
          if (old) {
            return old
          }
          return loadingDesign
        },
      )
    },
    ...options,
  })
  return {
    data: data ?? loadingDesign,
    ...rest,
  }
}

export function useDesigns(options: QueryOptions<Design[], AxiosError> = {}) {
  const {data, ...rest} = useQuery({
    queryKey: 'designs',
    queryFn: () => getDesigns(),
    ...options,
  })

  return {data: data ?? [], ...rest}
}

export function useCreateDesignVersion(
  designId: string,
  options: QueryOptions<CreateDesignVersionResponse, AxiosError> = {},
) {
  const qc = useQueryClient()
  return useMutation(
    (version: ApiVersion) => createDesignVersion(designId, version),
    {
      ...options,
      onSettled: () => qc.invalidateQueries({queryKey: ['design', {designId}]}),
    },
  )
}

export function useDeleteDesignVersion(
  designId: string,
  options: QueryOptions<null, AxiosError> = {},
) {
  const qc = useQueryClient()
  return useMutation(
    (versionId: string) => deleteDesignVersion(designId, versionId),
    {
      ...options,
      onSettled: () => {
        qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]})
      },
    },
  )
}

interface EditDesign {
  name: string | null
  description: string | null
  question: string | null
  img: string | null
  publicDesign: boolean | null
  designType: DesignType | null
}

export function useEditDesign(
  designId: string,
  options: QueryOptions<Design, AxiosError> = {},
) {
  const qc = useQueryClient()
  const queryFn = ({
    name = null,
    description = null,
    img = null,
    designType = null,
    publicDesign = null,
    question = null,
  }: Partial<EditDesign>) => {
    let finalData: EditDesignBody = {
      name,
      description,
      img,
      'design-type': designType,
      public: publicDesign,
      question,
    }
    return editDesign(designId, finalData)
  }
  return useMutation(queryFn, {
    ...options,
    onSettled: () => {
      qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]})
      qc.invalidateQueries({exact: true, queryKey: ['designs', {designId}]})
    },
  })
}

export function usePublishDesign(
  designId: string,
  options: QueryOptions<Design, AxiosError> = {},
) {
  const qc = useQueryClient()
  return useMutation(() => publishDesign(designId), {
    ...options,
    onSettled: () =>
      qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]}),
  })
}

export function useVoteDesignVersion(
  designId: string,
  options: QueryOptions<null, AxiosError> = {},
) {
  const qc = useQueryClient()
  return useMutation(
    (versionId: string) => voteDesignVersion(designId, versionId),
    {
      ...options,
      onSettled: () => {
        qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]})
      },
    },
  )
}

export function useDeleteDesign(options: QueryOptions<null, AxiosError> = {}) {
  const qc = useQueryClient()
  return useMutation((designId: string) => deleteDesign(designId), {
    ...options,
    onSettled: () => qc.invalidateQueries({queryKey: 'designs'}),
  })
}
