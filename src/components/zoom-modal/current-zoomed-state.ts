/**
 * Zustand state to manage which image is currently
 * being displayed in the zoom modal
 */

import create from 'zustand'

export type ZoomModalState = {
  imageUrl?: string
  title?: string
  setImage: (url: string, title: string) => void
  clearState: () => void
}

type InitialDataState = {
  imageUrl?: string
  title?: string
}

const initialState: InitialDataState = {}

export const useZoomModalState = create<ZoomModalState>((set, get) => ({
  ...initialState,
  setImage: (url: string, title: string) => {
    set({imageUrl: url, title})
  },
  clearState: () => {
    set({...initialState})
  },
}))
