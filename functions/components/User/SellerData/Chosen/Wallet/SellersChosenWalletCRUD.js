// // seller 블록체인 관련 테이블들------------------
// // sellet가 선택한 크립토 지갑들 정보 테이블
// Table sellers_chosen_wallet {
//     seller_id varchar [pk]
//     crypto_wallet_idx int [pk]
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


// const sellersChosenWalletDB = {
module.exports = {
  // sellet가 선택한 크립토 지갑들 정보 테이블에 데이터를 생성(추가)하는 함수
  async create(datas) {
      // 접근 db table name: sellers_chosen_wallet
      // sellers_chosen_wallet db table column: seller_id[pk], crypto_wallet_idx[pk]
  
      // sellerId : 판매자 아이디
      // cryptoWalletIdx : 판매자가 사용할 월렛 idx
      const sellerId = datas.seller_id;
      const cryptoWalletIdx = datas.crypto_wallet_idx;

      try {
          const docName = `${sellerId}_wallet_idx${cryptoWalletIdx}`;
      
          const sellersChosenWalletData = {
              seller_id: sellerId,
              crypto_wallet_idx: cryptoWalletIdx,
          };

          const sellersChosenWalletRef = db.collection("sellers_chosen_wallet");
  
          // sellers_chosen_wallet 컬렉션에 새로운 문서 생성
          await sellersChosenWalletRef.doc(docName).set(sellersChosenWalletData);
  
          return 1; // 성공
      } catch (error) {
          console.error("데이터 생성 실패:", error);
          return -1; // 실패
      }
  },
  
  // seller가 선택한 크립토 지갑들 정보 테이블에서 데이터를 모두 읽어오는 함수
  async read(datas) {
    // 접근 db table name: sellers_chosen_wallet
    // sellers_chosen_wallet db table column: seller_id[pk], crypto_wallet_idx[pk]
  
    // sellerId : 판매자 아이디
    // cryptoWalletIdx : 판매자가 사용할 월렛 idx
    
    const sellerId = datas.seller_id;
    try {
      const sellersChosenWalletRef = db.collection('sellers_chosen_wallet');
  
      const querySnapshot = await sellersChosenWalletRef.get();
  
      const chosenWalletIdxList = [];
      querySnapshot.forEach((doc) => {
        const docName = doc.id;
        const sellerIdFromDoc = docName.split('_')[0];
        const walletIdx = docName.split('_')[2];
        const walletIdxOnly = walletIdx.split('x')[1];
        
        if (sellerIdFromDoc === sellerId) {
          chosenWalletIdxList.push(walletIdxOnly);
        }
      });
  
      return chosenWalletIdxList; // seller가 선택한 크립토 지갑 리스트 반환
    } catch (error) {
      console.error('데이터 읽기 실패:', error);
      return null;
    }
  },  
  
  // sellet가 선택한 크립토 지갑들 정보 테이블에서 데이터를 삭제하는 함수
  async delete(datas) {
      // 접근 db table name: sellers_chosen_wallet
      // sellers_chosen_wallet db table column: seller_id[pk], crypto_wallet_idx[pk]
    
      // sellerId : 판매자 아이디
      // cryptoWalletIdx : 판매자가 사용할 월렛 idx
  
      
      const sellerId = datas.seller_id;
      const cryptoWalletIdx = datas.crypto_wallet_idx;
      
      const docName = `${sellerId}_wallet_idx${cryptoWalletIdx}`;
    try {
      const docRef = await db.collection("sellers_chosen_wallet").doc(docName);
      const doc = await docRef.get();
  
      if (doc.exists) {
        await docRef.delete();
        return 1; // 성공
      } else {
        console.log("문서가 존재하지 않습니다.");
        return -1; // 실패
      }
    } catch (error) {
      console.error("데이터 삭제 실패:", error);
      return -1; // 실패
    }
  }
}
