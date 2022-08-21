import React, { useReducer } from 'react';

/**
 * State management with useReducer
 */
interface AppState {
  value1: number;
  value2: number;
}

type AppActions = {
  type: 'updateValue1' | 'updateValue2';
  payload?: AppState;
}

function appReducer(state: AppState, action: AppActions) {
  switch (action.type) {
    case 'updateValue1': return ({...state, value1: state.value1 + 1});
    case 'updateValue2': return ({...state, value2: Math.random()});
    default: throw new Error(`Unhandled action: ${action.type}`)
  }
}

export default function Demo3useReducer() {
  console.log('App: render')
  const [state, dispatch] = useReducer(appReducer, { value1: 1, value2: 0});

  return (
    <div className="comp">
      <h1>Demo: useReducer</h1>
      <button onClick={() => dispatch({ type: 'updateValue1' })}>Update Value 1</button>
      <button onClick={() => dispatch({ type: 'updateValue2' })}>Update Value 2</button>
      <Dashboard value1={state.value1} value2={state.value2} />
    </div>
  );
}

interface DashboardProps {
  value1: number, value2: number
}

const Dashboard: React.FC<DashboardProps> = React.memo(props => {
  console.log(' Dashboard: render')
  return <div className="comp">
    Dashboard
    <Panel1 value={props.value1} />
    <Panel2 value={props.value2} />
  </div>
})

const Panel1 = React.memo((props: { value: number }) => {
  console.log('  Panel1: render')
  return <div className="comp">
    Count: {props.value}
  </div>
})

const Panel2 = React.memo((props: { value: number }) => {
  console.log('  Panel 2: render')
  return <div className="comp">
    Random Value: {props.value}
  </div>
})


