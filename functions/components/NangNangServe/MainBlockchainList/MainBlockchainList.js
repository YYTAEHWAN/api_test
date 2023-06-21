import React, { useEffect, useState } from 'react';
import { mainBlockchainListDB } from './MainBlockchainListCRUD';

function MainBlockchainList() {
  const [mainBlockchainList, setMainBlockchainList] = useState({});
  const [newBlockchainName, setNewBlockchainName] = useState('');
  const [modifiedBlockchainName, setModifiedBlockchainName] = useState('');
  const [blockchainIdx, setBlockchainIdx] = useState(''); // [blockchain_idx$] = [blockchain_idx1, blockchain_idx2, ...
  const [deleteBlockchainIdx, setDeleteBlockchainIdx] = useState('');

  useEffect(() => {
    handleRead();
  }, []);

  async function handleRead() {
    try {
      const blockchains = await mainBlockchainListDB.readMainBlockchainList();
      setMainBlockchainList(blockchains);
      console.log('낭낭이 제공하는 메인 블록체인 리스트를 성공적으로 가져왔습니다.');
    } catch (error) {
      console.error('낭낭이 제공하는 메인 블록체인 리스트를 가져오는 데 실패했습니다:', error);
    }
  }

  async function handleCreate() {
    if (newBlockchainName.trim() === '') {
      console.log('추가할 메인 블록체인 이름을 입력해주세요.');
      return;
    }

    try {
      const result = await mainBlockchainListDB.createMainBlockchainList(newBlockchainName);
        const onlnyIdx = result.split('_')[1];
      if (result !== -1) {
        setMainBlockchainList((prevList) => ({
          ...prevList,
          [onlnyIdx]: newBlockchainName
        }));
        setNewBlockchainName('');
        console.log('메인 블록체인 추가가 완료되었습니다.');
      } else if (result === -1) {
        console.log('이미 존재하는 메인 블록체인입니다.');
      }
    } catch (error) {
      console.error('메인 블록체인 생성에 실패했습니다:', error);
    }
  }

  async function handleUpdate() {
    if (modifiedBlockchainName.trim() === '') {
      console.log('수정할 메인 블록체인 이름을 입력해주세요.');
      return;
    }

    try {
      const result = await mainBlockchainListDB.updateMainBlockchainList(blockchainIdx, modifiedBlockchainName);
        const onlnyIdx = result.split('_')[1];

      if (result !== -1) {
        setMainBlockchainList((prevList) => ({
          ...prevList,
          [onlnyIdx]: modifiedBlockchainName
        }));
        setModifiedBlockchainName('');
        setBlockchainIdx('');
        console.log('메인 블록체인 수정이 완료되었습니다.');
      } else if (result === -1) {
        console.log('수정할 메인 블록체인이 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('메인 블록체인 수정에 실패했습니다:', error);
    }
  }

  async function handleDelete() {
    if (deleteBlockchainIdx.trim() === '') {
      console.log('삭제할 메인 블록체인의 인덱스를 입력해주세요.');
      return;
    }

    try {
      const result = await mainBlockchainListDB.deleteMainBlockchainList(deleteBlockchainIdx);

      if (result === 1) {
        const updatedMainBlockchainList = { ...mainBlockchainList };
        delete updatedMainBlockchainList[deleteBlockchainIdx];
        setMainBlockchainList(updatedMainBlockchainList);
        setDeleteBlockchainIdx('');
        console.log('메인 블록체인 삭제가 완료되었습니다.');
      } else if (result === -1) {
        console.log('삭제할 메인 블록체인이 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('메인 블록체인 삭제에 실패했습니다:', error);
    }
  }

  return (
    <div>
      <h2>Main Blockchain List (Read)</h2>
      <ul>
        {Object.entries(mainBlockchainList).map(([idx, blockchainName]) => (
          <li key={idx}>{idx} : {blockchainName}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newBlockchainName}
          onChange={(e) => setNewBlockchainName(e.target.value)}
          placeholder="New Blockchain Name"
        />
        <button onClick={handleCreate}>Create Blockchain</button>
      </div>
      <div>
        <input
          type="text"
          value={blockchainIdx}
          onChange={(e) => setBlockchainIdx(e.target.value)}
          placeholder="Blockchain Index that you want to modify BlockchainName"
        />
        <input
          type="text"
          value={modifiedBlockchainName}
          onChange={(e) => setModifiedBlockchainName(e.target.value)}
          placeholder="Modified Blockchain Name"
        />
        <button onClick={handleUpdate}>Update Blockchain</button>
      </div>
      <div>
        <input
          type="text"
          value={deleteBlockchainIdx}
          onChange={(e) => setDeleteBlockchainIdx(e.target.value)}
          placeholder="Blockchain Index"
        />
        <button onClick={handleDelete}>Delete Blockchain</button>
      </div>
      {mainBlockchainList && (
        <div>
          <h2>Main Blockchain List (Read)</h2>
          <pre>mainBlockchainListData: {JSON.stringify(mainBlockchainList, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MainBlockchainList;