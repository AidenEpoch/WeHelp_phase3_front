import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      border: '1px solid #ccc',
      fontFamily: 'sans-serif'
    }}>
      {/* Header */}
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

      {/* Main Content */}
      <div style={{
        backgroundColor: '#d0e1f9',
        padding: '60px 20px',
        textAlign: 'center',
        fontSize: '20px',
        color: '#333'
      }}>
        歡迎光臨我的頁面
      </div>

      {/* Footer / Action */}
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