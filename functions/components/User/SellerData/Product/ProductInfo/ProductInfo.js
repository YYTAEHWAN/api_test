import React, { useState } from 'react';
import { productInfoDB } from './ProductInfoCRUD';

function ProductInfo() {
  const [productInfoIdx, setProductInfoIdx] = useState('');
  const [productName, setProductName] = useState('');
  const [productWonPricePer, setProductWonPricePer] = useState('');
  const [productInfoData, setProductInfoData] = useState(null); // read 결과를 저장

  const handleCreate = async () => {
    const newProductInfoIdx = await productInfoDB.createProductInfo(productName, productWonPricePer);
    if (newProductInfoIdx !== -1) {
      console.log('제품 정보가 성공적으로 생성되었습니다. productInfoIdx:', newProductInfoIdx);
    } else {
      console.log('제품 정보 생성에 실패했습니다.');
    }
  };

  const handleRead = async () => {
    const data = await productInfoDB.readProductInfo(productInfoIdx);
    if (data) {
      setProductInfoData(data);
    } else {
      console.log('제품 정보를 찾지 못했습니다.');
    }
  };

  const handleUpdate = async () => {
    const updatedData = await productInfoDB.updateProductInfo(productInfoIdx, productName, productWonPricePer);
    if (updatedData) {
      console.log('제품 정보가 성공적으로 수정되었습니다.');
      setProductInfoData(updatedData);
    } else {
      console.log('제품 정보 수정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    const result = await productInfoDB.deleteProductInfo(productInfoIdx);
    if (result === 1) {
      console.log('제품 정보가 성공적으로 삭제되었습니다.');
      setProductInfoData(null);
    } else {
      console.log('제품 정보 삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>Product Info</h1>
      <form>
        <label>
          Product Info Index:
          <input type="text" value={productInfoIdx} onChange={(e) => setProductInfoIdx(e.target.value)} />
        </label>
        <br />
        <label>
          Product Name:
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </label>
        <br />
        <label>
          Product Won Price Per:
          <input type="text" value={productWonPricePer} onChange={(e) => setProductWonPricePer(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleCreate}>Create</button>
        <button type="button" onClick={handleRead}>Read</button>
        <button type="button" onClick={handleUpdate}>Update</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </form>
      {productInfoData && (
        <div>
          <h2>Read Result</h2>
          <pre>productInfoData : {JSON.stringify(productInfoData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;