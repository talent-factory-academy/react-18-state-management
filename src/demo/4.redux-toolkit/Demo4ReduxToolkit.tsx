import React from 'react';
import { combineReducers, configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Actions
export const increment = createAction<number>('INCREMENT')
export const decrement = createAction<number>('DECREMENT');
export const setRandom = createAction<void>('RANDOM_STRING');

// counter reducer
export const counterReducer = createReducer(0, {
  [increment.type]: (state, action) => state + action.payload,
  [decrement.type]: (state, action) => state - action.payload,
});

// random reducer
export const randomReducer = createReducer(0, {
  [setRandom.type]: (state, action) => Math.random(),
});

// Store reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  random: randomReducer
});

// Redux Store
export const store = configureStore({
  reducer: rootReducer,
});

// Store type
export type RootState = ReturnType<typeof rootReducer>


export default function Demo4ReduxToolkit() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

/**
 * Main Smart Component
 * It's renderer only first time since it's not using the store
 */
export  function App() {
  console.log('App: render')
  const dispatch = useDispatch();

  return (
    <div className="comp">
      <h1>Demo Redux</h1>

      <button onClick={() => dispatch(decrement(10))}>-</button>
      <button onClick={() => dispatch(increment(10))}>+</button>

      <button onClick={() => dispatch(setRandom())}>Random</button>
      <Dashboard  />
    </div>
  );
}

// Middle Component
// It's renderer only first time, since it's not using the store as well

const Dashboard = (() => {
  console.log('dashboard: render')

  return <div className="comp">
    Dashboard
    <CounterPanel />
    <RandomPanel />
  </div>
})

// Child Component
// NOTE: rendered only when counter is updated
function CounterPanel () {
  console.log('CounterPanel: render')
  const counterValue = useSelector((state: RootState) => state.counter);

  return <div className="comp">
    CountPanel: {counterValue}
  </div>
}

// Child Component
// NOTE: rendered only when random is updated
function RandomPanel () {
  console.log('RandomPanel: render')
  const randomValue = useSelector((state: RootState) => state.random);

  return <div className="comp">
    RandomPanel: {randomValue}
  </div>
}


