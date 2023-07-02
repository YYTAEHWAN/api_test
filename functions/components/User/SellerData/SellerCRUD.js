// Table seller {
//     seller_id varchar [primary key]
//     platform_name varchar
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

// const sellerDB = {
module.exports = {
  // seller 데이터 생성하는 함수
  async create(datas) {
    // 접근 db table name : seller
    // seller db table column : seller_id[pk], platform_name

    // input_seller_id : 판매자 아이디
    // input_platform_name : 판매자 플랫폼 이름
    const input_seller_id = datas.seller_id;
    const input_platform_name = datas.platform_name;

    const sellerData = {
      seller_id: input_seller_id,
      platform_name: input_platform_name,
    };

    try {
      // seller 컬렉션에 새로운 문서 생성
      await db.collection("seller").doc(input_seller_id).set(sellerData);
      return 1; // 성공
    } catch (error) {
      console.error("데이터 생성 실패:", error);
      return -1; // 실패
    }
  },

  // seller platform_name 읽어오는 함수
  async readPlatformName(datas) {
    // 접근 db table name : seller
    // seller db table column : seller_id[pk], platform_name

    // input_seller_id : 판매자 아이디
    const input_seller_id = datas.seller_id;

    try {
      // seller 컬렉션에서 해당 문서 가져오기
      const doc = await db.collection("seller").doc(input_seller_id).get();
      if (doc.exists) {
        // 문서가 존재하는 경우 platform_name 반환
        return doc.data().platform_name;
      } else {
        console.log("문서가 존재하지 않습니다.");
        return -1;
      }
    } catch (error) {
      console.error("데이터 읽기 실패:", error);
      return -1;
    }
  },

  // seller platform_name 수정하는 함수
  async update(datas) {
    // 접근 db table name : seller
    // seller db table column : seller_id[pk], platform_name

    // input_seller_id : 수정할 판매자 아이디
    // modified_platform_name : 수정된 플랫폼 이름

    const input_seller_id = datas.seller_id;
    const modified_platform_name = datas.platform_name;

    try {
      // seller 컬렉션에서 해당 문서 가져오기
      const docRef = db.collection("seller").doc(input_seller_id);
      const doc = await docRef.get();

      if (doc.exists) {
        // 문서가 존재하는 경우 platform_name 수정
        await docRef.update({
          platform_name: modified_platform_name,
        });

        return 1; // 성공
      } else {
        console.log("문서가 존재하지 않습니다.");
        return -1; // 실패
      }
    } catch (error) {
      console.error("데이터 수정 실패:", error);
      return -1; // 실패
    }
  },

  // seller 데이터 삭제하는 함수
  async delete(datas) {
    // 접근 db table name : seller
    // seller db table column : seller_id[pk], platform_name

    // input_seller_id : 판매자 아이디
    const input_seller_id = datas.seller_id;
    
    try {
      // seller 컬렉션에서 해당 문서 삭제
      await db.collection("seller").doc(input_seller_id).delete();
      return 1; // 성공
    } catch (error) {
      console.error("데이터 삭제 실패:", error);
      return -1; // 실패
    }
  }

}