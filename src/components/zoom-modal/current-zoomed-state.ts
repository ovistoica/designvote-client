/**
 * Zustand state to manage which image is currently
 * being displayed in the zoom modal
 */

import create from 'zustand'

export type CarouselImage = {url: string; versionId: string}

export type ZoomModalState = {
  images?: CarouselImage[]
  startIndex?: number
  title?: string
  setImages: (images: CarouselImage[]) => void
  setIndex: (index: number) => void
  clearState: () => void
}

type InitialDataState = {
  images?: CarouselImage[]
  title?: string
}

const initialState: InitialDataState = {}

export const useZoomModalState = create<ZoomModalState>((set, get) => ({
  ...initialState,
  setImages: (images: CarouselImage[]) => {
    set({images})
  },
  setIndex: (index: number) => {
    set({startIndex: index})
  },
  clearState: () => {
    set({...initialState})
  },
}))
