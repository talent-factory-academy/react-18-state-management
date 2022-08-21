import React, { Suspense } from 'react';
import { atom, useAtom } from 'jotai'

const API = 'https://jsonplaceholder.typicode.com/users/';

const urlAtom = atom(`${API}/1`);

// fetch without latency
const fetchUrlAtom = atom(
  async (get) => {
    return await fetch(get(urlAtom)).then(res => res.json())
  }
)

// fetch with latency
// this is automatically fetched when its dependencies (atoms) changes
const fetchUrlAtomWithLatency = atom(
  async (get) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(get(urlAtom))
      setTimeout(() => res(response.json()), 1500); // simulate latency
    })
  }
)

export default function JotaiDemo3async() {
  return (
    <>
      <h3>Demo Hooks: Jotai async, suspense & selectors</h3>
      <Buttons />
      <Suspense  fallback={<div>loading...</div>}>
        <UsersList />
      </Suspense>
    </>
  );
}



const Buttons = () => {
  const [, setUrl] = useAtom(urlAtom);
  return (
    <div className="comp">
      <button onClick={() => setUrl(`${API}/1`)}>User 1</button>
      <button onClick={() => setUrl(`${API}/2`)}>User 2</button>
      <button onClick={() => setUrl(`${API}/3`)}>User 3</button>
    </div>
  )
}

const UsersList = () => {
  const [json] = useAtom(fetchUrlAtomWithLatency)

  return  <pre className="comp">
    User: {JSON.stringify(json, null, 2)}
  </pre>
}
