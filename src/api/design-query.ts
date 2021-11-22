import {AxiosError} from 'axios'
import * as React from 'react'
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import {useUploadDesignImagesStore, useCreateDesignStore} from 'store'
import {
  ApiDesign,
  APIUser,
  Design,
  DesignType,
  VoteAccess,
  VoteStyle,
} from 'types'
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
  apiClient,
  onRequestSuccess,
  onRequestError,
} from './axios-client'
import {singleLoadingDesign} from '../utils/loading-data'
import {keysToCamel} from '../utils/object'
import {useNavigate} from 'react-router'

interface CreateDesignBody {
  name: string
  description: string | null | undefined
  question: string
  designType: DesignType
  voteStyle: VoteStyle
  voteAccess: VoteAccess
  isPublic: 'true' | 'false'
  images: File[]
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

function getApiUser() {
  return getRequest<{account: APIUser}>('v1/account')
}

function createDesign(design: CreateDesignBody) {
  const data = new FormData()
  for (let i = 0; i < design.images.length; ++i) {
    data.append('versions', design.images[i], design.images[i].name)
  }
  data.append('name', design.name)
  data.append('designType', design.designType)
  data.append('question', design.question)
  data.append('voteStyle', design.voteStyle)
  data.append('voteAccess', design.voteAccess)
  data.append('description', design.description ?? '')
  data.append('isPublic', design.isPublic)
  return apiClient
    .post('v2/designs', data, {
      headers: {'Content-Type': 'multipart/form-data;'},
    })
    .then(onRequestSuccess)
    .catch(onRequestError)
  // return postRequest<CreateDesignResponse>('v2/designs', data)
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
  return getRequest<Design>(`v1/designs/${designId}`)
}

async function getDesignByShortUrl(shortUrl: string) {
  return getRequest<Design>(`v1/designs/vote/short/${shortUrl}`)
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

function deleteDesign(designId: string) {
  return deleteRequest<null>(`v1/designs/${designId}`)
}

function getPaginatedDesign() {
  return getRequest<{latest: Design[]; popular: Design[]}>(
    'v1/designs/paginated/q',
  )
}

export function useCreateDesignFromDraft() {
  const qc = useQueryClient()
  const navigate = useNavigate()

  const design = useCreateDesignStore(
    React.useCallback(
      state => ({
        name: state.name ?? '',
        description: state.description,
        question: state.question ?? '',
        designType: state.type,
        isPublic: state.isPublic,
        voteStyle: state.voteStyle,
        voteAccess: state.voteAccess,
      }),
      [],
    ),
  )
  const images = useUploadDesignImagesStore(state => state.images)
  const clearImages = useUploadDesignImagesStore(state => state.clearState)

  const clearDraftState = useCreateDesignStore(state => state.clearState)

  return useMutation(
    () => createDesign({...design, images: images.map(img => img.file)}),
    {
      onSettled: data => {
        // clear out draft from localstorage and zustand
        // refetch designs to include the new one
        window.localStorage.removeItem('design-info')
        clearDraftState()
        clearImages()
        qc.invalidateQueries({queryKey: 'designs'})
        navigate(`/results/${data.shortUrl}`, {replace: true})
      },
    },
  )
}

export function useDesign(
  designId: string,
  options: QueryOptions<Design, AxiosError> = {},
) {
  const {data, ...rest} = useQuery<Design, AxiosError>({
    queryKey: ['design', {designId}],
    queryFn: () => getDesign(designId),
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 3,
    ...options,
  })

  return {data: data ?? singleLoadingDesign, ...rest}
}

export function useUrlDesign(
  shortUrl: string,
  options: QueryOptions<Design, AxiosError<Design>> = {},
) {
  const qc = useQueryClient()
  const {data, ...rest} = useQuery({
    queryKey: ['design', {shortUrl}],
    queryFn: () => getDesignByShortUrl(shortUrl),
    onSettled(data) {
      qc.setQueryData<Design>(['design', {designId: data?.designId}], old => {
        if (data) {
          return data
        }
        if (old) {
          return old
        }
        return singleLoadingDesign
      })
    },
    ...options,
  })
  return {
    data: data ?? singleLoadingDesign,
    ...rest,
  }
}

export function useHomeDesigns(
  options: QueryOptions<{latest: Design[]; popular: Design[]}, AxiosError> = {},
) {
  const {data, ...rest} = useQuery({
    queryKey: 'home-designs',
    queryFn: () => getPaginatedDesign(),
    ...options,
  })

  return {data: data ?? {latest: [], popular: []}, ...rest}
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

export function useDeleteDesign(options: QueryOptions<null, AxiosError> = {}) {
  const qc = useQueryClient()
  return useMutation((designId: string) => deleteDesign(designId), {
    ...options,
    onSettled: () => qc.invalidateQueries({queryKey: 'designs'}),
  })
}

export function useCreateMultipleDesignVersions(
  designId: string,
  options: QueryOptions<CreateDesignResponse, AxiosError> = {},
) {
  const qc = useQueryClient()

  return useMutation(
    (apiVersions: ApiVersion[]) => createDesignVersions(designId, apiVersions),
    {
      ...options,
      onSettled: () =>
        qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]}),
    },
  )
}

export function useApiUser(
  options: QueryOptions<{account: APIUser}, AxiosError<APIUser>> = {},
) {
  return useQuery({queryFn: getApiUser, queryKey: 'apiUser', ...options})
}
