import { useState } from "react";
import axios from '@/lib/axios';

export default function LoginInput() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const res = await axios.post('/api/auth/login', { email, password }, {
        withCredentials: true
      });

      window.location.href = '/';
    } catch (err) {
      setError('로그인 정보가 잘못되었습니다.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="login-title">
          <div className="logo">
            <div style={{ color: '#188c3b', fontWeight: 'bolder' }}>&gt;</div>
            <div>orot</div>
          </div>
        </h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">로그인</button>
        </form>
      </div>
    </div>
  );
}