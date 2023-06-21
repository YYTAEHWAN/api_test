import React, { useState } from 'react';
import { LoginReturnData } from './LoginReturnDataFunc';

function Test() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.id === 'userIdInput') {
      setUserId(e.target.value);
    } else if (e.target.id === 'passwordInput') {
      setPassword(e.target.value);
    }
  }
  const handleLoginClick = async () => {
    try {
        setLoginData(null);
      setLoading(true);
      const data = await LoginReturnData(userId, password);
      setLoginData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login 테스트</h1>
      <div>
        <label htmlFor="userIdInput">아이디:</label>
        <input id="userIdInput" type="text" value={userId} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="passwordInput">비밀번호:</label>
        <input id="passwordInput" type="password" value={password} onChange={handleInputChange} />
      </div>
      <button onClick={handleLoginClick}>로그인</button>
      <br />
      <br />
      <h2>로그인 데이터</h2>
      {loading ? (
        <p>로그인 중입니다...</p>
      ) : (
        <div>
          {loginData !== null ? (
            <ul>
              {Object.entries(loginData).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}: </strong> {value}
                </li>
              ))}
            </ul>
          ) : (
            <p>로그인 데이터가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Test;