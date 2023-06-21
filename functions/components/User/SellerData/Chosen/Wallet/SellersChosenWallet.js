import React, { useState } from 'react';
import { sellersChosenWalletDB } from './SellersChosenWalletCRUD';

function SellersChosenWallet() {
  const [sellerId, setSellerId] = useState('');
  const [cryptoWalletIdx, setCryptoWalletIdx] = useState('');
  const [sellersChosenWalletIdxList, setSellersChosenWalletIdxList] = useState([]); // 읽기 결과를 저장

  const handleCreate = async () => {
    const result = await sellersChosenWalletDB.createSellersChosenWallet(sellerId, cryptoWalletIdx);
    if (result === 1) {
      console.log('판매자가 선택한 크립토 지갑 데이터가 성공적으로 생성되었습니다.');
    } else {
      console.log('판매자가 선택한 크립토 지갑 데이터 생성에 실패했습니다.');
    }
  };

  const handleRead = async () => {
    const dataList = await sellersChosenWalletDB.readSellersChosenWallet(sellerId);
    if (dataList) {
      setSellersChosenWalletIdxList(dataList);
    } else {
      console.log('판매자가 선택한 크립토 지갑 데이터를 찾지 못했습니다.');
    }
  };

  const handleDelete = async () => {
    const result = await sellersChosenWalletDB.deleteSellersChosenWallet(sellerId, cryptoWalletIdx);
    if (result === 1) {
      console.log('판매자가 선택한 크립토 지갑 데이터가 성공적으로 삭제되었습니다.');
      setSellersChosenWalletIdxList(null);
    } else {
      console.log('판매자가 선택한 크립토 지갑 데이터 삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>Sellers Chosen Wallet</h1>
      <form>
        <label>
          Seller ID:
          <input type="text" value={sellerId} onChange={(e) => setSellerId(e.target.value)} />
        </label>
        <br />
        <label>
          Crypto Wallet Index:
          <input type="text" value={cryptoWalletIdx} onChange={(e) => setCryptoWalletIdx(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleCreate}>Create</button>
        <button type="button" onClick={handleRead}>Read</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </form>
      {sellersChosenWalletIdxList && (
        <div>
          <h2>읽기 결과</h2>
          <pre>sellersChosenWalletIdxList: {JSON.stringify(sellersChosenWalletIdxList, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SellersChosenWallet;