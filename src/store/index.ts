import {DesignStep, DesignType} from 'types'
import create from 'zustand'

export type VersionInfo = {url: string; description?: string}

export type State = {
  step: DesignStep
  imagesByUrl: string[]
  images: Record<string, VersionInfo>
  name?: string
  description?: string
  question?: string
  type: DesignType
  setStep: (step: DesignStep) => void
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

export const useCreateDesignStore = create<State>((set, get) => ({
  step: DesignStep.Create,
  imagesByUrl: [],
  images: {},
  type: DesignType.Web,
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
      const newimagesByUrl = [...imagesByUrl.filter(url => url !== imageUrl)]
      delete images[imageUrl]
      // console.log({imagesByUrl: newimagesByUrl, images: {...images}})

      return {imagesByUrl: newimagesByUrl, images: {...images}}
    }),

  saveDesignInfo: (values: Values) => set(() => ({...values})),
}))
