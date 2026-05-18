import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import Users from './pages/Users';

function App() {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex' }}>

                <Sidebar />

                <main style={{ flex: 1, padding: '24px' }}>
                 <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/listings" element={<Listings />} />
                      <Route path="/users" element={<Users />} />
                 </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}
export default App;