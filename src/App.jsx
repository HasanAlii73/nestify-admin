import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/topbar';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Complaints from './pages/Complaints';
import Login from './pages/Login';
import { getToken } from './utils/auth';

function App() {
  const token = getToken();

  return (
    <BrowserRouter>
      <Routes>

        {/* Login route — redirect to dashboard if already logged in */}
        <Route path="/login" element={
          token ? <Navigate to="/dashboard" /> : <Login />
        } />

        {/* Protected routes — redirect to login if no token */}
        <Route path="/*" element={
          !token ? <Navigate to="/login" /> :
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flex: 1 }}>
              <Topbar />
              <div style={{ padding: '24px' }}>
                <Routes>
                  <Route path="/" element={<Navigate to="/Dashboard" />} />
                  <Route path="/Dashboard" element={<Dashboard />} />
                  <Route path="/Listings" element={<Listings />} />
                  <Route path="/Users" element={<Users />} />
                  <Route path="/Settings" element={<Settings />} />
                  <Route path="/Complaints" element={<Complaints />} />
                </Routes>
              </div>
            </main>
          </div>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;