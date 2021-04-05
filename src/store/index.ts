import {DesignStep, DesignType} from 'types'
import create from 'zustand'

export type VersionInfo = {url: string; description?: string}

export type State = {
  step: DesignStep
  imagesByUrl: Set<string>
  images: Record<string, VersionInfo>
  name?: string
  description?: string
  question?: string
  type: DesignType
  setStep: (step: DesignStep) => void
  saveDesignInfo: (values: Values) => void
}

interface Values {
  name: string
  question: string
  description: string
  type: DesignType
}

export const useCreateDesignStore = create<State>((set, get) => ({
  step: DesignStep.Create,
  imagesByUrl: new Set(),
  images: {},
  type: DesignType.Web,
  setStep: (step: DesignStep) => set({step}),

  addVersion: (version: VersionInfo) =>
    set(state => {
      const {imagesByUrl, images} = get()
      imagesByUrl.add(version.url)
      images[version.url] = version
      return {imagesByUrl, images}
    }),
  deleteVersion: (url: string) =>
    set(() => {
      const {imagesByUrl, images} = get()
      imagesByUrl.delete(url)
      const {[url]: omitted, ...rest} = images
      return {imagesByUrl, images: rest}
    }),

  saveDesignInfo: (values: Values) => set(() => ({...values})),
}))
