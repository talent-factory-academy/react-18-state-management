import React from 'react';
import { proxy, useSnapshot } from 'valtio'
import { derive } from 'valtio/utils';

interface AppState {
  count: number;
}

// Valtio State
const state = proxy<AppState>({
  count: 0,
})

// Action to update State
export const inc = () => ++state.count;

// Derived State
const derivedState = derive({
  tripled: (get) => get(state).count * 3,
})


export default function ValtioDemo1() {
  console.log('App: render')
  return (
    <div className="container">
      <Dashboard />
    </div>
  );
}


const Dashboard = () => {
  console.log(' Dashboard: render')
  return <div className="comp">
    <h1>Demo A: Valtio</h1>
    <Panel1 />
    <Panel2 />
  </div>
}

function Panel1() {
  console.log('  Panel1: render', derivedState.tripled, derivedState, state)
  const snap = useSnapshot(state)

  return <div className="comp">
    <div>Panel1 - Count: {snap.count}</div>
    <div>Panel1 - Derived (triple): {derivedState.tripled}</div>
  </div>
}

const Panel2 = () => {
  console.log('  Panel 2: render')
  return <div className="comp">
    Panel 2
    <button onClick={inc}>+</button>
  </div>
}
