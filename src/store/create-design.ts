import {CreateDesignStep, DesignType, VoteStyle} from 'types'
import create from 'zustand'
import {persist} from 'zustand/middleware'

export type VersionInfo = {url: string; description?: string}

export type State = {
  step: CreateDesignStep
  imagesByUrl: string[]
  images: Record<string, VersionInfo>
  name?: string
  description?: string
  question?: string
  type: DesignType
  voteStyle: VoteStyle
  shownPreviewTooltip: boolean
  setName: (name: string) => void
  setDescription: (name: string) => void
  setQuestion: (name: string) => void
  setType: (type: DesignType) => void
  setVoteStyle: (style: VoteStyle) => void
  setStep: (step: CreateDesignStep) => void
  setVersionDescrption: (imageUrl: string, descripton: string) => void
  setShownTooltip: (val: boolean) => void
  saveDesignInfo: (values: Values) => void
  addVersion: (version: VersionInfo) => void
  deleteVersion: (url: string) => void
  clearState: () => void
}

interface Values {
  name: string
  question: string
  description: string
  type: DesignType
}

type InitialState = {
  step: CreateDesignStep
  imagesByUrl: string[]
  images: Record<string, VersionInfo>
  name?: string
  description?: string
  question?: string
  type: DesignType
  voteStyle: VoteStyle
  shownPreviewTooltip: boolean
}

const initialState: InitialState = {
  step: CreateDesignStep.Create,
  imagesByUrl: [],
  images: {},
  type: DesignType.Web,
  voteStyle: VoteStyle.Choose,
  question: undefined,
  name: undefined,
  description: undefined,
  shownPreviewTooltip: false,
}

export const useCreateDesignStore = create<State>(
  persist(
    (set, get) => ({
      step: CreateDesignStep.Create,
      imagesByUrl: [],
      images: {},
      type: DesignType.Web,
      voteStyle: VoteStyle.Choose,
      shownPreviewTooltip: false,
      setName: (name: string) => set({name}),
      setDescription: (description: string) => set({description}),
      setQuestion: (question: string) => set({question}),
      setType: (type: DesignType) => set({type}),
      setVoteStyle: (voteStyle: VoteStyle) => set({voteStyle}),
      setStep: (step: CreateDesignStep) => set({step}),
      setShownTooltip: (val: boolean) => set({shownPreviewTooltip: val}),
      addVersion: (version: VersionInfo) =>
        set(() => {
          const {imagesByUrl, images} = get()
          const newimagesByUrl = [...new Set([...imagesByUrl, version.url])]
          images[version.url] = {...version}
          return {imagesByUrl: newimagesByUrl, images}
        }),
      deleteVersion: (imageUrl: string) =>
        set(() => {
          const {imagesByUrl, images} = get()
          const newimagesByUrl = [
            ...imagesByUrl.filter(url => url !== imageUrl),
          ]
          delete images[imageUrl]
          return {imagesByUrl: newimagesByUrl, images: {...images}}
        }),
      saveDesignInfo: (values: Values) => set(() => ({...values})),
      setVersionDescrption: (imageUrl: string, description: string) =>
        set(() => {
          const {images} = get()
          const currentValue = images[imageUrl]

          return {
            images: {...images, [imageUrl]: {...currentValue, description}},
          }
        }),
      clearState: () => {
        set({...initialState})
        window.localStorage.removeItem('design-draft')
      },
    }),
    {
      name: 'design-draft', // persist store to local storage
    },
  ),
)
