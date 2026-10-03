import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      width: '100%',
      minHeight: '350px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      
      <div style={{
        backgroundColor: '#2b3e50',
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        React 練習專案
      </div>

      
      <div style={{
        backgroundColor: '#d0e1f9',
        padding: '60px 20px',
        textAlign: 'center',
        fontSize: '20px',
        color: '#333'
      }}>
        歡迎光臨我的頁面
      </div>

      
      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        backgroundColor: '#fff'
      }}>
        <Link href="/accounting">
          <button style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#eee',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}>
            點此開始
          </button>
        </Link>
      </div>
    </div>
  );
}