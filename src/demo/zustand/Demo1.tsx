import clsx from 'clsx';
import React from 'react';
import create from 'zustand';

// simple demo with state & actions

type Theme = 'light' | 'dark';

type AppState = {
  theme: Theme;
  changeTheme: (theme: Theme) => void,
}

const useStore = create<AppState>((set) => ({
  theme: 'light',
  changeTheme: (theme: Theme) => set(s => ({ theme })),
}))

export default function ZustandDemo1() {
  console.log('------\nApp: render')

  return (
    <div className="container">
      <h3>Demo1: Zustand</h3>
      <Dashboard />
    </div>
  );
}


const Dashboard = () => {
  console.log(' Dashboard: render');
  return <div className="comp">
    Dashboard
    <NavBar />
    <ThemePanel />
  </div>
}

function NavBar () {
  console.log('  NavBar: render');
  const theme = useStore(state => state.theme)
  return <div
    className={clsx(
      'comp',
      {'bg-dark text-white': theme === 'dark'},
      {'bg-info': theme === 'light'},
    )}
  ><div>NavBar: {theme}</div></div>
}

const ThemePanel: React.FC = () => {
  console.log('  Theme Panel: render')
  const changeTheme = useStore(state => state.changeTheme)

  return <div className="comp">
    <button onClick={() => changeTheme('light')}>Light</button>
    <button onClick={() => changeTheme('dark')}>Dark</button>
  </div>
}
