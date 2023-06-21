import React, { useState } from 'react';
import { getSellerData } from './GetSellerDataFunc';

function Test() {
  const [sellerId, setSellerId] = useState('');
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setSellerId(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      const data = await getSellerData(sellerId);
      setSellerData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Seller Data Page</h1>
      <div>
        <label htmlFor="sellerIdInput">사용자 아이디:</label>
        <input
          id="sellerIdInput"
          type="text"
          value={sellerId}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleButtonClick}>판매자 정보 가져오기</button>
      {loading ? (
        <p>판매자 정보를 불러오는 중입니다...</p>
      ) : (
        sellerData && (
          <div>
            <p>아이디: {sellerData.id}</p>
            <p>비밀번호: {sellerData.password}</p>
            <p>소비자 여부: {sellerData.consumer_or_not}</p>
            <p>실명: {sellerData.real_name}</p>
            <p>이메일: {sellerData.email}</p>
            <p>전화번호: {sellerData.phone_number}</p>
            <p>주민등록번호: {sellerData.resident_registration_number}</p>
            {sellerData.platform_name && (
              <p>판매자 플랫폼 이름: {sellerData.platform_name}</p>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Test;