import React, { useEffect } from 'react';
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware'

type AppState = {
  counter: number;
  inc: () => void,
}
const useStore = create(
  subscribeWithSelector<AppState>((set, get) => ({
    counter: 1,
    inc: () => set(s => ({ counter: s.counter + 10 })),
  }))
)

export default function ZustandDemo4() {
  console.log('------\nApp: render')
  return (
    <div className="container">
      <h3>Demo4: Zustand (subscribeWithSelector middleware)</h3>
      <Dashboard />
    </div>
  );
}


const Dashboard = () => {
  console.log('  CounterPanel: render');
  return <div className="comp">
    Dashboard
    <CounterPanel />
    <AnotherPanel />
  </div>
}

function CounterPanel () {
  console.log('  CounterPanel: render');
  const counter = useStore(state => state.counter)
  const inc = useStore(state => state.inc)

  return <div className="comp">
    <div>Counter Panel: {counter}</div>
    <button onClick={inc}>+</button>
  </div>
}

const AnotherPanel = () => {
  useEffect(() => {
    return useStore.subscribe(
      state => state.counter,
      (val) => console.log('counter is changed:', val)
    );
  }, [])

  return <div className="comp">Another Panel</div>
}
