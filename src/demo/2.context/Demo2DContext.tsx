import React, { memo, useCallback, useContext, useState } from 'react';

/**
 * Use another Context to pass actions
 * All children that use any Context are always update
 */

interface Data {
  value: number | null,
}

interface Actions {
  update: () => void
}

const Data1Context = React.createContext<Data>({ value: null });
const Data2Context = React.createContext<Actions>({ update: () => null});

/**
 * Main Smart Component
 * BAD: always rendered when Context changes since it updates a local state
 */
export default function Demo2DContext() {
  console.log('App: render')
  const [value1, setValue1] = useState<number>(0);

  // useCallback is not necessary
  const inc = () => {
    setValue1(s => s + 1);
  }

  return (
    <Data1Context.Provider value={{ value: value1 }}>
      <Data2Context.Provider value={{ update: inc }}>
        <h1>Demo D: Context</h1>
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

const Panel1 = React.memo(() => {
  const state = useContext(Data1Context);
  console.log('  Panel1: render')
  return <div className="comp">Panel1: {state.value}</div>
})


// BAD: this is updated even when Data1Context value is updated
const Panel2 = React.memo(() => {
  const state = useContext(Data2Context);
  console.log('  Panel2: render')
  return <div className="comp">
    Panel2:
    <button onClick={state.update}>Update</button>
  </div>
})

// GOOD: not rendered when context is updated
const Panel3 = () => {
  console.log('  Panel3: render')
  return <div className="comp">Panel3</div>
}
