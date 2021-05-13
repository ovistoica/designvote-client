import {AxiosError} from 'axios'
import * as React from 'react'
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import {useNavigate} from 'react-router'
import {useCreateDesignStore} from 'store'
import {useVoteDesignState} from 'store/vote-design'
import {
  ApiDesign,
  Design,
  DesignType,
  NormalizedDesign,
  Opinion,
  VoteStyle,
} from 'types'
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

interface AddOpinionBody {
  'voter-id': string
  'version-id': string
  opinion: string
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

function addOpinion(designId: string, body: AddOpinionBody) {
  return postRequest<Opinion, AddOpinionBody>(
    `v1/designs/${designId}/opinions`,
    body,
  )
}

type DesignFeedbackBody = {
  comments: [string, string][]
  ratings: [string, number][]
  'voter-name': string | null
}

function addDesignFeedback(designId: string, body: DesignFeedbackBody) {
  return postRequest<undefined, DesignFeedbackBody>(
    `v1/designs/${designId}/feedback`,
    body,
  )
}

interface VoteDesignVersionBody {
  'version-id': string
  'voter-id': string
  rating: number | null
  'vote-style': string
}

interface VoteDesignVersionParams {
  designId: string
  versionId: string
  voterId: string
  rating: number | null
  voteStyle: VoteStyle
}

function voteDesignVersion({
  designId,
  versionId,
  voterId,
  rating,
  voteStyle,
}: VoteDesignVersionParams) {
  return postRequest<null, VoteDesignVersionBody>(
    `v1/designs/${designId}/votes`,
    {
      rating,
      'version-id': versionId,
      'voter-id': voterId,
      'vote-style': voteStyle,
    },
  )
}

function deleteDesign(designId: string) {
  return deleteRequest<null>(`v1/designs/${designId}`)
}

export function useCreateDesignFromDraft() {
  const qc = useQueryClient()

  const {images, imagesByUrl, ...design} = useCreateDesignStore(
    React.useCallback(
      state => ({
        name: state.name ?? '',
        description: state.description,
        question: state.question,
        type: state.type,
        voteStyle: VoteStyle.FiveStar,
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

interface VoteMutateParams {
  versionId: string
  voterId: string
  voteStyle: VoteStyle
  rating: number | null | undefined
}

export type VoteFunction = UseMutateFunction<
  null,
  AxiosError<any>,
  VoteMutateParams,
  unknown
>

export function useVoteDesignVersion(
  designId: string,
  options: QueryOptions<null, AxiosError> = {},
) {
  return useMutation(
    ({versionId, voterId, rating = null, voteStyle}: VoteMutateParams) =>
      voteDesignVersion({designId, versionId, rating, voterId, voteStyle}),
    {...options},
  )
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

export function useAddOpinion(
  designId: string,
  options: QueryOptions<Opinion, AxiosError> = {},
) {
  const qc = useQueryClient()

  return useMutation(
    (params: {voterId: string; opinion: string; versionId: string}) =>
      addOpinion(designId, {
        'version-id': params.versionId,
        opinion: params.opinion,
        'voter-id': params.voterId,
      }),
    {
      ...options,
      onSettled: () =>
        qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]}),
    },
  )
}

export function useGiveDesignFeedback(
  designId: string,
  options: QueryOptions<undefined, AxiosError> = {},
) {
  const qc = useQueryClient()

  // Get necessary data from vote state
  const feedbackBody = useVoteDesignState(state => ({
    comments: Object.entries(state.comments).filter(([_, v]) => !!v) as [
      string,
      string,
    ][],
    ratings: Object.entries(state.currentRatings).filter(([_, v]) => !!v) as [
      string,
      number,
    ][],
    'voter-name': state.voterName ?? null,
  }))

  const clearVoteState = useVoteDesignState(state => state.clearState)

  return useMutation(() => addDesignFeedback(designId, feedbackBody), {
    ...options,
    onSettled: () => {
      qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]})
      clearVoteState()
    },
  })
}
