// // 해당 영수증(해당 거래)에 참여된 consumer와 seller 정보 저장 테이블
// Table payment_receipt_participants {
//     // 결제 영수증 식별 idx 칼럼
//     payment_receipt_idx int [pk]
//     // 참여한 소비자
//     consumer_id varchar
//     // 참여된 판매자
//     seller_id varchar
//   }

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝

const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = {
  
  async create(datas) {
    try {
      // datas =  payment_receipt_idx, consumer_id, seller_id
      const doc = await db
        .collection('payment_receipt_participants')
        .doc(String(datas.payment_receipt_idx))
        .get();

      if (doc.exists) {
        console.log('이미 데이터가 존재합니다.');
        return -1; // 실패
      } else {
        await db
          .collection('payment_receipt_participants')
          .doc(String(datas.payment_receipt_idx))
          .set({
            consumer_id : datas.consumer_id,
            seller_id : datas.seller_id,
          });
        return 1; // 성공
      }
    } catch (error) {
      console.error('데이터 생성 실패:', error);
      return -1; // 실패
    }
  },

  async read(datas) {
    const payment_receipt_idx = datas.payment_receipt_idx;
    try {
      const doc = await db
        .collection('payment_receipt_participants')
        .doc(String(payment_receipt_idx))
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

  async update(datas) {
    try {
      // datas =  payment_receipt_idx, consumer_id, seller_id
      const doc = await db
        .collection('payment_receipt_participants')
        .doc(String(datas.payment_receipt_idx))
        .get();

      if (doc.exists) {
        await db
          .collection('payment_receipt_participants')
          .doc(String(datas.payment_receipt_idx))
          .update({
            consumer_id : datas.consumer_id,
            seller_id : datas.seller_id,
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
    try {
      const doc = await db
        .collection('payment_receipt_participants')
        .doc(String(payment_receipt_idx))
        .get();

      if (doc.exists) {
        await db
          .collection('payment_receipt_participants')
          .doc(String(payment_receipt_idx))
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
