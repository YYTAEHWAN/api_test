import React, { useState } from 'react';
import { readSellersChosenMainBlockchain, deleteSellersChosenMainBlockchain } from './ModifyBcFuncs';

function Test() {
  const [sellerId, setSellerId] = useState('');
  const [mainBlockchainList, setMainBlockchainList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setSellerId(e.target.value);
  };

  const handleRetrieveClick = async () => {
    try {
      setLoading(true);
      const list = await readSellersChosenMainBlockchain(sellerId);
      setMainBlockchainList(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (mainBlockchainIdx) => {
    try {
      setLoading(true);
      await deleteSellersChosenMainBlockchain(sellerId, mainBlockchainIdx);
      alert(`판매자가 선택한 idx${mainBlockchainIdx}인 메인 블록체인이 삭제되었습니다.`);
      // 삭제 후, 필요한 작업 수행
      const updatedList = mainBlockchainList.filter((blockchain) => blockchain !== mainBlockchainIdx);
      setMainBlockchainList(updatedList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>판매자 블록체인 관리 페이지</h1>
      <div>
        <label htmlFor="sellerIdInput">판매자 아이디:</label>
        <input id="sellerIdInput" type="text" value={sellerId} onChange={handleInputChange} />
        <button onClick={handleRetrieveClick}>조회</button>
      </div>
      <br />
      <h2>사용 중인 블록체인 리스트</h2>
      {loading ? (
        <p>블록체인 리스트를 불러오는 중입니다...</p>
      ) : (
        <ul>
          {mainBlockchainList.map((blockchain) => (
            <li key={blockchain}>
              {blockchain.slice(3)}
              <button onClick={() => handleDeleteClick(blockchain.slice(3))}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Test;