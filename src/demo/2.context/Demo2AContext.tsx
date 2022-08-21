import React, { useContext, useState } from 'react';
/**
 * Context Usage
 * BAD: Children components are updated when the context value changes even if
 * they don't use that part of the state
 */

interface State {
  value1: number | null,
  value2: number | null
}

const AppContext = React.createContext<State>({ value1: null, value2: null });

/**
 * Main Smart Component
 * BAD: always rendered when Context changes since it updates a local state
 */
export default function Demo2AContext() {
  console.log('App: render')
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);

  return (
    <AppContext.Provider value={{ value1, value2 }}>
      <h1>Demo A: Context</h1>
      <button onClick={() => setValue1(s => s + 1)}>Update Value 1</button>
      <button onClick={() => setValue2(Math.random())}>Update Value 2</button>
      <Dashboard  />
    </AppContext.Provider>
  );
}

// Middle Component
// BAD: rendered always since its parent is updated
// FIX: Rendered only first time since it's memoized (React.memo)
const Dashboard = React.memo(() => {
  console.log('dashboard: render')
  return <div className="comp">
    Dashboard
    <Panel1 />
    <Panel2 />
  </div>
})

// Child Component
// BAD:  Updated when any value of Context change: value1 or value2
function Panel1 () {
  const state = useContext(AppContext);
  console.log('  Panel1: render')
  return <div className="comp">Panel1: {state.value1}</div>
}


// Child Component
// BAD:  Updated when any value of Context change: value1 or value2
const Panel2 = React.memo(() => {
  const state = useContext(AppContext);
  console.log('  Panel2: render')

  return <div className="comp">Panel2: {state.value2}</div>
})


