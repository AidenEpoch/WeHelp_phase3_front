'use client';

export interface RecordItem {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  name: string;
}

interface ListProps {
  records: RecordItem[];
  onDeleteRecord: (id: string) => void;
}

export default function List({ records, onDeleteRecord }: ListProps) {
  return (
    <div style={{ width: '100%', maxWidth: '550px', margin: '0 auto' }}>
      {records.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888', padding: '20px' }}>目前沒有紀錄</div>
      ) : (
        records.map((item) => (
          <div key={item.id} style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr 100px',
            alignItems: 'center',
            marginBottom: '12px',
            borderBottom: '1px solid #eee',
            paddingBottom: '12px'
          }}>
            <div style={{ color: item.type === 'expense' ? '#b71c1c' : '#2e7d32', fontWeight: 'bold', fontSize: '16px', paddingLeft: '5px' }}>
              {item.type === 'expense' ? `-${item.amount}` : `${item.amount}`}
            </div>

            <div style={{ textAlign: 'center', color: '#333', fontSize: '16px' }}>
              {item.name}
            </div>

            <div style={{ textAlign: 'right' }}>
              <button 
                onClick={() => onDeleteRecord(item.id)}
                style={{ padding: '4px 12px', cursor: 'pointer', fontSize: '13px', backgroundColor: '#eee', border: '1px solid #ccc', borderRadius: '2px' }}
              >
                刪除
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}