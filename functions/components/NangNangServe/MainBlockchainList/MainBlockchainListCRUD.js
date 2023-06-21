// // 낭낭 통합결제 플랫폼에서 사용할 수 있는 메인 블록체인 리스트
// // ex) ethereum, bitcoin, ripple, ...
// Table nangnang_main_blockchain_list {
//     idx int [increment, pk]
//     name varchar
//   }

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝

// DB 테이블: nangnang_main_blockchain_list
// 칼럼: idx (자동 증가, 기본 키), name (블록체인 이름)

import { db } from "../../../services/firebaseAPI";


const mainBlockchainListDB = {
  // 낭낭이 제공하는 메인 블록체인 리스트를 생성하는 함수
  async createMainBlockchainList(inputMainBlockchainName) {
    // 접근 db 이름: nangnang_main_blockchain_list
    // 접근 db 칼럼 이름들: idx[pk], name
  
    // inputMainBlockchainName: 낭낭이 서비스에 추가할 메인 블록체인의 이름
    try {
      const mainBlockchainListRef = db.collection('nangnang_main_blockchain_list');
  
      // 동일한 이름의 크립토 월렛이 있는지 확인 (대소문자 구분 없이)
      const querySnapshot = await mainBlockchainListRef.get();
      const existingBlockchains = querySnapshot.docs.map(doc => doc.data().name.toLowerCase());
  
      const lowerCaseInputName = inputMainBlockchainName.toLowerCase();
      if (existingBlockchains.includes(lowerCaseInputName)) {
        console.log('동일한 이름의 크립토 월렛이 이미 존재합니다.');
        return -1; // 실패: 이미 존재하는 경우
      }
  
      // nangnang_main_blockchain_list 컬렉션의 문서 개수를 세기 위해 모든 문서를 가져옴
      const snapshot = await mainBlockchainListRef.get();
      const docCount = snapshot.size;
  
      // 새로운 문서의 idx 값 = 문서 개수 + 1
      const newIdxValue = docCount + 1;
      const docName = `blockchain_idx${newIdxValue}`;
  
      const data = {
        name: inputMainBlockchainName,
      };
  
      // nangnang_crypto_wallet_list 컬렉션에 새로운 문서 생성
      await mainBlockchainListRef.doc(docName).set(data);
  
      return docName; // 성공: 문서 이름(인덱스) 리턴
    } catch (error) {
      console.error('데이터 생성 실패:', error);
      return -1; // 실패
    }
  },
  
  // 낭낭이 제공하는 메인 블록체인 리스트를 읽어오는 함수
  async readMainBlockchainList() {
    // 접근 db 이름: nangnang_main_blockchain_list
    // 접근 db 칼럼 이름들: idx[pk], name
    try {
      const mainBlockchainListRef = db.collection('nangnang_main_blockchain_list');
  
      const snapshot = await mainBlockchainListRef.get();
  
      const IdxNameDict = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
  
        const docName = doc.id;
        const BlockchainIdx = docName.split('_')[1];
        const BlockchainName = data.name;
        IdxNameDict[BlockchainIdx] = BlockchainName;
  
      });
  
      return IdxNameDict; // 낭낭이 제공하는 메인 블록체인 리스트 반환
    } catch (error) {
      console.error('데이터 읽기 실패:', error);
      return null;
    }
  
  },
  
  // 낭낭이 제공하는 메인 블록체인 리스트를 수정하는 함수
  async updateMainBlockchainList( blockchain_idx$, modifiedMainBlockchainName) {
    // 접근 db 이름: nangnang_main_blockchain_list
    // 접근 db 칼럼 이름들: idx[pk], name
  
    // blockchain_idx$: 수정할 메인 블록체인의 인덱스(idx)
    // modifiedMainBlockchainName: 수정된 메인 블록체인의 이름
    try {
      const docName = `blockchain_idx${blockchain_idx$}`;
      // console.log("blockchain_idx${blockchain_idx$}값은 "+ `blockchain_idx${blockchain_idx$}`);
      const mainBlockchainListRef = db.collection('nangnang_main_blockchain_list');
  
      const doc = await mainBlockchainListRef.doc(docName).get();
      if (doc.exists) {
        // 문서가 존재하는 경우 해당 문서의 데이터 업데이트
        await mainBlockchainListRef.doc(docName).update({ name: modifiedMainBlockchainName });
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
  
  
  // 낭낭이 제공하는 메인 블록체인 리스트를 삭제하는 함수
  async deleteMainBlockchainList(blockchain_idx$) {
    // 접근 db 이름: nangnang_main_blockchain_list
    // 접근 db 칼럼 이름들: idx[pk], name
  
    // inputMainBlockchainName: 삭제할 메인 블록체인의 이름
  
    try {
      const docName = `blockchain_idx${blockchain_idx$}`;
      // console.log("blockchain_idx${blockchain_idx$}값은 "+ blockchain_idx$);
      const mainBlockchainListRef = db.collection('nangnang_main_blockchain_list');
  
      const doc = await mainBlockchainListRef.doc(docName).get();
      if (doc.exists) {
        // 문서가 존재하는 경우 해당 문서 삭제
        await mainBlockchainListRef.doc(docName).delete();
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

export { mainBlockchainListDB };