import create from 'zustand'
import {persist} from 'zustand/middleware'
import memoize from 'lodash.memoize'

export type VoteDesignState = {
  voterId?: string
  /**
   * A record with versionId as key and the
   * rating given as value
   */
  currentRatings: Record<string, number | undefined>
  setVoterId: (voterId: string) => void
  setRating: (versionId: string, rating: number) => void
  clearState: () => void
}

type InitialDataState = {
  voterId?: string
  currentRatings: Record<string, number>
}

const initialState: InitialDataState = {
  currentRatings: {},
}

export const getRating = memoize(
  (versionId: string) => (state: VoteDesignState) =>
    state.currentRatings[versionId],
)

export const useVoteDesignState = create<VoteDesignState>(
  persist(
    (set, getState) => ({
      ...initialState,
      setVoterId(voterId) {
        set({voterId})
      },
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
    },
  ),
)
