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
import { DetailedPage } from './pages/DetailedPage';
import { Account } from './pages/Account';
import { Cart } from './pages/Cart';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/products/:id" element={<DetailedPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<PersistentUser />}>
            <Route element={<ProtectedRoute allowedRoles={[]} />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Account />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route
                path="/content-management"
                element={<ContentManagement />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
