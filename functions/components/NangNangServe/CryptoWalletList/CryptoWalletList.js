import React, { useEffect, useState } from 'react';
import { cryptoWalletListDB } from './CryptoWalletListCRUD';

function CryptoWalletList() {
  const [cryptoWalletList, setCryptoWalletList] = useState({});
  const [newWalletName, setNewWalletName] = useState('');
  const [walletIdx, setWalletIdx] = useState('');
  const [deleteWalletIdx, setDeleteWalletIdx] = useState('');
  const [modifiedWalletName, setModifiedWalletName] = useState('');

  useEffect(() => {
    handleRead();
  }, []);

  async function handleRead() {
    try {
      const wallets = await cryptoWalletListDB.readCryptoWalletList();
      setCryptoWalletList(wallets);
      console.log('크립토 월렛 리스트를 성공적으로 가져왔습니다.');
    } catch (error) {
      console.error('크립토 월렛 리스트를 가져오는 데 실패했습니다:', error);
    }
  }

  async function handleCreate() {
    if (newWalletName.trim() === '') {
      console.log('크립토 월렛 이름을 입력해주세요.');
      return;
    }

    try {
      const result = await cryptoWalletListDB.createCryptoWalletList(newWalletName);
      if (result !== -1) {
          const onlnyIdx = result.split('_')[1];
        setCryptoWalletList((prevList) => ({
          ...prevList,
          [onlnyIdx]: newWalletName
        }));
        setNewWalletName('');
        console.log('크립토 월렛 추가가 완료되었습니다.');
      } else if (result === -1) {
        console.log('이미 존재하는 크립토 월렛입니다.');
      }
    } catch (error) {
      console.error('크립토 월렛 생성에 실패했습니다:', error);
    }
  }

  async function handleUpdate() {
    if (walletIdx.trim() === '' || modifiedWalletName.trim() === '') {
      console.log('수정할 크립토 월렛 인덱스와 이름을 입력해주세요.');
      return;
    }

    try {
      const result = await cryptoWalletListDB.updateCryptoWalletList(walletIdx, modifiedWalletName);

      if (result !== -1) {
        setCryptoWalletList((prevList) => ({
          ...prevList,
          [`idx${walletIdx}`]: modifiedWalletName
        }));
        setWalletIdx('');
        setModifiedWalletName('');
        console.log('크립토 월렛 수정이 완료되었습니다.');
      } else if (result === -1) {
        console.log('수정할 크립토 월렛이 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('크립토 월렛 수정에 실패했습니다:', error);
    }
  }

  async function handleDelete() {
    if (deleteWalletIdx.trim() === '') {
        console.log('삭제할 크립토 월렛 인덱스를 입력해주세요.');
        return;
      }

    try {
        console.log("handleDelete초반에 deleteWalletIdx "+ deleteWalletIdx);
      const result = await cryptoWalletListDB.deleteCryptoWalletList(deleteWalletIdx);

      if (result === 1) {
        const updatedCryptoWalletList = { ...cryptoWalletList };
        delete updatedCryptoWalletList[deleteWalletIdx];
        setCryptoWalletList(updatedCryptoWalletList);
        setDeleteWalletIdx('');
        console.log('크립토 월렛 삭제가 완료되었습니다.');
      } else if (result === -1) {
        console.log('삭제할 크립토 월렛이 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('크립토 월렛 삭제에 실패했습니다:', error);
    }
  }

  return (
    <div>
      <h2>Crypto Wallet List</h2>
      <ul>
        {Object.entries(cryptoWalletList).map(([idx, walletName]) => (
          <li key={idx}>{walletName}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newWalletName}
          onChange={(e) => setNewWalletName(e.target.value)}
          placeholder="New Wallet Name"
        />
        <button onClick={handleCreate}>Create Wallet</button>
      </div>
      <div>
        <input
          type="text"
          value={walletIdx}
          onChange={(e) => setWalletIdx(e.target.value)}
          placeholder="Modified Wallet Index"
        />
        <input
          type="text"
          value={modifiedWalletName}
          onChange={(e) => setModifiedWalletName(e.target.value)}
          placeholder="Modified Wallet Name"
        />
        <button onClick={handleUpdate}>Update Wallet</button>
      </div>
      <div>
        <input 
          type="text"
          value={deleteWalletIdx}
          placeholder="Wallet Index"
          onChange={(e) => setDeleteWalletIdx(e.target.value)} />
        <button onClick={handleDelete}>Delete Wallet</button>
      </div>
      {cryptoWalletList && (
        <div>
          <h2>cryptoWalletList Result</h2>
          <pre>cryptoWalletListData : {JSON.stringify(cryptoWalletList, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CryptoWalletList;