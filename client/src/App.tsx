import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Catalog } from './pages/Catalog';
import { PersistentUser } from './components/PersistentUser/PersistentUser';
import { ContentManagement } from './pages/ContentManagement';
import { NotFound } from './pages/NotFound';
import { Unauthorized } from './pages/Unauthorized';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				{/* public routes */}
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/unauthorized' element={<Unauthorized />} />

				{/* we want to protect these routes */}
				<Route element={<PersistentUser />}>
					<Route element={<ProtectedRoute allowedRoles={['']} />}>
						<Route path='/' element={<Catalog />} />
					</Route>

					<Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
						<Route path='/content-management' element={<ContentManagement />} />
					</Route>
				</Route>

				{/* catch all */}
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
