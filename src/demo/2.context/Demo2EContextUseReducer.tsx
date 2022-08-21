import React, {  useContext, useReducer } from 'react';

/**
 * State management with useReducer
 * BAD: Children components are always updated when context is updated
 */

interface AppState {
  value1: number;
  value2: number;
}


type AppActions = {
  type: 'updateValue1' | 'updateValue2';
  payload?: AppState;
}

function dataReducer(state: AppState, action: AppActions) {
  switch (action.type) {
    case 'updateValue1': return ({...state, value1: state.value1 + 1});
    case 'updateValue2': return ({...state, value2: Math.random()});
    // default: throw new Error(`Unhandled action: ${action.type}`)
    default: return state;
  }
}

type Action = { type: 'updateValue1' } | { type: 'updateValue2' }
type Dispatch = (action: Action) => void;

const DataContext = React.createContext<AppState | undefined>( undefined)
// const DispatchContext = React.createContext<Dispatch | undefined>(undefined)
const DispatchContext = React.createContext<Dispatch>(() => null);

/**
 * Main Smart Component
 * BAD: always rendered when state changes
 */

export default function Demo2EContextUseReducer() {
  console.log('App: render')
  const [state, dispatch] = useReducer(dataReducer, { value1: 1, value2: 0});

  return (
    <div className="comp">
      <DataContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
            <h1>Demo Hooks: Context & useReducer</h1>
            <Dashboard />
        </DispatchContext.Provider>
      </DataContext.Provider>
    </div>
  );
}

// Middle Component
// BAD: always rendered when state changes since it receives them as props
// FIXED: by memoization
const Dashboard: React.FC = React.memo(() => {
  console.log(' Dashboard: render')
  return <div className="comp">
    Dashboard
    <PanelButtons />
    <Panel1 />
    <Panel2 />
  </div>
})

// Child Component
// GOOD: not rendered when another component update context
function PanelButtons () {
  console.log('  PanelButtons: render')
  const dispatch = useContext(DispatchContext);
  // Needed because of TypeScript strict option, since context is not initialized
  if (!dispatch) { throw new Error('DispatchContext must be initialized and used within a DispatchContext Provider') }

  return <div className="comp">
    Panel Buttons <br/>
    <button onClick={() => dispatch({ type: 'updateValue1' })}> Update Value 1</button>
    <button onClick={() => dispatch({ type: 'updateValue2' })}> Update Value 2</button>
  </div>;
}

// Child Component: consume / read context
// Behavior: Always rendered when context change
function Panel1 () {
  console.log('  Panel1: render')
  const state = useContext(DataContext);
  const dispatch = useContext(DispatchContext);

  return <div className="comp">
    <div>Panel 1: Consume Data</div>
    <div>{state?.value1} - {state?.value2}</div>
    <button onClick={() => dispatch({ type: 'updateValue1'})}>Update Value 1</button>
  </div>
}

// Child Component: produce / dispatch
// BAD: always rendered when context changes since it receives them as props
// FIXED: by memoization
const Panel2 = React.memo(() => {
  console.log('  Panel2: render')
  const dispatch = useContext(DispatchContext);

  return <div className="comp">
    <div>Panel 2: Emit Action</div>
    <button onClick={() => dispatch({ type: 'updateValue1'})}>Update Value 2</button>  </div>
})


