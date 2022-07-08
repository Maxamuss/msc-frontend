import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import SideBar from './SideBar';
import TopMenu from './TopMenu';
import LoadingSpinner from '../../developer/components/LoadingSpinner';
import { getLayoutData } from '../utils/api';
import { IApplicationConfig, IModel } from './models/types';
import { setApplication } from '../store/applicationSlice';
import Model from './models/model';
import Page from './Page';

export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [applicationConfig, setApplicationConfig] = useState<IApplicationConfig | undefined>(undefined);

  const dispatch = useDispatch();

  const useCache = true;

  useEffect(() => {
    getLayoutData({
      path: '/layout/',
      setResults: setApplicationConfig,
      setIsLoaded: () => { },
      setError: setError,
      wait: 0,
      useCache: useCache,
    });
  }, []);

  useEffect(() => {
    if (applicationConfig) {
      let applicationDefinition: any = {};
      let models: any = [];

      applicationConfig.models.map((model: IModel) => {
        models.push(new Model(model));
      })

      applicationDefinition['models'] = models;

      dispatch(setApplication(applicationDefinition));
      setIsLoaded(true);
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
            <Routes>
              <Route path="/*" element={<Page />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}