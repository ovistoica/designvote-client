import {DesignTab} from 'types'
import create from 'zustand'
import {persist} from 'zustand/middleware'

export type ManageDesignState = {
  tab: DesignTab
  setTab: (tab: DesignTab) => void
  clearState: () => void
}

type InitialDataState = {
  tab: DesignTab
}

const initialState: InitialDataState = {
  tab: DesignTab.Preview,
}

export const useManageDesign = create<ManageDesignState>(
  persist(
    (set, get) => ({
      ...initialState,
      setTab: (tab: DesignTab) => set({tab}),
      clearState: () => {
        set({...initialState})
        window.localStorage.removeItem('manage-design')
      },
    }),
    {
      name: 'manage-design', // persist store to local storage
    },
  ),
)
