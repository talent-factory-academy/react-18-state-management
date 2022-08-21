import clsx from 'clsx';
import React from 'react';
import { atom, useAtom } from 'jotai'

const themeAtom = atom<'dark' | 'light'>('dark');

export default function JotaiDemo1() {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <div className="container">
      <h3
        className={clsx(
          'p-4',
          { 'bg-dark text-white': theme === 'dark'},
          { 'bg-info': theme === 'light'},
        )}
      >Jotai Demo 1: Simple Atoms </h3>
      <h4>{theme}</h4>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle Theme</button>
    </div>
  );
}
