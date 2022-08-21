import React from 'react';
import { useAtom } from 'jotai'
import { atomWithHash } from 'jotai/utils';

const searchParams = atomWithHash('search', 1)

export default function JotaiDemo4() {
  const [search, setSearchParams] = useAtom(searchParams);
  console.log('------\nApp: render')

  return (
    <>
      <div>Search Params: {search}</div>
      <button onClick={() => setSearchParams(Math.random())}>Update Search</button>
    </>
  );
}
