import React, { useState } from 'react';
import { readSellersChosenWallet, deleteSellersChosenWallet } from './ChosenWalletFuncs';

function Test() {
  const [sellerId, setSellerId] = useState('');
  const [chosenWallets, setChosenWallets] = useState([]);
  const [deleteWalletIdx, setDeleteWalletIdx] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setSellerId(e.target.value);
  };

  const fetchChosenWallets = async () => {
    try {
      setLoading(true);
      const wallets = await readSellersChosenWallet(sellerId);
      setChosenWallets(wallets);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchButtonClick = () => {
    fetchChosenWallets();
  };

  const handleDeleteInputChange = (e) => {
    setDeleteWalletIdx(e.target.value);
  };

  const handleDeleteButtonClick = async () => {
    if (deleteWalletIdx === '') {
      alert('삭제할 지갑의 인덱스를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      const result = await deleteSellersChosenWallet(sellerId, deleteWalletIdx);
      if (result === 1) {
        // 삭제 성공
        alert('지갑 삭제가 완료되었습니다.');
        fetchChosenWallets();
      } else {
        // 삭제 실패
        alert('지갑 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>판매자 지갑 관리</h1>
      <div>
        <label htmlFor="sellerIdInput">판매자 아이디:</label>
        <input
          id="sellerIdInput"
          type="text"
          value={sellerId}
          onChange={handleInputChange}
        />
        <button onClick={handleFetchButtonClick}>지갑 조회</button>
      </div>
      {loading ? (
        <p>지갑을 조회하는 중입니다...</p>
      ) : (
        <div>
          <h2>선택한 지갑 목록</h2>
          <ul>
            {chosenWallets.map((wallet, index) => (
              <li key={wallet}>
                {wallet}{' '}
                <button onClick={() => setDeleteWalletIdx(wallet.slice(3))}>선택</button>
              </li>
            ))}
          </ul>
          <div>
            <label htmlFor="deleteWalletIdxInput">삭제할 지갑 인덱스:</label>
            <input
              id="deleteWalletIdxInput"
              type="text"
              value={deleteWalletIdx}
              onChange={handleDeleteInputChange}
            />
            <button onClick={handleDeleteButtonClick}>지갑 삭제</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;