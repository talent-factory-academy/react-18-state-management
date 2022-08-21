import React, { useEffect } from 'react';
import create from 'zustand';
import axios from 'axios';

// CRUD example
type User = {
  id: number;
  name: string;
}

type AppState = {
  activeId: number;
  user: User[];
  pending: boolean;
  inc: () => void,
  loadUser: () => void;
}

const useStore = create<AppState>((set, get) => ({
  activeId: 1,
  user: [],
  pending: false,
  inc: () => set(s => ({ activeId: s.activeId < 10 ? +s.activeId + 1 : 1})),
  loadUser: async () => {
    set({ pending: true })
    const res = await axios.get<User[]>(`https://jsonplaceholder.typicode.com/users/${get().activeId}`);
    set({ user: res.data, pending: false })
  },
}))

export default function ZustandDemo3() {
  console.log('------\nApp: render')
  const activeId = useStore(state => state.activeId)
  const inc = useStore(state => state.inc)

  useEffect(() => {
    useStore.getState().loadUser()
  }, [activeId]);

  return (
    <div className="container">
      <h3>Demo3: Zustand Derived Async State -- id: {activeId}</h3>
      <button onClick={inc}>Next User</button>
      <Dashboard />
    </div>
  );
}


const Dashboard: React.FC = () => {
  console.log('  CounterPanel: render');
  return <div className="comp">
    Dashboard
    <UserPanel />
  </div>
}


const UserPanel: React.FC = () => {
  console.log('  Users Panel: render')
  const user = useStore(state => state.user);
  const pending = useStore(state => state.pending);

  return <pre className="comp">
    {pending && <div>loading...</div> }
    Users Panel {JSON.stringify(user, null, 2)}
  </pre>
}
