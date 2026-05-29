import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { getToken } from "../utils/auth";
import StatCard from '../components/StatCard';

function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${getToken()}` };

    const fetchProperties = axios.get(`${BASE_URL}/api/Properties?limit=10&page=1`, { headers });
    const fetchUsers = axios.get(`${BASE_URL}/api/users/`, { headers });

    // Run both requests in parallel and wait for them to complete
    Promise.all([fetchProperties, fetchUsers])
      .then(([propertiesRes, usersRes]) => {
        const props = propertiesRes.data.data.properties;
        const users = usersRes.data.data.users;
        setProperties(props);
        setTotalUsers(users.length);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setError("Failed to load dashboard data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: '24px', color: '#7A8299' }}>Loading dashboard...</p>;
  if (error)   return <p style={{ padding: '24px', color: '#C0392B' }}>{error}</p>;

  const forSale = properties.filter(p => p.purpose === 'sell').length;
  const forRent = properties.filter(p => p.purpose === 'rent').length;

  const stats = [
    { id: 1, title: "Total Listings", value: properties.length, color: "#2E86C1" },
    { id: 2, title: "Total Users",    value: totalUsers,         color: "#1A6E35" },
    { id: 3, title: "For Sale",       value: forSale,            color: "#D4A843" },
    { id: 4, title: "For Rent",       value: forRent,            color: "#C0392B" },
  ];

  return (
    <div>
      {/* Stat Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        {stats.map((stat) => (
          <StatCard key={stat.id} title={stat.title} value={stat.value} color={stat.color} />
        ))}
      </div>

      {/* Recent Listings Table */}
      <div style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        <h2 style={{ marginTop: 0, fontSize: '16px', color: '#1B4F72' }}>
          Recent Listings
          <span style={{ fontWeight: '400', fontSize: '12px', color: '#7A8299', marginLeft: '8px' }}>
            (last 10)
          </span>
        </h2>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left' }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>City</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Purpose</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {properties.slice(0, 10).map((listing) => (
              <tr key={listing._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={tdStyle}>{listing.title}</td>
                <td style={tdStyle}>{listing.city}</td>
                <td style={tdStyle}>${listing.price.toLocaleString()}</td>
                <td style={tdStyle}>{listing.purpose}</td>
                <td style={tdStyle}>
                  <span style={{
                    background: listing.status === 'available' ? '#D5F5E3' : '#FADBD8',
                    color:      listing.status === 'available' ? '#1A6E35' : '#C0392B',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}>
                    {listing.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = { padding: '10px 12px', color: '#7A8299', fontSize: '13px', fontWeight: '600' };
const tdStyle = { padding: '12px', fontSize: '14px', color: '#1C2333' };

export default Dashboard;