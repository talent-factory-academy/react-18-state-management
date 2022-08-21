import React, { useEffect } from 'react';
import create from 'zustand';
import axios from 'axios';

type User = {
  id: number;
  name: string;
}

type AppState = {
  users: User[];
  pending: boolean;
  loadUsers: () => void;
  deleteUser: (id: number) => void;
}

const useStore = create<AppState>((set, get) => ({
  users: [],
  pending: false,
  loadUsers: async () => {
    set({ pending: true })
    const res = await axios.get<User[]>(`https://jsonplaceholder.typicode.com/users`);
    set({ users: res.data, pending: false })
  },
  deleteUser: async (id) => {
    set({ pending: true })
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    set({ users: get().users.filter(u => u.id !== id), pending: false })
  },
}))

export default function ZustandDemo2Crud() {
  console.log('------\nApp: render')
  useEffect(() => {
    useStore.getState().loadUsers()
  }, []);

  return (
    <div className="container">
      <h3>Demo2 CRUD: Zustand</h3>
      <Dashboard />
    </div>
  );
}


const Dashboard = () => {
  console.log(' Dashboard: render');
  return <div className="comp">
    Dashboard
    <CounterPanel />
    <UsersPanel />
  </div>
}

function CounterPanel () {
  console.log('  CounterPanel: render');
  return <div className="comp">
    <div>Counter Panel</div>
  </div>
}

const UsersPanel = () => {
  console.log('  Users Panel: render')
  const pending = useStore(state => state.pending);
  const users = useStore(state => state.users);
  const deleteUser = useStore(state => state.deleteUser);

  return <div className="comp">
    {pending && <div>Loading...</div>}
    {
      users.map(u => {
        return <li key={u.id}>
          {u.name}
          <button onClick={() => deleteUser(u.id)}>Delete</button>
        </li>
      })
    }
  </div>
}
