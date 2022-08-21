import React, { useContext, useState } from 'react';
import { atom, RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Atoms
export const counterState = atom<number>({
  key: 'counterState',
  default: 1,
});

export const randomState = atom<number>({
  key: 'randomState',
  default: 0,
});


/**
 * Root Component
 * Your app must be wrapper by RecoilRoot component
 */
export default function Demo3Recoil() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

/**
 * Main Smart Component
 * It's renderer when count is updated because of useRecoilState
 * It's not rendered when random changes because of useSetRecoilState
 */
export  function App() {
  console.log('App: render')
  const [count, setCount] = useRecoilState(counterState);
  const setRandom = useSetRecoilState(randomState);

  return (
    <div className="comp">
      <h1>Demo Recoil</h1>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>

      <button onClick={() => setRandom(Math.random())}>Update random</button>
      <Dashboard  />
    </div>
  );
}

// Middle Component
// NOTE: not rendered when Atoms are updates since it's not registered to any of them
const Dashboard = React.memo(() => {
  console.log('Dashboard')
  return <div className="comp">
    Dashboard
    <CounterPanel />
    <RandomPanel />
  </div>
})

// Child Component
// NOTE: rendered only when counterState atom is updated
function CounterPanel () {
  console.log('CounterPanel: render')
  const [count, setCount] = useRecoilState(counterState);
  return <div className="comp">
    CounterPanel: {count}
  </div>
}


// Child Component
// NOTE: rendered only when randomState atom is updated
function RandomPanel () {
  console.log('RandomPanel: render')
  const random = useRecoilValue(randomState);
  return <div className="comp">
    RandomPanel: {random}
  </div>
}
