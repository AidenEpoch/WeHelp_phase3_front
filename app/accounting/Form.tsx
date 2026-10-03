'use client';

import { useState } from 'react';

interface FormProps {
  onAddRecord: (type: 'income' | 'expense', amount: number, name: string) => void;
}

export default function Form({ onAddRecord }: FormProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0 || !name.trim()) {
      alert('請輸入有效的金額與名稱！');
      return;
    }
    onAddRecord(type, numAmount, name.trim());
    setAmount('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: '8px',
      justifyContent: 'center',
      paddingBottom: '20px',
      borderBottom: '1px solid #eee'
    }}>
      <select 
        value={type} 
        onChange={(e) => setType(e.target.value as 'income' | 'expense')}
        style={{ padding: '4px 8px' }}
      >
        <option value="expense">支出</option>
        <option value="income">收入</option>
      </select>

      <input
        type="number"
        placeholder="金額"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: '80px', padding: '4px 8px' }}
      />

      <input
        type="text"
        placeholder="品項/名稱"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '150px', padding: '4px 8px' }}
      />

      <button type="submit" style={{ padding: '4px 12px', cursor: 'pointer' }}>
        新增紀錄
      </button>
    </form>
  );
}