import React from 'react';
import { Navigate } from 'react-router-dom';
import Demo1AuseState from './demo/1.hooks/Demo1AuseState';
import Demo2useStateComposition from './demo/1.hooks/Demo2useStateComposition';
import Demo3useReducer from './demo/1.hooks/Demo3useReducer';
import Demo2AContext from './demo/2.context/Demo2AContext';
import Demo2BContext from './demo/2.context/Demo2BContext';
import Demo2CContext from './demo/2.context/Demo2CContext';
import Demo2DContext from './demo/2.context/Demo2DContext';
import Demo2EContextUseReducer from './demo/2.context/Demo2EContextUseReducer';
import JotaiDemo1 from './demo/jotai/Demo1';
import JotaiDemo2 from './demo/jotai/Demo2';
import JotaiDemo3async from './demo/jotai/Demo3async';
import JotaiDemo4 from './demo/jotai/Demo4';
import JotaiDemo5 from './demo/jotai/Demo5';
import JotaiDemo6 from './demo/jotai/Demo6';
// import JotaiDemo7 from './demo/jotai/Demo7';
// import JotaiDemoAll from './demo/jotai/DemoAll';
import ValtioDemo1 from './demo/valtio/Demo1';
import ValtioDemo2 from './demo/valtio/Demo2';
import ValtioDemo3 from './demo/valtio/Demo3';
import ZustandDemo1 from './demo/zustand/Demo1';
import ZustandDemo2Crud from './demo/zustand/Demo2-crud';
import ZustandDemo3 from './demo/zustand/Demo3';
import ZustandDemo4 from './demo/zustand/Demo4';
import ZustandDemo5 from './demo/zustand/Demo5';

export const routesConfiguration =  [
  { path: "/useState", element: <Demo1AuseState/>, label: 'Use State' },
  { path: "/composition", element: <Demo2useStateComposition />, label: 'Use Composition' },
  { path: "/useReducer", element: <Demo3useReducer />, label: 'Use Reducer' },
  { path: "/context1", element: <Demo2AContext />, label: 'Context A: Hello World' },
  { path: "/context2", element: <Demo2BContext />, label: 'Context B: Multiple nested context' },
  { path: "/context3", element: <Demo2CContext />, label: 'Context C: Multiple sibling context' },
  { path: "/context4", element: <Demo2DContext />, label: 'Context D: Update Context from childrenn' },
  { path: "/context5", element: <Demo2EContextUseReducer />, label: 'Context E with useReducer' },
  { path: "/zustand1-simple", element: <ZustandDemo1 />, label: 'Zustand: Demo A: Simple' },
  { path: "/zustand2-crud", element: <ZustandDemo2Crud />, label: 'Zustand: Demo B: Crud' },
  { path: "/zustand3", element: <ZustandDemo3 />, label: 'Zustand: Demo C: async derived states' },
  { path: "/zustand4", element: <ZustandDemo4 />, label: 'Zustand: Demo D: subscribeWithSelector' },
  { path: "/zustand5", element: <ZustandDemo5 />, label: 'Zustand: Demo E: combine store slices' },
  { path: "/valtio1", element: <ValtioDemo1 />, label: 'Valtio: Demo A: Hello World' },
  { path: "/valtio2", element: <ValtioDemo2 />, label: 'Valtio: Demo B: Async & Suspense' },
  { path: "/valtio3", element: <ValtioDemo3 />, label: 'Valtio: Demo C: History / Undo / Redo' },
  { path: "/jotai1", element: <JotaiDemo1 />, label: 'Jotai 1: Hello Atoms' },
  { path: "/jotai2", element: <JotaiDemo2 />, label: 'Jotai 2: Derived Atoms' },
  { path: "/jotai3", element: <JotaiDemo3async />, label: 'Jotai 3: async atoms and derived atoms' },
  { path: "/jotai4", element: <JotaiDemo4 />, label: 'Jotai 4: atomWithHash -> Router Params' },
  { path: "/jotai5", element: <JotaiDemo6 />, label: 'Jotai 5:  atomWithStorage' },
  { path: "/jotai6", element: <JotaiDemo5 />, label: 'Jotai 6: splitAtom' },
  /*{ path: "/jotai7", element: <JotaiDemo7 />, label: 'Jotai 7' },*/
  /*{ path: "/jotai8", element: <JotaiDemoAll />, label: 'Jotai 8' },*/
  { index: true, element: <Navigate to={'/useState'} /> }
]
