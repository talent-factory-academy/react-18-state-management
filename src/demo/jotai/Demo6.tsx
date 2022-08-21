import React from 'react';
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils';

// params: storage key && initial state
const themeAtom = atomWithStorage<'dark' | 'light'>('theme', 'light');

export default function JotaiDemo6() {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <div>
      <h1>JOTAI: atomWithStorage</h1>
      <h4>{theme}</h4>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle Theme</button>
    </div>
  );
}
