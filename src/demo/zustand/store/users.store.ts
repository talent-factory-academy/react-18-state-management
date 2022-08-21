import { StateCreator } from 'zustand';

export type User = { id: number, name: string };

export type UsersSlice = {
  users: User[],
  addUser: (item: User) => void;
}

export const createUsersSlice: StateCreator<UsersSlice> =  (set, get) => ({
  users: [],
  addUser: (user: User) => set(() => {
    return {users: [...get().users, user]}
  })
})
