import create from 'zustand'
import {persist} from 'zustand/middleware'
import memoize from 'lodash.memoize'

type DesignId = string
type VersionId = string | undefined

export type VoteDesignState = {
  voterId?: string
  /**
   * A record with versionId as key and the
   * rating given as value
   */
  currentRatings: Record<string, number | undefined>

  /**
   * A record where the key is the id of the design
   * and the value is the version which has been chosen
   * by the voter
   */
  currentChosen: Record<DesignId, VersionId>

  setVoterId: (voterId: string) => void
  setRating: (versionId: string, rating: number) => void
  setChosen: (designId: DesignId, versionId: VersionId) => void
  clearState: () => void
}

type InitialDataState = {
  voterId?: string
  currentRatings: Record<string, number>
  currentChosen: Record<DesignId, VersionId>
}

const initialState: InitialDataState = {
  currentRatings: {},
  currentChosen: {},
}

export const getRating = memoize(
  (versionId: string) => (state: VoteDesignState) =>
    state.currentRatings[versionId],
)

export const getChosen = memoize(
  (designId: string) => (state: VoteDesignState) =>
    state.currentChosen[designId],
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
      setChosen(designId, versionId) {
        set({
          currentChosen: {...getState().currentChosen, [designId]: versionId},
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