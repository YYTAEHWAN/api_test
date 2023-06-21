import React, { useState, useEffect } from 'react';
import { readCryptoWalletListFunc, createSellerChosenWalletFunc } from './WalletFuncs';

function Test() {
  const [cryptoWallets, setCryptoWallets] = useState({});
  const [sellerId, setSellerId] = useState('');
  const [chosenWalletIdx, setChosenWalletIdx] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCryptoWalletList();
  }, []);

  const fetchCryptoWalletList = async () => {
    try {
      setLoading(true);
      const wallets = await readCryptoWalletListFunc();
      console.log(wallets);
      setCryptoWallets(wallets);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.id === 'sellerIdInput') {
      setSellerId(e.target.value);
    } else if (e.target.id === 'chosenWalletIdxInput') {
      setChosenWalletIdx(e.target.value);
    }
  };

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      await createSellerChosenWalletFunc(sellerId, chosenWalletIdx);
      alert('판매자가 선택한 지갑이 등록되었습니다.');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Wallet Management Page</h1>
      <div>
        <label htmlFor="sellerIdInput">판매자 아이디:</label>
        <input
          id="sellerIdInput"
          type="text"
          value={sellerId}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="chosenWalletIdxInput">선택할 지갑 번호:</label>
        <input
          id="chosenWalletIdxInput"
          type="text"
          value={chosenWalletIdx}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleButtonClick}>지갑 등록</button>
      <br />
      <br />
      <h2>낭낭에서 사용 가능한 지갑 목록</h2>
      {loading ? (
        <p>지갑 목록을 불러오는 중입니다...</p>
      ) : (
        <ul>
          {Object.entries(cryptoWallets).map(([key, walletName]) => (
            <li key={key}>
              지갑 번호: {key}, 지갑 이름: {walletName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Test;