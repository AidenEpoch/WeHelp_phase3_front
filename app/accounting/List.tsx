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
    <div style={{ marginTop: '20px' }}>
      {records.map((item) => {
        const isExpense = item.type === 'expense';
        const displayAmount = isExpense ? -item.amount : item.amount;
        const color = isExpense ? '#d9534f' : '#5cb85c';

        return (
          <div key={item.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            maxWidth: '350px',
            margin: '0 auto'
          }}>
            <span style={{ color, fontWeight: 'bold', width: '80px', textAlign: 'right' }}>
              {displayAmount}
            </span>
            <span style={{ flex: 1, marginLeft: '20px', textAlign: 'left' }}>
              {item.name}
            </span>
            <button
              onClick={() => onDeleteRecord(item.id)}
              style={{ padding: '2px 8px', cursor: 'pointer' }}
            >
              刪除
            </button>
          </div>
        );
      })}
    </div>
  );
}