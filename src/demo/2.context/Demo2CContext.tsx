import React, { useContext, useState } from 'react';

/**
 * Each context handle a part of an application
 * PRO: no unnecessary re-renders.
 * PRO: Children are updated only when its own context is updated
 */

interface Data {
  value: number | null,
}

const Data1Context = React.createContext<Data>({ value: null });
const Data2Context = React.createContext<Data>({ value: null });

export default function Demo2CContext() {
  return (
      <div>
        <h1>Demo C: Context</h1>
        <Dashboard  />
      </div>
  );
}

////////////////////////////////////////////////////////////////
const Dashboard = React.memo(() => {
  console.log(' Dashboard: render')
  return <div className="comp">
    Dashboard
    <Panel1Container />
    <Panel2Container />
  </div>
})

////////////////////////////////////////////////////////////////
function Panel1Container () {
  const [value, setValue] = useState<number>(0);

  console.log('  Panel1 Container: render')
  return  (
    <div className="compContainer">
      <div>Panel1 Container</div>
      <Data1Context.Provider value={{ value }}>
        <button onClick={() => setValue(s => s + 1)}>+</button>
        <Panel1 />
      </Data1Context.Provider>
    </div>
  )
}

function Panel1() {
  console.log('   Panel1: render')

  const count = useContext(Data1Context);
  return (<div className="comp">
    counter: {count.value} <br/>
  </div>)
}

////////////////////////////////////////////////////////////////
function Panel2Container () {
  console.log('  Panel2 Container: render')
  const [value, setValue] = useState<number>(0);

  return(
    <div className="compContainer">
      <div>Panel2 Container</div>
      <Data2Context.Provider value={{ value }}>
        <button onClick={() => setValue(s => s + 1)}>+</button>
        <Panel2 />
      </Data2Context.Provider>
    </div>
  )
}

function Panel2() {
  console.log('   Panel2: render')
  const state = useContext(Data2Context);
  return (<div className="comp">
    Random Value: {state.value} <br/>
  </div>)
}
