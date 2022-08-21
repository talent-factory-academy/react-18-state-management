import React, { Suspense } from 'react';
import { proxy, subscribe, useSnapshot } from 'valtio'
import { derive, proxyWithHistory, subscribeKey } from 'valtio/utils';

// proxy With History (redo, undo, history)

interface AppState {
  count: number;
}

const state = proxyWithHistory<AppState>({
  count: 1,
})

export const inc = () => {
  ++state.value.count;
}

export default function ValtioDemo3() {
  return (
    <div className="container">
      <h1>Demo C: History (undo / redo)</h1>
      <UsersPanel />
    </div>
  );
}


function UsersPanel() {
  const snap = useSnapshot(state)
  console.log(state.history);
  return <Suspense  fallback={<div>loading...</div>}>
    <div className="comp">
      <h1>Count: {snap.value.count}</h1>
      <button onClick={inc}>+ </button>
      <button onClick={state.undo}>undo</button>
      <button onClick={state.redo}>redo</button>
    </div>
  </Suspense>
}
