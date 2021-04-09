import {AxiosError} from 'axios'
import * as React from 'react'
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import {useCreateDesignStore} from 'store'
import {ApiDesign, Design, DesignType, NormalizedDesign, VoteStyle} from 'types'
import {getRequest, postRequest} from './axios-client'
import {loadingDesign} from './loading-data'
import {normalizeDesign} from './normalize'
import {keysToCamel} from './object'

interface CreateDesignBody {
  name: string
  description: string | undefined
  question: string | undefined
  type: DesignType
  voteStyle: VoteStyle
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
  return postRequest(`v1/designs/${designId}/publish`)
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

  const designVersions = imagesByUrl.map((img, index) => ({
    name: images[img].description ?? `#${index + 1}`,
    pictures: [img],
    description: null,
  }))

  return useMutation(
    () =>
      createDesign({...design, img: null}).then(async data => {
        const designId = data?.['design-id']
        const [result] = await Promise.all([
          createDesignVersions(designId, designVersions),
          publishDesign(designId),
        ])
        return result['design-id']
      }),
    {
      onSettled: () => {
        // clear out draft from localstorage and zustand
        // refetch designs to include the new one
        // TODO: Put this back
        // window.localStorage.removeItem('design-info')
        // clearDraftState()
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
  const {data, ...rest} = useQuery({
    queryKey: ['design', {shortUrl}],
    queryFn: () => getDesignByShortUrl(shortUrl),
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
