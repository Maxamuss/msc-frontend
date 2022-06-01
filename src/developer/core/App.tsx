import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SideBar from './SideBar';
import TopMenu from './TopMenu';
import ModelSchemaList from '../modelschemas/ModelSchemaList';
import ModelSchemaCreate from '../modelschemas/ModelSchemaCreate';
import ModelSchemaDetail from '../modelschemas/ModelSchemaDetail';
import FunctionList from '../functions/FunctionList';
import PackageList from '../packages/PackageList';
import ReleaseTree from '../releases/ReleaseTree';
import { ROUTES } from '../utils/routing';

function App() {
  return (
    <BrowserRouter>
      <SideBar />
      <div className='md:pl-64 flex flex-col flex-1'>
        <TopMenu />
        <main>
          <Routes>
            <Route path={ROUTES.modelschema.list} element={<ModelSchemaList />} />
            <Route path={ROUTES.modelschema.create} element={<ModelSchemaCreate />} />
            <Route path={ROUTES.modelschema.detail} element={<ModelSchemaDetail />} />
            <Route path={ROUTES.function.list} element={<FunctionList />} />
            <Route path={ROUTES.package.list} element={<PackageList />} />
            <Route path={ROUTES.release.tree} element={<ReleaseTree />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;
