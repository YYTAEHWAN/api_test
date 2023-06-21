import React, { useState, useEffect } from 'react';
import { readMainBlockchainList, createSellersChosenMainBlockchain } from './ManageBcFuncs';

function Test() {
  const [mainBlockchainDict, setMainBlockchainDict] = useState({});
  const [sellerId, setSellerId] = useState('');
  const [selectedBlockchainIdx, setSelectedBlockchainIdx] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMainBlockchainList();
  }, []);

  const fetchMainBlockchainList = async () => {
    try {
      setLoading(true);
      const list = await readMainBlockchainList();
      setMainBlockchainDict(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.id === 'sellerIdInput') {
      setSellerId(e.target.value);
    } else if (e.target.id === 'selectedBlockchainIdxInput') {
      setSelectedBlockchainIdx(e.target.value);
    }
  };

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      await createSellersChosenMainBlockchain(sellerId, selectedBlockchainIdx);
      alert('판매자가 선택한 메인 블록체인이 등록되었습니다.');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>블록체인 관리 페이지</h1>
      <div>
        <label htmlFor="sellerIdInput">판매자 아이디:</label>
        <input id="sellerIdInput" type="text" value={sellerId} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="selectedBlockchainIdxInput">선택한 블록체인 번호:</label>
        <input
          id="selectedBlockchainIdxInput"
          type="text"
          value={selectedBlockchainIdx}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleButtonClick}>메인 블록체인 등록</button>
      <br />
      <br />
      <h2>사용 가능한 블록체인 리스트</h2>
      {loading ? (
        <p>블록체인 리스트를 불러오는 중입니다...</p>
      ) : (
        <ul>
          {Object.keys(mainBlockchainDict).map((idx) => (
            <li key={idx}>{idx} : {mainBlockchainDict[idx]}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Test;