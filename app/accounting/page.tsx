'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import Form from './Form';
import List, { RecordItem } from './List';

export default function AccountingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<RecordItem[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'records'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: RecordItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        fetched.push({
          id: docSnap.id,
          type: data.type,
          amount: data.amount,
          name: data.name,
        });
      });
      setRecords(fetched);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddRecord = async (type: 'income' | 'expense', amount: number, name: string) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'records'), {
        userId: user.uid,
        type,
        amount,
        name,
        createdAt: serverTimestamp(),
      });
    } catch (err: any) {
      alert('新增失敗：' + err.message);
    }
  };

  const handleDeleteRecord = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'records', id));
    } catch (err: any) {
      alert('刪除失敗：' + err.message);
    }
  };

  const total = records.reduce((sum, item) => {
    return item.type === 'income' ? sum + item.amount : sum - item.amount;
  }, 0);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>載入中...</div>;

  return (
    <div style={{ width: '100%', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#fff' }}>
      <div style={{ backgroundColor: '#2b3e50', color: '#fff', padding: '20px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        React 練習專案
      </div>

      <div style={{ maxWidth: '650px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '25px', fontSize: '15px', color: '#333' }}>
          您已經使用 <strong>{user?.email}</strong> 登入
        </div>

        <Form onAddRecord={handleAddRecord} />

        <List records={records} onDeleteRecord={handleDeleteRecord} />

        <div style={{ textAlign: 'center', margin: '30px 0', fontSize: '18px', fontWeight: 'bold' }}>
          小計：{total}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/">
            <button style={{ padding: '6px 20px', cursor: 'pointer', backgroundColor: '#eee', border: '1px solid #ccc' }}>
              返回首頁
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}