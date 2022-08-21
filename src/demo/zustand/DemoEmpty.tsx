import React from 'react';
import create from 'zustand';

type AppState = {
  counter: number;
  theme: 'light' | 'dark';
  users: any[];
}

const useStore = create<AppState>(() => ({
  counter: 1,
  theme: 'light',
  users: [],
}))

export default function Demo1() {
  console.log('------\nApp: render')
  const users = useStore(state => state.users);

  return (
    <div className="container">
      <h3>Demo1: Zustand</h3>
      <button>-</button>
      <button>+</button>
      <button>Theme</button>
      <Dashboard />
    </div>
  );
}


const Dashboard: React.FC = props => {
  console.log('  CounterPanel: render');
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

const UsersPanel: React.FC = () => {
  console.log('  Theme Panel: render')
  return <div className="comp">
    Users Panel
  </div>
}
