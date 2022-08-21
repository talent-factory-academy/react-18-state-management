import React from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { routesConfiguration } from './routerConfiguration';

function App() {
  const navigate = useNavigate();
  const router = useRoutes(routesConfiguration);
  const location = useLocation();

  function changeRoute(e: React.ChangeEvent<HTMLSelectElement>) {
    navigate(e.target.value)
  }

  return (
    <>
      <div className="mx-auto container">
        <div className="my-3 text-center">
          Select the demo:
          <select
            className="form-control w-50 mx-auto"
            onChange={changeRoute}
            value={location.pathname}
          >
            {
              routesConfiguration.map(item => {
                return item.label ?
                  <option key={item.path} value={item.path}>{item.label}</option> :
                  null
              })
            }
          </select>
        </div>
      </div>

      <div>{router}</div>
    </>
  )
}

export default App;



