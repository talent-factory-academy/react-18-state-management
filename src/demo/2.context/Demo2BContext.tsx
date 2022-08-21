import React, { memo, useContext, useState } from 'react';

/**
 * Nested context example
 * UPDATE FROM PREVIOUS EXAMPLE: we use 2 different contexts instead one and they are nested
 * BAD: children components that use inner context are re-rendered
 * when the outer context is updated even if it's not necessary
 */

interface Data {
  value: number | null,
}


const Data1Context = React.createContext<Data>({ value: null });
const Data2Context = React.createContext<Data>({ value: null });


/**
 * Main Smart Component
 * BAD: always rendered when Context changes since it updates a local state
 */
export default function Demo2BContext() {
  console.log('App: render')
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);

  return (
    <Data1Context.Provider value={{ value: value1 }}>
      <Data2Context.Provider value={{ value: value2 }}>
        <h1>Demo B: Context</h1>
        <button onClick={() => setValue1(s => s + 1)}>Update Value 1</button>
        <button onClick={() => setValue2(Math.random())}>Update Value 2</button>
        <Dashboard  />
      </Data2Context.Provider>
    </Data1Context.Provider>
  );
}

// Middle Component
// Never re-rendered because of memoization
const Dashboard = React.memo(() => {
  console.log(' dashboard: render')
  return <div className="comp">
    <Panel1 />
    <Panel2 />
    <Panel3 />
  </div>
})

// This is re-rendered even when value2 is updated
// (memo does not fix it so it's not necessary)
const Panel1 = React.memo(() => {
  const state = useContext(Data1Context);

  console.log('  Panel1: render')
  return <div className="comp">Panel1: {state.value}</div>
})


// This is re-rendered even when value1 is updated
// (memo does not fix it so it's not necessary)
const Panel2 = React.memo(() => {
  const state = useContext(Data2Context);

  console.log('  Panel2: render')
  return <div className="comp">Panel2: {state.value}</div>
})


// ✅: This is never renderer since it uses memo and don't use Context
const Panel3 = React.memo(() => {

  console.log('  Panel3: render')
  return <div className="comp">Panel3</div>
})
