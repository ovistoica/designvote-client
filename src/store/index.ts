import {DesignStep, DesignType, VoteStyle} from 'types'
import create from 'zustand'
import {persist} from 'zustand/middleware'

export type VersionInfo = {url: string; description?: string}

export type State = {
  step: DesignStep
  imagesByUrl: string[]
  images: Record<string, VersionInfo>
  name?: string
  description?: string
  question?: string
  type: DesignType
  voteStyle: VoteStyle
  setStep: (step: DesignStep) => void
  setVersionDescrption: (imageUrl: string, descripton: string) => void
  saveDesignInfo: (values: Values) => void
  addVersion: (version: VersionInfo) => void
  deleteVersion: (url: string) => void
}

interface Values {
  name: string
  question: string
  description: string
  type: DesignType
}

export const useCreateDesignStore = create<State>(
  persist(
    (set, get) => ({
      step: DesignStep.Create,
      imagesByUrl: [],
      images: {},
      type: DesignType.Web,
      voteStyle: VoteStyle.Choose,
      setStep: (step: DesignStep) => set({step}),

      addVersion: (version: VersionInfo) =>
        set(state => {
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
    }),
    {
      name: 'design-draft', // persist store to local storage
    },
  ),
)
