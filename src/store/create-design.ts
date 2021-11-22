import {CreateDesignStep, DesignType, VoteAccess, VoteStyle} from 'types'
import create from 'zustand'
import {persist} from 'zustand/middleware'

export type State = {
  step: CreateDesignStep
  name?: string
  description?: string
  question?: string
  type: DesignType
  isPublic: 'true' | 'false'
  voteStyle: VoteStyle
  voteAccess: VoteAccess
  shownPreviewTooltip: boolean
  setName: (name: string) => void
  setDescription: (name: string) => void
  setQuestion: (name: string) => void
  setType: (type: DesignType) => void
  setVoteStyle: (style: VoteStyle) => void
  setVoteAccess: (access: VoteAccess) => void
  setIsPublic: (isPublic: 'true' | 'false') => void
  setStep: (step: CreateDesignStep) => void
  setShownTooltip: (val: boolean) => void
  saveDesignInfo: (values: Values) => void
  clearState: () => void
}

interface Values {
  name: string
  question: string
  description: string
  type: DesignType
  isPublic: 'true' | 'false'
}

type InitialState = {
  step: CreateDesignStep
  name?: string
  description?: string
  question?: string
  isPublic: 'true' | 'false'
  type: DesignType

  voteStyle: VoteStyle
  voteAccess: VoteAccess
  shownPreviewTooltip: boolean
}

const initialState: InitialState = {
  step: CreateDesignStep.Create,
  type: DesignType.Web,
  voteStyle: VoteStyle.Choose,
  voteAccess: VoteAccess.Anonymous,
  question: undefined,
  isPublic: 'false',
  name: undefined,
  description: undefined,
  shownPreviewTooltip: false,
}

export const useCreateDesignStore = create<State>(
  persist(
    set => ({
      step: CreateDesignStep.Create,
      type: DesignType.Web,
      voteStyle: VoteStyle.Choose,
      voteAccess: VoteAccess.Anonymous,
      isPublic: 'false',
      shownPreviewTooltip: false,
      setName: (name: string) => set({name}),
      setDescription: (description: string) => set({description}),
      setQuestion: (question: string) => set({question}),
      setIsPublic: isPublic => set({isPublic}),
      setType: (type: DesignType) => set({type}),
      setVoteStyle: (voteStyle: VoteStyle) => set({voteStyle}),
      setVoteAccess: (voteAccess: VoteAccess) => set({voteAccess}),
      setStep: (step: CreateDesignStep) => set({step}),
      setShownTooltip: (val: boolean) => set({shownPreviewTooltip: val}),
      saveDesignInfo: (values: Values) => set(() => ({...values})),
      clearState: () => {
        set({...initialState})
        window.localStorage.removeItem('design-draft')
      },
    }),
    {
      name: 'design-draft', // persist store to local storage
    },
  ),
)
