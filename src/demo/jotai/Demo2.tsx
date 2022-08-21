import React from 'react';
import { atom, useAtom } from 'jotai'

const costAtom = atom<number>(100);
const qtyAtom = atom<number>(3)
const totalAtom = atom<number>((get) => get(costAtom) * get(qtyAtom))

export default function JotaiDemo2() {
  console.log('App: render')
  return (
    <div className="container">
      <h3>Demo Hooks: Jotai derived atoms</h3>
      <Dashboard />
    </div>
  );
}

const Dashboard = () => {
  console.log('DashBoard: render')

  return <div>
    Dashboard
    <ButtonsComponent />
    <TotalComponent />
  </div>
}

const ButtonsComponent = () => {
  const [qty, setQty] = useAtom(qtyAtom)
  const [cost, setCost] = useAtom(costAtom)

  return <div className="comp">
    <button onClick={() => setQty(qty + 1)}>Increase Qty: {qty}</button>
    <button onClick={() => setCost(cost * 2)}>Increase Cost: € {cost}</button>
  </div>
}

const TotalComponent = () => {
  console.log('  TotalPanel: render')
  const [total] = useAtom(totalAtom)
  return <div className="comp">TotalPanel: € {total}</div>
}

