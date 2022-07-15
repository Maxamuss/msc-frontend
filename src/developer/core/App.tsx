import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SideBar from './SideBar';
import TopMenu from './TopMenu';
import PageNotFound from '../../core/PageNotFound';

import ModelSchemaList from '../modelschemas/ModelSchemaList';
import ModelSchemaCreate from '../modelschemas/ModelSchemaCreate';
import ModelSchemaDetail from '../modelschemas/ModelSchemaDetail';
import ModelSchemaDelete from '../modelschemas/ModelSchemaDelete';

import FunctionList from '../functions/FunctionList';
import FunctionDetail from '../functions/FunctionDetail';
import FunctionCreate from '../functions/FunctionCreate';
import FunctionDelete from '../functions/FunctionDelete';

import GroupList from '../groups/GroupList';
import GroupCreate from '../groups/GroupCreate';
import GroupDetail from '../groups/GroupDetail';
import GroupDelete from '../groups/GroupDelete';

import PackageList from '../packages/PackageList';

import PageEditor from '../pages/PageEditor';

import ReleaseTree from '../releases/ReleaseTree';
import ReleaseChanges from '../releases/ReleaseChanges';

import UserList from '../users/UserList';
import UserCreate from '../users/UserCreate';
import UserDetail from '../users/UserDetail';
import UserDelete from '../users/UserDelete';

import WorkflowCreate from '../workflows/WorkflowCreate';
import WorkflowDetail from '../workflows/WorkflowDetail';
import WorkflowList from '../workflows/WorkflowList';

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
            <Route path={ROUTES.modelschema.delete} element={<ModelSchemaDelete />} />
            <Route path={ROUTES.function.list} element={<FunctionList />} />
            <Route path={ROUTES.function.detail} element={<FunctionDetail />} />
            <Route path={ROUTES.function.create} element={<FunctionCreate />} />
            <Route path={ROUTES.function.delete} element={<FunctionDelete />} />
            <Route path={ROUTES.group.list} element={<GroupList />} />
            <Route path={ROUTES.group.create} element={<GroupCreate />} />
            <Route path={ROUTES.group.detail} element={<GroupDetail />} />
            <Route path={ROUTES.group.delete} element={<GroupDelete />} />
            <Route path={ROUTES.package.list} element={<PackageList />} />
            <Route path={ROUTES.page.create} element={<PageEditor />} />
            <Route path={ROUTES.page.detail} element={<PageEditor />} />
            <Route path={ROUTES.release.tree} element={<ReleaseTree />} />
            <Route path={ROUTES.release.changes} element={<ReleaseChanges />} />
            <Route path={ROUTES.user.list} element={<UserList />} />
            <Route path={ROUTES.user.create} element={<UserCreate />} />
            <Route path={ROUTES.user.detail} element={<UserDetail />} />
            <Route path={ROUTES.user.delete} element={<UserDelete />} />
            <Route path={ROUTES.workflow.list} element={<WorkflowList />} />
            <Route path={ROUTES.workflow.create} element={<WorkflowCreate />} />
            <Route path={ROUTES.workflow.detail} element={<WorkflowDetail />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;
