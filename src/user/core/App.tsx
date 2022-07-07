import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import SideBar from './SideBar';
import TopMenu from './TopMenu';
import LoadingSpinner from '../../developer/components/LoadingSpinner';
import { getLayoutData } from '../utils/api';
import { IApplicationConfig } from './models/types';
import { setApplication } from '../store/applicationSlice';

export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [applicationConfig, setApplicationConfig] = useState<IApplicationConfig | undefined>(undefined);

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (applicationConfig) {
      dispatch(setApplication(applicationConfig))
    }
  }, [applicationConfig]);

  if (error) {
    return <div>error</div>;
  } else if (!isLoaded) {
    return <LoadingSpinner />
  } else {
    return (
      <BrowserRouter>
        <SideBar />
        <div className='md:pl-64 flex flex-col flex-1'>
          <TopMenu />
          <main>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}