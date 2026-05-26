import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Complaints from './pages/Complaints';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Topbar from './components/topbar';
import Listings from './pages/Listings';
import Settings from './pages/Settings';
import Users from './pages/Users';

function App() {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex', minHeight: '100vh'  }}>

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
        </BrowserRouter>
    )
}
export default App;