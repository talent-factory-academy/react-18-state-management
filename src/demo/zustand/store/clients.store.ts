import { StateCreator } from 'zustand'

export type Client = { id: number, name: string };

export type ClientsSlice = {
  clients: Client[];
  addClient: (item: Client) => void;
}

export const createClientSlice: StateCreator<ClientsSlice> = (set, get) => ({
  clients: [],
  addClient: (client: Client) => set(() => {
    console.log(set)
    return {clients: [...get().clients, client]}
  })
})
