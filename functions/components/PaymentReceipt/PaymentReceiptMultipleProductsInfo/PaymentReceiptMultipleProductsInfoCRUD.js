// // 해당 영수증에서 구매한 여러 상품의 종류(idx)와 개수(num)을 저장하는 테이블
// Table payment_receipt_multiple_products_info {
//     // 복합키로 설정
//       // 결제 영수증 식별 idx 칼럼
//       payment_receipt_idx int [pk]
//       // 구매하려는 상품 번호
//       product_info_idx int [pk]
  
//     // 몇 개?
//     quantity int
//   }
  

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝


// // 이런 형식의 객체로 넣고 빼고 리턴함
// let products = [
//     {
//         payment_receipt_idx: 1,
//         product_info_idx: 1,
//         quantity: 2
//     },
//     {
//         payment_receipt_idx: 1,
//         product_info_idx: 2,
//         quantity: 3
//     }
// ];

const admin = require("firebase-admin");
const db = admin.firestore();

const statusInfoDB = require('../PaymentReceiptStatusInfo/PaymentReceiptStatusInfoCRUD');
const productInfoDB = require('../../User/SellerData/Product/ProductInfo/ProductInfoCRUD');

module.exports =  {
    // 입력한 PaymentReceiptIdx 값이 기존에 존재하는 PaymentReceiptIdx인지 확인하는 함수
    async checkPaymentReceiptIdx(payment_receipt_idx) {
        try {
            const datas = {
              payment_receipt_idx : payment_receipt_idx
            }
            const doc = await statusInfoDB.read(datas);
            if (doc) {
                return 1; // 성공
            } else {
                console.log('입력하신 payment_receipt_idx 데이터가 없습니다.');
                return -1; // 실패
            }
        } catch (error) {
            console.error('데이터 읽기 실패:', error);
            return -1; // 실패
        }
    },

    // 입력한 product_info_idx 값이 기존에 존재하는 product_info_idx인지 확인하는 함수
    async checkProductInfoIdx(product_info_idx) {
        try {
            // 오류가 있었어서 잠시 주석 달아놓음
            // const docName = `product_info_idx${product_info_idx}`
            // console.log("docName : ", docName);
            const datas = {
              product_info_idx : product_info_idx
            }
            const doc = await productInfoDB.read(datas);
            // console.log("doc : ", doc)
            // console.log("doc.exists : ", doc.exists)
            if (doc) {
                return 1; // 성공
            } else {
                console.log('입력하신 product_info_idx에 해당하는 데이터가 없습니다.(null)');
                return -1; // 실패
            }
        } catch (error) {
            console.error('데이터 읽기 실패:', error);
            return -1; // 실패
        }
    },
    // 입력한 값들이 기존에 존재하는 값들인지 확인하는 함수
    async checkPaymentReceiptIdxAndProductInfoIdx(payment_receipt_idx, product_info_idx) {
        try {
            const paymentReceiptIdxCheck = await this.checkPaymentReceiptIdx(payment_receipt_idx);
            if(paymentReceiptIdxCheck === -1) {
                console.log('입력하신 payment_receipt_idx 데이터가 없습니다.');
                return -1; // 실패(해당 payment_receipt_idx가 존재하지 않음
            }
            const productInfoIdxCheck = await this.checkProductInfoIdx(product_info_idx);
            if(productInfoIdxCheck === -1) {
                console.log('입력하신 product_info_idx에 해당하는 데이터가 없습니다.');
                return -1; // 실패(해당 product_info_idx가 존재하지 않음
            }
            return 1; // 성공

        } catch (error) {
            console.error('데이터 읽기 실패:', error);
            return -1; // 실패
        }
    },




  async create(datas) {
    try {

      const doc = await db
        .collection('payment_receipt_multiple_products_info')
        .doc(`${datas.payment_receipt_idx}_product_info_idx_${datas.product_info_idx}`)
        .get();

      if (doc.exists) {
        console.log('이미 데이터가 존재합니다.');
        return -1; // 실패
      } else {
        // 입력한 payment_receipt_idx, product_info_idx 값이 기존에 존재하는지 확인
        const isExist = await this.checkPaymentReceiptIdxAndProductInfoIdx(datas.payment_receipt_idx, datas.product_info_idx);
        if (isExist === 1) {
            // 둘다 존재한다면
            await db
              .collection('payment_receipt_multiple_products_info')
              .doc(`${datas.payment_receipt_idx}_product_info_idx_${datas.product_info_idx}`)
              .set({
                payment_receipt_idx : datas.payment_receipt_idx,
                product_info_idx : datas.product_info_idx,
                quantity : datas.quantity
              });
            return 1; // 성공
        }
        else {
            // 존재하지 않는다면
            console.log('입력한 idx값들의 존재 여부를 확인해주세요.');
            return -1; // 실패
        }
      }
    } catch (error) {
      console.error('데이터 생성 실패:', error);
      return -1; // 실패
    }
  },

  async read(datas) {
    const payment_receipt_idx = datas.payment_receipt_idx;
    const product_info_idx = datas.product_info_idx;

    try {
      // datas = payment_receipt_idx, product_info_idx
      const doc = await db
        .collection('payment_receipt_multiple_products_info')
        .doc(`${datas.payment_receipt_idx}_product_info_idx_${datas.product_info_idx}`)
        .get();

      if (doc.exists) {
        const resultObject = doc.data();
        return resultObject;
      } else {
        console.log('해당 데이터가 없습니다.');
        return null;
      }
    } catch (error) {
      console.error('데이터 읽기 실패:', error);
      return null;
    }
  },

  // payment_receipt_idx만 넣었을 때, 해당 payment_receipt_idx에 해당하는 모든 product_info_idx 데이터를 가져오는 함수
  // dongyuBro/PaymentProcess에서 사용되는 함수
  async readAllProductInfoIdxAndQuantity(i_payment_receipt_idx) {
    // 접근 db table name: payment_receipt_multiple_products_info
    // payment_receipt_multiple_products_info db table column: payment_receipt_idx[pk], product_info_idx[pk], quantity
    
    // payment_receipt_idx: 결제 영수증 식별 idx

    try {
      const querySnapshot = await db.collection('payment_receipt_multiple_products_info').get();
  
      const productInfoDatas = {};

      querySnapshot.forEach((doc) => {
        const docName = doc.id;
        const data = doc.data();

        // 문서 이름을 파싱하여 원하는 데이터 추출
        const parts = docName.split('_'); // 예시 : 1_product_info_idx_1 -> "1", "product", "info", "idx", "1"
        const payment_receipt_idx = parts[0]; // "1"
        const product_info_idx = parts[4];

        if (String(i_payment_receipt_idx) === String(payment_receipt_idx)) {
          productInfoDatas[product_info_idx] = data.quantity;
        }
      });
    

      return productInfoDatas;
    } catch (error) {
      console.error('데이터 읽기 실패:', error);
      console.log("--readAllProductInfoIdxAndQuantity 비정상 종료--");
      return null;
    }
  },


  async update_quantity(datas) {
    try {
      // datas = payment_receipt_idx, product_info_idx, quantity
      const doc = await db
        .collection('payment_receipt_multiple_products_info')
        .doc(`${datas.payment_receipt_idx}_product_info_idx_${datas.product_info_idx}`)
        .get();

      if (doc.exists) {
        await db
          .collection('payment_receipt_multiple_products_info')
          .doc(`${datas.payment_receipt_idx}_product_info_idx_${datas.product_info_idx}`)
          .update({
            quantity: datas.quantity,
          });
        console.log('데이터 수정 성공');
        return 1; // 성공
      } else {
        console.log('수정하려는 데이터가 존재하지 않습니다.');
        return -1; // 실패
      }
    } catch (error) {
      console.error('데이터 수정 실패:', error);
      return -1; // 실패
    }
  },

  async delete(datas) {
    const payment_receipt_idx = datas.payment_receipt_idx;
    const product_info_idx = datas.product_info_idx;
    
    try {
      // datas = payment_receipt_idx, product_info_idx
      const doc = await db
        .collection('payment_receipt_multiple_products_info')
        .doc(`${datas.payment_receipt_idx}_product_info_idx_${datas.product_info_idx}`)
        .get();

      if (doc.exists) {
        await db
          .collection('payment_receipt_multiple_products_info')
          .doc(`${datas.payment_receipt_idx}_product_info_idx_${datas.product_info_idx}`)
          .delete();
        console.log('데이터 삭제 성공');
        return 1; // 성공
      } else {
        console.log('삭제하려는 데이터가 존재하지 않습니다.');
        return -1; // 실패
      }
    } catch (error) {
      console.error('데이터 삭제 실패:', error);
      return -1; // 실패
    }
  },
};
