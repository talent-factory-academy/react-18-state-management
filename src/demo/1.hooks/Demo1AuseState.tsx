import React, { useCallback, useState } from 'react';

/**
 * State management with useState and drilling props
 * BAD: Children components are always updated when state changes because of drilling props
 * FIX: we memoize components with React.memo
 */


/**
 * Main Smart Component
 * BAD: always rendered when state changes
 */
export default function Demo1AuseState() {
  console.log('App: render')
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);

  // useCallback needed to avoid useless renders
  const inc = useCallback(() => {
    setValue1(value1 + 1)
  }, [value1]);

  return (
    <div className="comp">
      <h1>Demo: useState</h1>
      <button onClick={inc}>Update Value 1</button>
      <button onClick={() => setValue2(Math.random())}>Update Value 2</button>
      <Dashboard value1={value1} value2={value2} increment={inc} />
    </div>
  );
}

interface DashboardProps {
  value1: number;
  value2: number;
  increment: () => void
}

const Dashboard = React.memo((props: DashboardProps) => {
  console.log(' Dashboard: render')
  return <div className="comp">
    Dashboard
    <Panel1 value={props.value1} />
    <Panel2 value={props.value2}/>
    <Panel3 increment={props.increment} />
  </div>
})

const Panel1 = React.memo((props: { value: number }) => {
  console.log('  Panel1: render')
  return <div className="comp">
    Panel1: {props.value}
  </div>
})

const Panel2 = React.memo((props: { value: number }) => {
  console.log('  Panel2: render')
  return <div className="comp">
    Panel2: {props.value}
  </div>
})

const Panel3 = React.memo((props: { increment: () => void }) => {
  console.log('  Panel3: render')
  return <div className="comp">
    <button onClick={props.increment}>Update Value 1</button>
  </div>
})


