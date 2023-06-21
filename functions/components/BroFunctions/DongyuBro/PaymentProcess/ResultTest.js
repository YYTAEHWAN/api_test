import React, { useState } from 'react';
import { saveProductDataSentBySeller, preparePayment, AfterConnectWallet, AfterSignTxOnBlockchain, AfterTxCompleted } from './ApptoServer';


// const temp_products = [
//   {
//       product_name: "Product A",
//       product_won_price_per: 1000,
//       quantity : 1
//   },
//   {
//       product_name: "Product B",
//       product_won_price_per: 2000,
//       quantity : 2
//   },
//   {
//       product_name: "Product C",
//       product_won_price_per: 3000,
//       quantity : 3
//   }
// ];

const Test = () => {
  const [result, setResult] = useState(''); // 결과를 저장할 상태 변수

  const handleSaveProductData = async () => {
    const sellerId = 'seller1001';
    const productData = { 
      product_name: 'Product XX',
      product_won_price_per: 3000,
      quantity: 3
    };

    const productInfoIdx = await saveProductDataSentBySeller(sellerId, productData);
    setResult(`saveProductDataSentBySeller 결과: ${productInfoIdx}`);
  };

  const handlePreparePayment = async () => {
    
  const products = [
  {
      product_name: "Product A",
      product_won_price_per: 1000,
      quantity : 1
  },
  {
      product_name: "Product B",
      product_won_price_per: 2000,
      quantity : 2
  },
  {
      product_name: "Product C",
      product_won_price_per: 3000,
      quantity : 3
  }
];
    const sellerId = 'seller1001';
    const customerId = 'gen1001';

    const result = await preparePayment(products, sellerId, customerId);
    setResult(`preparePayment 결과: ${result}`);
  };

  const handleAfterConnectWallet = async () => {
    const paymentReceiptIdx = 6;
    const priceAddressInfoObject = {
      // payment_receipt_idx: 6,
      // total_coin_price: null,
      // total_won_price: 12000,
      // sender_consumer_id: 'gen1001',
      // receiver_seller_id: 'seller1001',
      sender_wallet_address: "0x000gen1001",
      receiver_wallet_address: "0x000seller1001"
    };
    const networkInfoObject = {
      payment_receipt_idx: 6, 
      payment_wallet_name: '메타마스크',
      main_blockchain_name: '이더리움',
      detailed_network_name: '이더리움 메인넷',
      detailed_network_id: 1
    };
    
    const result = await AfterConnectWallet(paymentReceiptIdx, priceAddressInfoObject, networkInfoObject);
    setResult(`AfterConnectWallet 결과: ${result}`);
  };

  const handleAfterSignTxOnBlockchain = async () => {
    const paymentReceiptIdx = 6;

    const result = await AfterSignTxOnBlockchain(paymentReceiptIdx);
    setResult(`AfterSignTxOnBlockchain 결과: ${result}`);
  };

  const handleAfterTxCompleted = async () => {
    const paymentReceiptIdx = 6;

    const result = await AfterTxCompleted(paymentReceiptIdx);
    setResult(`AfterTxCompleted 결과: ${result}`);
  }

  return (
    <div>
      <button onClick={handleSaveProductData}>saveProductDataSentBySeller 실행</button>
      <button onClick={handlePreparePayment}>preparePayment 실행</button>
      <button onClick={handleAfterConnectWallet}>AfterConnectWallet 실행</button>
      <button onClick={handleAfterSignTxOnBlockchain}>AfterSignTxOnBlockchain 실행</button>
      <button onClick={handleAfterTxCompleted}>AfterTxCompleted 실행</button>
      <div>{result}</div> {/* 결과 출력 */}
    </div>
  );
};

export default Test;