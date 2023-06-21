// // 낭낭 통합결제 플랫폼에서 사용할 수 있는 블록체인 지갑 리스트
// // ex) metamask, trustwallet, sollet, ...
// Table nangnang_crypto_wallet_list {
//     idx int [increment, pk]
//     name varchar
//   }

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...

// 예시
// seller 데이터 생성하는 함수
// function createSeller(input_seller_id, input_platform_name) {
//     // 접근 db table name : seller
//     // seller db table column : seller_id[pk], platform_name

//     // input_seller_id : 판매자 아이디
//     // input_platform_name : 판매자 플랫폼 이름

//     return result; // 1: 성공, -1: 실패
// }
// 함수 형식 설명 끝

import { db } from "../../../services/firebaseAPI";


const cryptoWalletListDB = {
  // 낭낭이 제공하는 크립토 월렛 리스트를 만드는 함수
  async createCryptoWalletList( input_crypto_wallet_name ) {
      // 접근 db 이름 : nangnang_crypto_wallet_list
      // 접근 db 칼럼 이름들 : idx[pk], name
  
      // input_crypto_wallet_name : 낭낭이 서비스하기 위해 추가하려는 크립토 월렛의 이름
      
      try {
          const cryptoWalletListRef = db.collection('nangnang_crypto_wallet_list');
      
          // 동일한 이름의 크립토 월렛이 있는지 확인 (대소문자 구분 없이)
          const querySnapshot = await cryptoWalletListRef.get();
          const existingWallets = querySnapshot.docs.map(doc => doc.data().name.toLowerCase());
      
          const lowerCaseInputName = input_crypto_wallet_name.toLowerCase();
          if (existingWallets.includes(lowerCaseInputName)) {
            console.log('동일한 이름의 크립토 월렛이 이미 존재합니다.');
            return -1; // 실패: 이미 존재하는 경우
          }
      
          // nangnang_crypto_wallet_list 컬렉션의 문서 개수를 세기 위해 모든 문서를 가져옴
          const snapshot = await cryptoWalletListRef.get();
          const docCount = snapshot.size;
      
          // 새로운 문서의 idx 값 = 문서 개수 + 1
          const newIdxValue = docCount + 1;
          const docName = `wallet_idx${newIdxValue}`;
      
          const data = {
            name: input_crypto_wallet_name,
          };
      
          // nangnang_crypto_wallet_list 컬렉션에 새로운 문서 생성
          await cryptoWalletListRef.doc(docName).set(data);
      
          return docName; // 성공: 문서 이름 리턴
        } catch (error) {
          console.error('데이터 생성 실패:', error);
          return -1; // 실패
        }
  },
  
  // 낭낭이 제공하는 크립토 월렛 리스트를 읽어오는 함수
  async readCryptoWalletList() {
      // 접근 db 이름 : nangnang_crypto_wallet_list
      // 접근 db 칼럼 이름들 : idx[pk], name
  
      try {
        const cryptoWalletListRef = db.collection('nangnang_crypto_wallet_list');
    
        const snapshot = await cryptoWalletListRef.get();
    
        // const cryptoWalletList = [];
        const myDict = {};
        snapshot.forEach((doc) => {
          const data = doc.data();
  
          // cryptoWalletList.push(data.name);
  
          const docName = doc.id;
          const walletIdx = docName.split('_')[1];
          const walletName = data.name;
          myDict[walletIdx] = walletName;
  
        });
    
        return myDict; // 낭낭이 제공하는 크립토 월렛 리스트 반환
      } catch (error) {
        console.error('데이터 읽기 실패:', error);
        return null;
      }
  },

    // 이건 아직 테스트 안해봄 이건 아직 테스트 안해봄 이건 아직 테스트 안해봄
   // 인덱스를 넣으면 낭낭이 제공하는 크립토 월렛의 이름을 제공하는 함수
   async readOneCryptoWalletName(walletIdx$) {
    // 접근 db 이름 : nangnang_crypto_wallet_list
    // 접근 db 칼럼 이름들 : idx[pk], name

    try {
      const cryptoWalletListRef = db.collection('nangnang_crypto_wallet_list');
  
      const snapshot = await cryptoWalletListRef.get();
      
      snapshot.forEach((doc) => {
        const data = doc.data();

        const docName = doc.id;
        const walletIdx = docName.split('_')[1];
        if(`idx${walletIdx$}` === walletIdx) {
          return data.name; // walletIdx$에 해당하는 크립토 월렛의 이름 리턴
        }
      });
      console.log("해당하는 idx의 크립토 월렛 없음");
      return -1; // 실패 해당하는 idx의 크립토 월렛 없음
    } catch (error) {
      console.error('데이터 읽기 실패:', error);
      return -1;
    }
},
  
  // 낭낭이 제공하는 크립토 월렛 리스트를 수정하는 함수
  async updateCryptoWalletList( wallet_idx$ , modifiedCryptoWalletName) {
      // 접근 db 이름 : nangnang_crypto_wallet_list
      // 접근 db 칼럼 이름들 : idx[pk], name
  
      // wallet_idx$ : 수정할 크립토 월렛의 인덱스(idx)
      // modified_crypto_wallet_name : 수정된 크립토 월렛의 이름
      
      try {
        const docName = `wallet_idx${wallet_idx$}`;
        // console.log("wallet_idx${wallet_idx$}값은 "+ `wallet_idx${wallet_idx$}`);
        const cryptoWalletListRef = db.collection('nangnang_crypto_wallet_list');
    
        const doc = await cryptoWalletListRef.doc(docName).get();
        if (doc.exists) {
          // 문서가 존재하는 경우 해당 문서의 데이터 업데이트
          await cryptoWalletListRef.doc(docName).update({ name: modifiedCryptoWalletName });
          return docName; // 성공한 문서 인덱스 리턴
        } else {
          console.log("문서가 존재하지 않습니다.");
          return -1; // 실패
        }
      } catch (error) {
        console.error('데이터 업데이트 실패:', error);
        return -1; // 실패
      }
    },
  
  
  // 낭낭이 제공하는 크립토 월렛 리스트를 삭제하는 함수
  async deleteCryptoWalletList(wallet_idx$) {
      // 접근 db 이름 : nangnang_crypto_wallet_list
      // 접근 db 칼럼 이름들 : idx[pk], name
  
      // wallet_idx$ : 삭제할 크립토 월렛의 인덱스(idx)
  
      try {
        const docName = `wallet_idx${wallet_idx$}`;
        // console.log("wallet_idx${wallet_idx$}값은 "+ wallet_idx$);
        const cryptoWalletListRef = db.collection('nangnang_crypto_wallet_list');
    
        const doc = await cryptoWalletListRef.doc(docName).get();
        if (doc.exists) {
          // 문서가 존재하는 경우 해당 문서 삭제
          await cryptoWalletListRef.doc(docName).delete();
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

export { cryptoWalletListDB };