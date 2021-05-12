import create from 'zustand'
import {persist} from 'zustand/middleware'
import memoize from 'lodash.memoize'

type DesignId = string
type VersionId = string | undefined

export type VoteDesignState = {
  voterName?: string
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

  /**
   * Record to keep evidence of comments on design
   * versions
   */
  comments: Record<string, string | undefined>

  setVoterName: (voterName: string) => void
  setRating: (versionId: string, rating: number | undefined) => void
  setChosen: (designId: DesignId, versionId: VersionId) => void
  setComment: (versionId: string, comment: string) => void
  clearState: () => void
}

type InitialDataState = {
  voterName?: string
  currentRatings: Record<string, number>
  currentChosen: Record<DesignId, VersionId>
  comments: Record<string, string | undefined>
}

const initialState: InitialDataState = {
  currentRatings: {},
  currentChosen: {},
  comments: {},
}

export const getRating = memoize(
  (versionId: string) => (state: VoteDesignState) =>
    state.currentRatings[versionId],
)

export const getComment = memoize(
  (versionId: string) => (state: VoteDesignState) => state.comments[versionId],
)

export const getChosen = memoize(
  (designId: string) => (state: VoteDesignState) =>
    state.currentChosen[designId],
)

export const canSubmit = (state: VoteDesignState) => {
  const {comments, currentRatings} = state

  const hasComments = Object.values(comments).filter(com => !!com).length > 0
  const hasRatings = Object.values(currentRatings).filter(r => !!r).length > 0

  return hasRatings || hasComments
}

export const useVoteDesignState = create<VoteDesignState>(
  persist(
    (set, getState) => ({
      ...initialState,
      setVoterName(voterName) {
        set({voterName})
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
      setComment(versionId, comment) {
        const oldOpinions = getState().comments
        set({
          comments: {
            ...oldOpinions,
            [versionId]: comment,
          },
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
