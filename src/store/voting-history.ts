/**
 * State responsible to keep evidence of what designs has the currently
 * anonymous user voted
 */
import create from 'zustand'
import {persist} from 'zustand/middleware'
import memoize from 'lodash.memoize'

type DesignId = string
type VoteSubmitted = boolean

export type VoteHistoryState = {
  voterName?: string
  /**
   * Evidence of what designs the current user voted on */
  votes: Record<DesignId, VoteSubmitted>
  clearState: () => void
  setVotedDesign: (designId: DesignId) => void
  setVoterName: (name: string) => void
}

type InitialDataState = {
  voterName?: string
  votes: Record<DesignId, VoteSubmitted>
}

const initialState: InitialDataState = {
  votes: {},
}

export const hasVotedOnDesign = memoize(
  (designId: string) => (state: VoteHistoryState) =>
    state.votes[designId] ?? false,
)

export const useVoteHistoryState = create<VoteHistoryState>(
  persist(
    (set, getState) => ({
      ...initialState,
      setVoterName(voterName: string) {
        set({voterName})
      },
      setVotedDesign(designId) {
        const votes = getState().votes
        set({votes: {...votes, [designId]: true}})
      },
      clearState() {
        set({...initialState})
        window.localStorage.removeItem('vote-design')
      },
    }),
    {
      name: 'vote-history', // persist store to local storage
    },
  ),
)
