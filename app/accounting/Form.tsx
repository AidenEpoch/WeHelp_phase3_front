'use client';

import { useState } from 'react';

interface FormProps {
  onAddRecord: (type: 'income' | 'expense', amount: number, name: string) => void;
}

export default function Form({ onAddRecord }: FormProps) {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0 || !name.trim()) {
      alert('請輸入有效的金額與說明');
      return;
    }
    onAddRecord(type, numAmount, name.trim());
    setAmount('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'grid',
      gridTemplateColumns: '100px 80px 1fr 100px',
      gap: '8px',
      alignItems: 'center',
      marginBottom: '30px',
      width: '100%',
      maxWidth: '550px',
      margin: '0 auto 30px auto'
    }}>
      <select 
        value={type} 
        onChange={(e) => setType(e.target.value as 'income' | 'expense')}
        style={{ padding: '6px', border: '1px solid #ccc', backgroundColor: '#fff', width: '100%' }}
      >
        <option value="income">收入</option>
        <option value="expense">支出</option>
      </select>

      <input
        type="number"
        placeholder="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: '6px', border: '1px solid #ccc', width: '100%' }}
      />

      <input
        type="text"
        placeholder="說明"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '6px', border: '1px solid #ccc', width: '100%' }}
      />

      <button type="submit" style={{ padding: '6px', cursor: 'pointer', backgroundColor: '#eee', border: '1px solid #ccc', width: '100%' }}>
        新增紀錄
      </button>
    </form>
  );
}