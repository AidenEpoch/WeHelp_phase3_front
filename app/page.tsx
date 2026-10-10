"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Home() {
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      alert("請輸入電郵與密碼");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail("");
      setLoginPassword("");
    } catch (err: any) {
      alert("登入失敗：" + err.message);
    }
  };

  const handleSignUp = async () => {
    if (!signupEmail.trim() || !signupPassword.trim()) {
      alert("請輸入電郵與密碼");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      setSignupEmail("");
      setSignupPassword("");
      alert("註冊成功！已自動登入。");
    } catch (err: any) {
      alert("註冊失敗：" + err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      alert("登出失敗：" + err.message);
    }
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", fontFamily: "sans-serif", backgroundColor: "#fff" }}>
      <div
        style={{
          backgroundColor: "#2b3e50",
          color: "#fff",
          padding: "20px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        React 練習專案
      </div>

      <div style={{ padding: "40px 20px", textAlign: "center", color: "#333" }}>
        {loading ? (
          <div>載入中...</div>
        ) : user ? (
          <div style={{ maxWidth: "340px", margin: "0 auto", textAlign: "left" }}>
            <div style={{ textAlign: "center", marginBottom: "15px", fontSize: "15px" }}>
              您已經使用 <strong>{user.email}</strong> 登入
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "30px" }}>
              <Link href="/accounting">
                <button style={{ padding: "4px 16px", cursor: "pointer", backgroundColor: "#eee", border: "1px solid #ccc" }}>
                  立即開始
                </button>
              </Link>
              <button onClick={handleSignOut} style={{ padding: "4px 16px", cursor: "pointer", backgroundColor: "#eee", border: "1px solid #ccc" }}>
                登出
              </button>
            </div>

            <hr style={{ border: "0", borderTop: "1px solid #ddd", margin: "20px 0" }} />

            <h3 style={{ textAlign: "center", marginBottom: "15px", fontWeight: "normal" }}>註冊帳戶</h3>
            <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <span style={{ width: "50px", textAlign: "right", marginRight: "10px", fontSize: "14px" }}>電郵</span>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #aaa" }}
              />
            </div>
            <div style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
              <span style={{ width: "50px", textAlign: "right", marginRight: "10px", fontSize: "14px" }}>密碼</span>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #aaa" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={handleSignUp} style={{ padding: "4px 20px", cursor: "pointer", backgroundColor: "#eee", border: "1px solid #ccc" }}>
                註冊
              </button>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: "340px", margin: "0 auto", textAlign: "left" }}>
            <h3 style={{ textAlign: "center", marginBottom: "15px", fontWeight: "normal" }}>登入系統</h3>
            <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <span style={{ width: "50px", textAlign: "right", marginRight: "10px", fontSize: "14px" }}>電郵</span>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #aaa" }}
              />
            </div>
            <div style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
              <span style={{ width: "50px", textAlign: "right", marginRight: "10px", fontSize: "14px" }}>密碼</span>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #aaa" }}
              />
            </div>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <button onClick={handleLogin} style={{ padding: "4px 20px", cursor: "pointer", backgroundColor: "#eee", border: "1px solid #ccc" }}>
                登入
              </button>
            </div>

            <hr style={{ border: "0", borderTop: "1px solid #ddd", margin: "20px 0" }} />

            <h3 style={{ textAlign: "center", marginBottom: "15px", fontWeight: "normal" }}>註冊帳戶</h3>
            <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <span style={{ width: "50px", textAlign: "right", marginRight: "10px", fontSize: "14px" }}>電郵</span>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #aaa" }}
              />
            </div>
            <div style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
              <span style={{ width: "50px", textAlign: "right", marginRight: "10px", fontSize: "14px" }}>密碼</span>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #aaa" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={handleSignUp} style={{ padding: "4px 20px", cursor: "pointer", backgroundColor: "#eee", border: "1px solid #ccc" }}>
                註冊
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}