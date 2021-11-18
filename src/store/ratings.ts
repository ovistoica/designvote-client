/**
 * State responsible for holding ratings
 * while user votes on multiple versions
 *
 * This state is cleared after the user has voted
 */
import create from 'zustand'
import {persist} from 'zustand/middleware'
import memoize from 'lodash.memoize'

export type RatingsState = {
  /**
   * A record with versionId as key and the
   * rating given as value
   */
  currentRatings: Record<string, number | undefined>

  setRating: (versionId: string, rating: number | undefined) => void
  clearState: () => void
}

type InitialDataState = {
  currentRatings: Record<string, number>
}

const initialState: InitialDataState = {
  currentRatings: {},
}

export const getRating = memoize((versionId: string) => (state: RatingsState) =>
  state.currentRatings[versionId],
)

export const canSubmitRatings = (state: RatingsState) => {
  const {currentRatings} = state

  return Object.values(currentRatings).filter(r => !!r).length > 0
}

export const useRatingsState = create<RatingsState>(
  persist(
    (set, getState) => ({
      ...initialState,
      setRating(versionId, rating) {
        set({
          currentRatings: {...getState().currentRatings, [versionId]: rating},
        })
      },
      clearState() {
        set({...initialState})
        window.localStorage.removeItem('vote-design')
      },
    }),
    {
      name: 'vote-design', // persist store to local storage
      getStorage: () => sessionStorage,
    },
  ),
)
