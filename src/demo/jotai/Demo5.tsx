import React  from 'react';
import { atom, PrimitiveAtom, useAtom } from 'jotai'
import { splitAtom } from 'jotai/utils';

type People = {
  name: string;
  completed: boolean;
}

const people: People[] = [
  { name: 'Luke Skywalker', completed: true },
  { name: 'C-3PO', completed: false },
];

const peopleAtom = atom<People[]>(people);
const peopleAtomsAtom = splitAtom(peopleAtom)

export default function JotaiDemo5 () {
  const [people, setPeople] = useAtom(peopleAtom);
  const [peopleAtoms] = useAtom(peopleAtomsAtom)

  return <div className="comp">
    <h1>JOTAI: splitAtom</h1>

    <h3>Simple List (readable)</h3>
    {
      people.map((p, index) =>
        <li key={index}>{p.name} ({JSON.stringify(p.completed)})</li>)
    }

    <br/>
    <br/>

    <h3>Split Atom List (writable)</h3>
    {
      peopleAtoms.map((personAtom, index) =>
        <ItemList key={index} atom={personAtom} />
      )
    }
    {people.length > 0 &&  <button onClick={() => setPeople([])}>Clear</button>}
  </div>
}

interface ItemListProps {
  atom: PrimitiveAtom<People>
}
export const ItemList: React.FC<ItemListProps> = (props) => {
  const [item, setItem] = useAtom(props.atom);
  return (
    <div>
      <input type="checkbox" checked={item.completed} onChange={e => setItem(s => ({ ...s, completed: e.target.checked}))}/>
      {item.name}
      <button onClick={() => setItem(s => ({...s, name: 'user ' + Math.random() }))}>
        set random name
      </button>
    </div>
  )
};
