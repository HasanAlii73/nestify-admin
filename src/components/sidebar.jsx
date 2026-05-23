import { NavLink } from "react-router-dom";

function Sidebar() {
    return(
        <aside style={{width: '220px', minHeight: '100vh', background: '#1B4F72', padding: '24px 0'}}>
            <div style={{color: '#fff', fontSize:'22px', fontWeight:'bold', padding: '0 24px 32px'}}>
                Nestify Admin
            </div>

            <nav>
                <NavLink to="/Dashboard" style={navStyle}>Dashboard</NavLink>
                <NavLink to="/Listings" style={navStyle}>Listings</NavLink>
                <NavLink to="/Users" style={navStyle}>Users</NavLink>
                <NavLink to="/Settings" style={navStyle}>Settings</NavLink>
            </nav>
        </aside>
    );
 }

 const navStyle = ({isActive}) => ({
    display: 'block',
    padding: '12px 24px',
    color: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)',
    background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
    textDecoration: 'none',
    fontWeight: isActive ? '600' : '400',
 });

 export default Sidebar;