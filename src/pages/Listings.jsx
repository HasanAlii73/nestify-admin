import { useState } from "react";
import { listings} from "../data/mockData";

function Listings() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [listingsList, setListingsList] = useState(listings);

    // Delete listing by id
    const handleDelete = (id) => {
        setListingsList(listingsList.filter((listing) => listing.id !== id));
    };

    // run filters before rendering
    const filtered = listingsList.filter((listing) => {
        if(statusFilter === 'all') return true;
        return listing.status === statusFilter;
    }).filter((listing) => {
        return listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                {/* Search Bar */}
                <input type="text"
                       placeholder="Search listings..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       style={{
                        flex: 1, 
                        padding: '10px 14px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        }} 
                />

                    {/* Filter Btns */}
                    {['all', 'active', 'sold'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatusFilter(s)}
                          style={{
                              borderRadius: '8px',
                              border: '1px solid #e0e0e0',
                              padding: '10px 18px',
                              background: statusFilter === s ? '#1B4F72' : '#fff',
                              color:      statusFilter === s ? '#fff'    : '#7A8299',
                              fontWeight: '500',
                              fontSize: '13px',
                              cursor: 'pointer',
                            }}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
            </div>

            {/* Table */}
            <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            padding: '24px',
            }}>

                {/* Empty State */}
                {filtered.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#7A8299', padding: '32px 0'}}>
                        No listings matches your search.
                    </p>
                )}

            {filtered.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left' }}>
                        <th style={thStyle}>Title</th>
                        <th style={thStyle}>City</th>
                        <th style={thStyle}>Price</th>
                        <th style={thStyle}>Type</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((listing) => (
                        <tr key={listing.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                          <td style={tdStyle}>{listing.title}</td>
                          <td style={tdStyle}>{listing.city}</td>
                          <td style={tdStyle}>${listing.price.toLocaleString()}</td>
                          <td style={tdStyle}>{listing.type}</td>
                          <td style={tdStyle}>
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
                          <td style={tdStyle}>
                            <button onClick={() => handleDelete(listing.id)}
                             style={{
                              background: 'none',
                              border: '1px solid #FADBD8',
                              color: '#C0392B',
                              padding: '5px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer',
                            }}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
            </div>
        </div>
    )
}
const thStyle = { padding: '10px 12px', color: '#7A8299', fontSize: '13px', fontWeight: '600' };
const tdStyle = { padding: '12px', fontSize: '14px', color: '#1C2333' };
export default Listings;