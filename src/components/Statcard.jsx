function StatCard({ title, value }) {
    return (
        <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            padding: '24px',
            flex: 1,
        }}>
            <p style={{margin: 0, color: '#7A8299', fontSize: '13px'}}>{title}</p>
            <h2 style={{margin: '8px 0 0 0', color: '#1B4F72', fontSize: '32px'}}>{value}</h2>
        </div>
    )
}
export default StatCard;