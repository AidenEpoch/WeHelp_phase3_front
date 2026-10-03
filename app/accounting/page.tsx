'use client';

import { useState } from 'react';
import Link from 'next/link';
import Form from './Form';
import List, { RecordItem } from './List';

export default function AccountingPage() {
  // 預設範例資料 (符合畫面圖片樣式)
  const [records, setRecords] = useState<RecordItem[]>([
    { id: '1', type: 'expense', amount: 1200, name: '吃大餐' },
    { id: '2', type: 'expense', amount: 500, name: '咖啡十杯' },
    { id: '3', type: 'expense', amount: 200, name: '生活用品' },
    { id: '4', type: 'income', amount: 50000, name: '十月份薪資' },
  ]);

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

  // 計算總小計
  const total = records.reduce((sum, item) => {
    return item.type === 'income' ? sum + item.amount : sum - item.amount;
  }, 0);

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      border: '1px solid #ccc',
      padding: '40px 20px',
      fontFamily: 'sans-serif',
      backgroundColor: '#fff'
    }}>
      {/* Form 組件 */}
      <Form onAddRecord={handleAddRecord} />

      {/* List 組件 */}
      <List records={records} onDeleteRecord={handleDeleteRecord} />

      {/* 總結 */}
      <div style={{
        textAlign: 'center',
        marginTop: '30px',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        小計：{total}
      </div>

      {/* 返回首頁 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link href="/">
          <button style={{ padding: '6px 16px', cursor: 'pointer' }}>
            返回首頁
          </button>
        </Link>
      </div>
    </div>
  );
}