'use client';

import { useState } from 'react';
import Link from 'next/link';
import Form from './Form';
import List, { RecordItem } from './List';

export default function AccountingPage() {
  const [records, setRecords] = useState<RecordItem[]>([]);

  const handleAddRecord = (type: 'income' | 'expense', amount: number, name: string) => {
    const newRecord: RecordItem = {
      id: Date.now().toString(),
      type,
      amount,
      name,
    };
    setRecords((prev) => [...prev, newRecord]);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const total = records.reduce((sum, item) => {
    return item.type === 'income' ? sum + item.amount : sum - item.amount;
  }, 0);

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      minHeight: '600px',
      border: '1px solid #ccc',
      padding: '40px 20px',
      fontFamily: 'sans-serif',
      backgroundColor: '#fff'
    }}>
      
      <Form onAddRecord={handleAddRecord} />

      
      <List records={records} onDeleteRecord={handleDeleteRecord} />

      
      <div style={{
        textAlign: 'center',
        marginTop: '30px',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        小計：{total}
      </div>

      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link href="/">
          <button style={{ padding: '6px 16px', cursor: 'pointer', border: '1px solid #ccc', backgroundColor: '#eee'}}>
            返回首頁
          </button>
        </Link>
      </div>
    </div>
  );
}