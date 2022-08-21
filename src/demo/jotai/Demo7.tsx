import React from 'react';
import { atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils';

// THIS EXAMPLE DOES NOT WORK

/*const todosAtom = atom<{ id: number, name: string }[]>([
  { id: 1, name: 'pippo'}, { id: 2, name: 'pluto'},
]);

const todoFamily2 = atomFamily((id: number) => {
  return atom(
    (get) => get(todosAtom).find((t: any) => t.id === id),
    (get) => {
      console.log(id)
      get(todosAtom).find((t: any) => t.id === id)
    },
  )
}

)*/

type Todo = { id: number, name: string}
const todosAtom = atom<{ [key: string]: Todo }>({});

/*const todoFamily2 = atomFamily((id: number) => {
    return atom(
      (get) => get(todosAtom)[id],
      (get: any, set: any, arg: any) => {
        console.log('ciao')
        const prev = get(todosAtom)
        return { ...prev, [id]: { ...prev[id], ...arg } }
      },
    )
  }
)*/
const todoFamily2 = atomFamily(
  (id: number) => atom(
    (get) => get(todosAtom)[id],
    (get: any, set: any, arg: any) => {
      const prev = get(todosAtom)
      console.log('ciao1', prev)
      return { ...prev, [id]: { ...prev[id], ...arg } }
    }
  ),
)
/*
type Param = { id: string; title?: string };
const todoAtomFamily2 = atomFamily(
  (param: Param) => ({ title: param.title || "No title", completed: false }),
  null,
  (a: Param, b: Param) => a.id === b.id
);
*/


export default function JotaiDemo7() {
  const [todos] = useAtom(todosAtom)
  const [todo, setTodo] = useAtom(todoFamily2(1))

  return (
    <div>
      <h3>Jotai Demo 7: Atom Family</h3>
      <h4>{JSON.stringify(todo)}</h4>
      <button onClick={() => todoFamily2.remove(1)}>remove</button>
      <button onClick={() => setTodo(1)}>set</button>
      <button onClick={() => todoFamily2(2)}>ad</button>
      <hr/>
      {JSON.stringify(todos)}
    </div>
  );
}
