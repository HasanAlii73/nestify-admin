import {stats, listings} from '../data/mockData';
import StatCard from '../components/StatCard';

function Dashboard() {
    return (
        <div>

            {/* Stats Cards Row*/}
            <div style={{display: 'flex', gap: '16px', marginBottom: '32px'}}>
                {stats.map((stat) => (
                    <StatCard key={stat.id} title={stat.title} value={stat.value} color={stat.color} />
                ))}
            </div>

            {/* Listings Table */}
            <div style={{
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
                <h2 style={{marginTop: 0, color: '#1B4F72'}}>Recent Listings</h2>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left' }}>
                            <th style={ thStyle }>Title</th>
                            <th style={ thStyle }>City</th>
                            <th style={ thStyle }>Price</th>
                            <th style={ thStyle }>Type</th>
                            <th style={ thStyle }>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listings.slice(0, 5).map((listing) => (
                            <tr key={listing.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={ tdStyle }>{listing.title}</td>
                                <td style={ tdStyle }>{listing.city}</td>
                                <td style={ tdStyle }>${listing.price.toLocaleString()}</td>
                                <td style={ tdStyle }>{listing.type}</td>
                                <td style={ tdStyle }>
                                    <span style={{
                                        background: listing.status === 'active' ? '#D5F5E3' : '#FADBD8',
                                        color:      listing.status === 'active' ? '#1A6E35' : '#C0392B',
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
    )
}
const thStyle = {padding: '10px 12px', color: '#7A8299', fontSize: '13px', fontWeight: '600', textAlign: 'left'}
const tdStyle = {padding: '12px', color: '#1C2333', fontSize: '14px'}
export default Dashboard;