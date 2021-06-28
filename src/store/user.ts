import create from 'zustand'
import {persist} from 'zustand/middleware'
import {User} from 'types'

export type UserState = {
  user?: User
  setUser: (user: User) => void
  clearState: () => void
}

type InitialDataState = {user?: User}

const initialState: InitialDataState = {user: undefined}

export const useUser = create<UserState>(
  persist(
    set => ({
      ...initialState,
      setUser: (user: User) => set({user}),
      clearState: () => {
        set({...initialState})
        window.localStorage.removeItem('user')
      },
    }),
    {
      name: 'user', // persist store to local storage
    },
  ),
)
