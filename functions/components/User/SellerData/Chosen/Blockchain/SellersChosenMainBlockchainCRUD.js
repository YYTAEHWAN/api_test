
// // seller가 선택한 메인 블록체인 네트워크 정보 테이블
// Table sellers_chosen_main_blockchain {
// seller_id varchar [pk]
// main_blockchain_idx int [pk]

// }

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝

const admin = require("firebase-admin");
const db = admin.firestore();

// const sellersChosenMainBlockchainDB = {
module.exports = {
  
  // seller가 선택한 메인 블록체인 네트워크 정보 테이블에 데이터를 생성하는 함수
  async create(datas) {
      // 접근 db table name: sellers_chosen_main_blockchain
      // sellers_chosen_main_blockchain db table column: seller_id[pk], main_blockchain_idx[pk]
  
      // sellerId : 판매자 아이디
      // mainBlockchainIdx : 판매자가 선택한 메인 블록체인 인덱스

      const sellerId = datas.seller_id;
      const mainBlockchainIdx = datas.main_blockchain_idx;

      const data = {
          seller_id: sellerId,
          main_blockchain_idx: mainBlockchainIdx,
      };
  
      const docName = `${sellerId}_blockchain_idx${mainBlockchainIdx}`;
      
      try {
          // sellers_chosen_main_blockchain 컬렉션에 새로운 문서 생성
          await db.collection('sellers_chosen_main_blockchain').doc(docName).set(data);
          return 1; // 성공
      } catch (error) {
          console.error('데이터 생성 실패:', error);
          return -1; // 실패
      }
  },
  
  
  // async readSellersChosenMainBlockchain(sellerId) {
    
  
  //   try {
  //     const sellersChosenMainBlockchainRef = db.collection('sellers_chosen_main_blockchain');
  
  //     // sellers_chosen_main_blockchain 컬렉션에서 seller_id에 해당하는 모든 문서 가져오기
  //     const snapshot = await sellersChosenMainBlockchainRef.where('seller_id', '==', sellerId).get();
  
  //     const mainBlockchainIdxList = [];
  //     snapshot.forEach((doc) => {
  //       const data = doc.data();
  //       mainBlockchainIdxList.push(data.main_blockchain_idx);
  //     });
  
  //     return mainBlockchainIdxList; // seller가 선택한 메인 블록체인의 인덱스 리스트 리턴
  //   } catch (error) {
  //     console.error('데이터 읽기 실패:', error);
  //     return null;
  //   }
  // }
  
  // seller가 선택한 메인 블록체인 네트워크 정보 테이블에서 데이터를 모두 읽어오는 함수
  async read(datas) {
      // 접근 db table name: sellers_chosen_main_blockchain
    // sellers_chosen_main_blockchain db table column: seller_id[pk], main_blockchain_idx[pk]
  
      // sellerId : 판매자 아이디
      const sellerId = datas.seller_id;
      
      try {
        const sellersChosenMainBlockchainRef = db.collection('sellers_chosen_main_blockchain');
    
        const querySnapshot = await sellersChosenMainBlockchainRef.get();
    
        const mainBlockchainIdxList = [];
        querySnapshot.forEach((doc) => {
          const docName = doc.id;
          const sellerIdFromDoc = docName.split('_')[0];
          const mainBlockchainIdx = docName.split('_')[2];
          const mainBlockchainIdxOnly = mainBlockchainIdx.split('x')[1];
          
          if (sellerIdFromDoc === sellerId) {
            mainBlockchainIdxList.push(mainBlockchainIdxOnly);
          }
        });
    
        return mainBlockchainIdxList; // seller가 선택한 메인 블록체인의 인덱스 리스트 리턴
      } catch (error) {
        console.error('데이터 읽기 실패:', error);
        return null;
      }
    },
  
  // 복합키라서 수정은 안됨
  
  // seller가 선택한 메인 블록체인 네트워크 정보 테이블에서 데이터를 삭제하는 함수
  async delete(datas) {
    // 접근 db table name: sellers_chosen_main_blockchain
    // sellers_chosen_main_blockchain db table column: seller_id[pk], main_blockchain_idx[pk]
  
    // sellerId : 판매자 아이디
    // mainBlockchainIdx : 판매자가 삭제하기 위해 선택한 메인 블록체인 인덱스
    const sellerId = datas.seller_id;
    const mainBlockchainIdx = datas.main_blockchain_idx;

    try {
      const docName = `${sellerId}_blockchain_idx${mainBlockchainIdx}`;
      const docRef = db.collection("sellers_chosen_main_blockchain").doc(docName);
      const doc = await docRef.get();
  
      if (doc.exists) {
          await docRef.delete();
          return 1; // 성공
        } else {
          console.log("문서가 존재하지 않습니다.");
          return -1; // 실패
        }
    } catch (error) {
      console.error('데이터 삭제 실패:', error);
      return -1; // 실패
    }
  }

}