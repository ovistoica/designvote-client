import create from 'zustand'
import {persist} from 'zustand/middleware'

export type ManageDesignState = {
  voterId?: string
  setVoterId: (voterId: string) => void
  clearState: () => void
}

type InitialDataState = {
  voterId?: string
}

const initialState: InitialDataState = {}

export const useManageDesign = create<ManageDesignState>(
  persist(
    (set, get) => ({
      ...initialState,
      setVoterId(voterId: string) {
        set({voterId})
      },
      clearState() {
        set({...initialState})
        window.localStorage.removeItem('vote-design')
      },
    }),
    {
      name: 'vote-design', // persist store to local storage
    },
  ),
)
