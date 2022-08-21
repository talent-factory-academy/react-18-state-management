import React, { Suspense } from 'react';
import { atom, PrimitiveAtom, useAtom } from 'jotai'
import { atomWithHash, atomWithStorage, splitAtom } from 'jotai/utils';

type People = {
  name: string;
  completed: boolean;
}

const initialData = {
  people: [
    {
      name: 'Luke Skywalker',
      completed: true
    },
    {
      name: 'C-3PO',
      completed: false
    },
  ],
  films: [
    {
      title: 'A New Hope',
      planets: ['Tatooine', 'Alderaan'],
    },
    {
      title: 'The Empire Strikes Back',
      planets: ['Hoth'],
    },
  ],
  info: {
    tags: ['People', 'Films', 'Planets', 'Titles'],
  },
}
const peopleAtom = atom<People[]>(initialData.people);
const peopleAtomsAtom = splitAtom(peopleAtom)
const darkModeAtom = atomWithStorage<boolean>('darkMode', false)
const paramsAtom = atomWithHash('search', 1)

export default function JotaiDemoAll() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  const [params, setParams] = useAtom(paramsAtom);

  return (
    <Suspense  fallback={<div>loading...</div>}>
      <h3>Jotai {JSON.stringify(darkMode)} - {params}</h3>
      <button onClick={() => setDarkMode(true)}>Dark Mode</button>
      <button onClick={() => setParams(Math.random())}>Set params</button>
      <Dashboard/>
    </Suspense>
  );
}

const Dashboard: React.FC = props => {
  const [peopleAtoms] = useAtom(peopleAtomsAtom)
  const [people, setPeople] = useAtom<People[]>(peopleAtom);

  return <div className="comp">
    Dashboard
    {
      peopleAtoms.map((personAtom, index) => {
        return <ItemList key={index} atom={personAtom} />
      })
    }

    {
      people.map((p, index) => <li key={index}>{p.name} {JSON.stringify(p.completed)}</li>)
    }

  </div>
}

interface ItemListProps {
  atom: PrimitiveAtom<People>
}
export const ItemList: React.FC<ItemListProps> = (props) => {
  const [item, setItem] = useAtom(props.atom);
  return (<div>
    <input type="checkbox" checked={item.completed} onChange={e => setItem(s => ({ ...s, completed: e.target.checked}))}/>
    {item.name} <button onClick={() => setItem(s => ({...s, name: 'pippo' }))}>change name</button>
  </div>)
};
