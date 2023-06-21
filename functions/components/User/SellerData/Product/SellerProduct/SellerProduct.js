import React, { useState } from 'react';
import { sellerProductsDB } from './SellerProductCRUD';

function SellerProduct() {
  const [sellerId, setSellerId] = useState('');
  const [productInfoIdx, setProductInfoIdx] = useState('');
  const [sellerProductData, setSellerProductData] = useState(null); // read 결과를 저장

  const handleCreate = async () => {
    const result = await sellerProductsDB.createSellerProducts(sellerId, productInfoIdx);
    if (result === 1) {
      console.log('판매자 제품 데이터가 성공적으로 생성되었습니다.');
    } else {
      console.log('판매자 제품 데이터 생성에 실패했습니다.');
    }
  };

  const handleRead = async () => {
    const data = await sellerProductsDB.readSellerProducts(sellerId, productInfoIdx);
    if (data) {
      setSellerProductData(data);
    } else {
      console.log('판매자 제품 데이터를 찾지 못했습니다.');
    }
  };

  const handleDelete = async () => {
    const result = await sellerProductsDB.deleteSellerProducts(sellerId, productInfoIdx);
    if (result === 1) {
      console.log('판매자 제품 데이터가 성공적으로 삭제되었습니다.');
    } else {
      console.log('판매자 제품 데이터 삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>Seller Product</h1>
      <form>
        <label>
          Seller ID:
          <input type="text" value={sellerId} onChange={(e) => setSellerId(e.target.value)} />
        </label>
        <br />
        <label>
          Product Info Index:
          <input type="text" value={productInfoIdx} onChange={(e) => setProductInfoIdx(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleCreate}>Create</button>
        <button type="button" onClick={handleRead}>Read</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </form>
      {sellerProductData && (
        <div> 
          <h2>Read Result</h2>
          <pre>sellerProductData : {JSON.stringify(sellerProductData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SellerProduct;