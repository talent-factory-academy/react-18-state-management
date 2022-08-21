import React, { Suspense } from 'react';
import { proxy, subscribe, useSnapshot } from 'valtio'
import { derive, subscribeKey } from 'valtio/utils';

// async & suspense with state & async derived state

interface AppState {
  count: number;
  users: Promise<any[]>;
}

const state = proxy<AppState>({
  count: 1,
  users: fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
})

export const inc = () => {
  if (state.count < 10) {
    ++state.count;
  } else {
    state.count = 1;
  }
}

const derivedState = derive({
  user: get => {
    return fetch(`https://jsonplaceholder.typicode.com/users/${get(state).count}`)
      .then(res => res.json())
      .then(res => res)
  },
})


// MANUAL SUBSCRIPTION
// try it removing comments
subscribe(state, () => console.log('state has changed to', state.count)) // output: proxy
// subscribeKey(derivedState, 'user', async (value) => console.log('state.count has changed to', await value, await derivedState.user));
// subscribeKey(derivedState, 'user', async (value) => console.log('state.count has changed to', await value, derivedState.user));



export default function ValtioDemo2() {
  return (
    <div className="container">
      <h1>Demo B: valtio async / Suspense</h1>
      <Suspense fallback={<div>loading...</div>}>
        <UsersPanel />
        <button onClick={inc}>Next User</button>
        <UserPanel />
      </Suspense>
    </div>
  );
}


function UsersPanel() {
  const snap = useSnapshot(state)

  return(
      <div className="comp">
        <h1>Users Panel</h1>
        {
          snap.users.map(u => (
            <li key={u.id}>{u.name}</li>
          ))
        }
      </div>
  )
}


function UserPanel() {
  const snap = useSnapshot(derivedState)

  return(
      <div className="comp">
        <h1>Users Panel {state.count}</h1>
        <pre>{JSON.stringify(snap.user, null, 2)}</pre>
      </div>
  )
}

