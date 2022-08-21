import React, { PropsWithChildren, useCallback, useState } from 'react';

/**
 * State management with useState and drilling props
 * BAD: Children components are always updated when state changes because of drilling props
 * FIX: we memoize components with React.memo
 */


/**
 * Main Smart Component
 * BAD: always rendered when state changes
 */
export default function Demo2useStateComposition() {
  console.log('App: render')
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);

  const inc = useCallback(() => {
    setValue1(s => s + 1)
  }, [value1]);

  return (
    <div className="comp">
      <h1> useState & Composition</h1>
      <button onClick={inc}>Update Value 1</button>
      <button onClick={() => setValue2(Math.random())}>Update Value 2</button>
      <Dashboard value1={value1} value2={value2}>
        <Panel1 value={value1} />
        <Panel2 value={value2} />
        <Panel3 increment={inc} />
      </Dashboard>
    </div>
  );
}

// Middle Component
// BAD: always rendered when state changes since it receives them as props
interface DashboardProps {
  value1: number, value2: number
}

const Dashboard = React.memo((props: PropsWithChildren<DashboardProps>) =>  {
  console.log('Dashboard: render')
  return <div className="comp">
    Dashboard
    {props.children}
  </div>
})

// Child Component
// BAD: rendered even when Random is updated and it's not necessary
const Panel1 = React.memo((props: { value: number }) => {
  console.log('  Panel1: render')
  return <div className="comp">
    Panel1: {props.value}
  </div>
})

// Child Component
// BAD: rendered even when Count is updated and it's not necessary
// FIXED: use React.memo to memoize it
const Panel2 = React.memo((props: { value: number }) => {
  console.log('  Panel2: render')
  return <div className="comp">
    Panel2: {props.value}
  </div>
})


const Panel3 = React.memo((props: { increment: () => void }) => {
  console.log('  Panel3: render')
  return <div className="comp">
    <button onClick={props.increment}>Update Panel1</button>
  </div>
})
