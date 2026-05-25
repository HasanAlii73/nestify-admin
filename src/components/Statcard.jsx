function StatCard({ title, value, color }) {
    return (
        <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            borderLeft: `4px solid ${color}`,
            padding: '24px',
            flex: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
            <p style={{margin: 0, color: '#7A8299', fontSize: '13px'}}>{title}</p>
            <h2 style={{margin: '8px 0 0', fontSize: '32px', color: color}}>{value}</h2>
        </div>
    )
}
export default StatCard;