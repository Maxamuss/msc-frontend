import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoadingSpinner from '../../developer/components/LoadingSpinner';
import { getLayoutData } from '../utils/api';

import SideBar from './SideBar';
import TopMenu from './TopMenu';

export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [applicationConfig, setApplicationConfig] = useState({});

  const useCache = true;

  useEffect(() => {
    getLayoutData({
      path: '/layout/__application__/',
      setResults: setApplicationConfig,
      setIsLoaded: setIsLoaded,
      setError: setError,
      wait: 0,
      useCache: useCache,
    });
  }, []);

  if (error) {
    return <div>error</div>;
  } else if (!isLoaded) {
    return <LoadingSpinner />
  } else {
    return (
      <BrowserRouter>
        <SideBar applicationConfig={applicationConfig} />
        <div className='md:pl-64 flex flex-col flex-1'>
          <TopMenu />
          <main>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}