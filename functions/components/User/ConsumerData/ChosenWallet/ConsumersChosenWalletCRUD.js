
// // consumer가 선택한 크립토 지갑들 정보 테이블
// Table consumers_chosen_wallet {
//     consumer_id varchar [pk]
//     crypto_wallet_idx int [pk]
//     wallet_address varchar
// }

const admin = require("firebase-admin");
const db = admin.firestore();


module.exports = {
  // consumer가 선택한 크립토 지갑들 정보 테이블에 데이터를 생성(추가)하는 함수
  async create(datas) {
      // 접근 db table name: consumers_chosen_wallet
      // consumers_chosen_wallet db table column: consumer_id[pk], crypto_wallet_idx[pk]
  
      // consumerId : 판매자 아이디
      // cryptoWalletIdx : 판매자가 사용할 월렛 idx
      // wallet_address : 판매자가 사용할 월렛 address
      
      const consumerId = datas.consumer_id;
      const cryptoWalletIdx = datas.crypto_wallet_idx;
      const WalletAddress = datas.wallet_address;

      try {
          const docName = `${consumerId}_wallet_idx${cryptoWalletIdx}`;
      
          const consumersChosenWalletData = {
              wallet_address: WalletAddress,
          };

          const consumersChosenWalletRef = db.collection("consumers_chosen_wallet");
  
          // consumers_chosen_wallet 컬렉션에 새로운 문서 생성
          await consumersChosenWalletRef.doc(docName).set(consumersChosenWalletData);
  
          return 1; // 성공
      } catch (error) {
          console.error("데이터 생성 실패:", error);
          return -1; // 실패
      }
  },
  
  // consumer가 선택한 크립토 지갑들 정보 테이블에서 데이터를 모두 읽어오는 함수
  async read(datas) {
    // 접근 db table name: consumers_chosen_wallet
    // consumers_chosen_wallet db table column: consumer_id[pk], crypto_wallet_idx[pk]
  
    // consumerId : 판매자 아이디
    
    const consumerId = datas.consumer_id;
    // console.log("consumerId 는 " + consumerId);

    try {
      const consumersChosenWalletRef = db.collection('consumers_chosen_wallet');
  
      const querySnapshot = await consumersChosenWalletRef.get();

      var chosenWalletIdxAndAddress = {};
      querySnapshot.forEach((doc) => {
        const docName = doc.id;
        const walletAddress = doc.data().wallet_address;


        const consumerIdFromDoc = docName.split('_')[0];
        const walletIdx = docName.split('_')[2];
        const walletIdxOnly = walletIdx.split('x')[1];


        if (consumerIdFromDoc === consumerId) {
          console.log("walletIdxOnly" + walletIdxOnly)
          console.log("walletAddress" + walletAddress)
          chosenWalletIdxAndAddress[walletIdxOnly] = walletAddress;
        }
      });
      console.log("chosenWalletIdxAndAddress 는 " + JSON.stringify(chosenWalletIdxAndAddress));

      return chosenWalletIdxAndAddress; // consumer가 선택한 크립토 지갑 리스트 반환
    } catch (error) {
      console.error('데이터 읽기 실패:', error);
      return null;
    }
  },  
  
  // consumer가 선택한 크립토 지갑들 정보 테이블에서 데이터를 삭제하는 함수
  async delete(datas) {
      // 접근 db table name: consumers_chosen_wallet
      // consumers_chosen_wallet db table column: consumer_id[pk], crypto_wallet_idx[pk]
    
      // consumerId : 판매자 아이디
      // cryptoWalletIdx : 판매자가 사용할 월렛 idx
  
      
      const consumerId = datas.consumer_id;
      const cryptoWalletIdx = datas.crypto_wallet_idx;
      
      const docName = `${consumerId}_wallet_idx${cryptoWalletIdx}`;
    try {
      const docRef = await db.collection("consumers_chosen_wallet").doc(docName);
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
