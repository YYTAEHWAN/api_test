// // 결제의 사용 지갑, 네트워크 정보 테이블
// Table payment_receipt_network_info {
//     // 결제 영수증 식별 idx 칼럼
//     payment_receipt_idx int [pk]
  
//     // 블록체인 지갑 칼럼 ex) 메타마스크, 트러스트월렛
//     payment_wallet_name varchar
//     // 메인 블록체인 네트워크  칼럼 ex) 이더리움, 비트코인, 리플
//     main_blockchain_name varchar
//     // 세부 네트워크 칼럼 ex) 이더리움 메인넷, BSC Mainnet, zkSync Era
//     detailed_network_name varchar
//     // 세부 네트워크 id 칼럼 (chain id를 의미)
//     detailed_network_id int
//   }

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝

// // 이런 형식으로 객체 만들어 넣고 빼기
// let networkInfo = {
//     payment_receipt_idx: 1,
//     payment_wallet_name: "메타마스크",
//     main_blockchain_name: "이더리움",
//     detailed_network_name: "이더리움 메인넷",
//     detailed_network_id: 1
// };

const admin = require("firebase-admin");
const db = admin.firestore();

module.exports =  {
  async create(datas) {
    try {
      const doc = await db
        .collection('payment_receipt_network_info')
        .doc(String(datas.payment_receipt_idx))
        .get();
      
      if (doc.exists) {
        console.log('이미 데이터가 존재합니다.');
        return -1; // 실패
      } else {
        await db
          .collection('payment_receipt_network_info')
          .doc(String(datas.payment_receipt_idx))
          .set(datas);
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
        .collection('payment_receipt_network_info')
        .doc(String(payment_receipt_idx))
        .get();

      if (doc.exists) {
        const resultObject = doc.data();
        return resultObject;
      } else {
        console.log('해당 데이터가 없습니다.');
        return -1;
      }
    } catch (error) {
      console.error('데이터 읽기 실패:', error);
      return -1;
    }
  },

  async update(datas) {
    try {
      const doc = await db
        .collection('payment_receipt_network_info')
        .doc(String(datas.payment_receipt_idx))
        .get();

      if (doc.exists) {
        await db
          .collection('payment_receipt_network_info')
          .doc(String(datas.payment_receipt_idx))
          .update(datas);
        console.log('데이터 수정 성공');
        return 1; // 성공
      } else {
        console.log('수정하려는 데이터가 존재하지 않습니다.');
        console.log("NetworkInfoDB.update 실패");
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
        .collection('payment_receipt_network_info')
        .doc(String(payment_receipt_idx))
        .get();

      if (doc.exists) {
        await db
          .collection('payment_receipt_network_info')
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
