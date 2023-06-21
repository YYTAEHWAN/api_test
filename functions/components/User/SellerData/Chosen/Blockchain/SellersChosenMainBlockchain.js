import React, { useState } from 'react';
import { sellersChosenMainBlockchainDB } from './SellersChosenMainBlockchainCRUD';

function SellersChosenMainBlockchain() {
  // 판매자가 선택한 메인 블록체인 정보를 관리하는 컴포넌트

  // 상태 변수 설정
  const [sellerId, setSellerId] = useState('');
  const [mainBlockchainIdx, setMainBlockchainIdx] = useState('');
  const [mainBlockchainIdxList, setMainBlockchainIdxList] = useState([]);
  const [message, setMessage] = useState('');

  // 판매자가 선택한 메인 블록체인 정보 생성
  const handleCreate = async () => {
    if (sellerId && mainBlockchainIdx) {
      const result = await sellersChosenMainBlockchainDB.createSellersChosenMainBlockchain(sellerId, mainBlockchainIdx);
      if (result === 1) {
        setMessage('판매자가 선택한 메인 블록체인 정보가 생성되었습니다.');
      } else {
        setMessage('판매자가 선택한 메인 블록체인 정보 생성에 실패했습니다.');
      }
    } else {
      setMessage('판매자 아이디와 메인 블록체인 인덱스를 입력하세요.');
    }
  };

  // 판매자가 선택한 메인 블록체인 정보 조회
  const handleRead = async () => {
    if (sellerId) {
      const dataList = await sellersChosenMainBlockchainDB.readSellersChosenMainBlockchain(sellerId);
      if (dataList) {
        setMainBlockchainIdxList(dataList);
        setMessage(`판매자가 선택한 메인 블록체인 정보: ${dataList.join(', ')}`);
      } else {
        setMessage('판매자가 선택한 메인 블록체인 정보 조회에 실패했습니다.');
      }
    } else {
      setMessage('판매자 아이디를 입력하세요.');
    }
  };

  // 판매자가 선택한 메인 블록체인 정보 삭제
  const handleDelete = async () => {
    if (sellerId && mainBlockchainIdx) {
      const result = await sellersChosenMainBlockchainDB.deleteSellersChosenMainBlockchain(sellerId, mainBlockchainIdx);
      if (result === 1) {
        setMessage('판매자가 선택한 메인 블록체인 정보가 삭제되었습니다.');
      } else {
        setMessage('판매자가 선택한 메인 블록체인 정보 삭제에 실패했습니다.');
      }
    } else {
      setMessage('판매자 아이디와 메인 블록체인 인덱스를 입력하세요.');
    }
  };

  return (
    <div>
      <h2>Sellers Chosen Main Blockchain</h2>
      <div>
        <label htmlFor="sellerId">판매자 아이디:</label>
        <input
          type="text"
          id="sellerId"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="mainBlockchainIdx">메인 블록체인 인덱스:</label>
        <input
          type="text"
          id="mainBlockchainIdx"
          value={mainBlockchainIdx}
          onChange={(e) => setMainBlockchainIdx(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleCreate}>생성</button>
        <button onClick={handleRead}>조회</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
      <p>{message}</p>
      {mainBlockchainIdxList && (
        <div>
          <h2>읽기 결과</h2>
          <pre>mainBlockchainIdxList: {JSON.stringify(mainBlockchainIdxList, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SellersChosenMainBlockchain;