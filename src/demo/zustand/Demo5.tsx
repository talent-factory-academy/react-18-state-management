import React  from 'react';
import create from 'zustand';
import { createClientSlice, ClientsSlice } from './store/clients.store';
import { createUsersSlice, UsersSlice } from './store/users.store';


// combine Stores
export type AppState = ClientsSlice & UsersSlice;

const useStore = create<AppState>((...rest) => ({
  ...createClientSlice(...rest),
  ...createUsersSlice(...rest),
}));

export default function ZustandDemo5() {
  console.log('------\nApp: render')
  return (
    <div className="container">
      <h3>Demo5: combine store slices</h3>
      <Dashboard />
    </div>
  );
}


const Dashboard = () => {
  console.log('  ClientsPanel: render');
  return <div className="comp">
    Dashboard
    <ClientsPanel />
    <UsersPanel />
  </div>
}

function ClientsPanel () {
  console.log('  ClientsPanel: render');
  const clients = useStore(state => state.clients)
  const add = useStore(state => state.addClient)

  return <div className="comp">
    <div>Clients: {clients?.length}</div>
    <button onClick={() => add({id: 1, name: 'fake client'})}>+</button>
  </div>
}

const UsersPanel = () => {
  console.log('  UsersPanel: render');
  const users = useStore(state => state.users)
  const add = useStore(state => state.addUser)

  return <div className="comp">
    <div>Users: {users?.length}</div>
    <button onClick={() => add({id: 1, name: 'fake user'})}>+</button>
  </div>
}

export {}
