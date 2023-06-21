import React, { useState, useEffect } from 'react';
import { sellerDB } from './SellerCRUD';

function SellerData() {
  const [sellerId, setSellerId] = useState('');
  const [platformName, setPlatformName] = useState('');
  const [sellerData, setSellerData] = useState(null);

  const handleCreate = async () => {
    // 이 이전에 sellerId가 유효한지 검사하는 코드가 필요함

    const result = await sellerDB.createSeller(sellerId, platformName);
    if (result === 1) {
      console.log('판매자 데이터가 성공적으로 생성되었습니다.');
    } else {
      console.log('판매자 데이터 생성에 실패했습니다.');
    }
  };

  const handleRead = async () => {
    const data = await sellerDB.readSeller(sellerId);
    if (data) {
      setSellerData(data);
    } else {
      console.log('판매자 데이터를 읽어오는데 실패했습니다.');
    }
  };

  const handleUpdate = async () => {
    const result = await sellerDB.updateSeller(sellerId, platformName);
    if (result === 1) {
      console.log('판매자 데이터가 성공적으로 수정되었습니다.');
    } else {
      console.log('판매자 데이터 수정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    const result = await sellerDB.deleteSeller(sellerId);
    if (result === 1) {
      console.log('판매자 데이터가 성공적으로 삭제되었습니다.');
    } else {
      console.log('판매자 데이터 삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    // 초기 데이터 로드 등 필요한 작업 수행
  }, []);

  return (
    <div>
      <h1>Seller Data</h1>
      <form>
        <label>
          Seller ID:
          <input type="text" value={sellerId} onChange={(e) => setSellerId(e.target.value)} />
        </label>
        <br />
        <label>
          Platform Name:
          <input type="text" value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleCreate}>Create</button>
        <button type="button" onClick={handleRead}>Read</button>
        <button type="button" onClick={handleUpdate}>Update</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </form>
      {sellerData && (
        <div> 
          <h2>Read Result</h2>
          <pre>Platform Name: {JSON.stringify(sellerData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SellerData;