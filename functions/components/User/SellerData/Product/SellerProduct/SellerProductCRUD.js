// // 판매자들의 id와 판매 제품 idx를 매칭해주는 테이블
// Table seller_products {
//     seller_id varchar [pk]
//     // 논의 필요한 부분
//     // 제품에 붙는 번호는 그냥 행의 번호로 할까?
//     product_info_idx int [pk]
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

// const sellerProductsDB = {
module.exports = {
  // seller_products 데이터 생성하는 함수
  async create(datas) {
    // 접근 db table name : seller_products
    // seller_products db table column : seller_id[pk], product_info_idx[pk]

    // sellerId : 로그인 확인이 완료된 아이디(다른 사람이 판매자의 id로 데이터를 집어넣을 수 없어야 하는 기능 필요 - 이건 나중에 추가)
    // productInfoIdx : 판매하려는 제품의 idx
    const seller_id = datas.seller_id;
    const product_info_idx = datas.product_info_idx;

    const sellerProductsData = {
      seller_id: seller_id,
      product_info_idx: product_info_idx,
    };

    const docName = `${seller_id}_product_info_idx${product_info_idx}`;

    try {
      // seller_products 컬렉션에 새로운 문서 생성
      await db.collection("seller_products").doc(docName).set(sellerProductsData);
      return 1; // 성공
    } catch (error) {
      console.error("데이터 생성 실패:", error);
      return -1; // 실패
    }
  },
  
  // seller_products 데이터(판매자 id, 판매 제품 idx) 읽어오는 함수
  async read(datas) {
    // 접근 db table name : seller_products
    // seller_products db table column : seller_id[pk], product_info_idx[pk]

    // sellerId : 로그인 확인이 완료된 아이디
    // productInfoIdx : 판매하려는 제품의 idx

    const seller_id = datas.seller_id;
    const product_info_idx = datas.product_info_idx;    

    const docName = `${seller_id}_product_info_idx${product_info_idx}`;

    try {
      const docRef = await db.collection("seller_products").doc(docName).get();
      if (docRef.exists) {
        const data = docRef.data();
        return data; // 문서 데이터 반환
      } else {
        console.log("문서가 존재하지 않습니다.");
        return -1;
      }
    } catch (error) {
      console.error("데이터 읽기 실패:", error);
      return -1;
    }
  },
  
  // seller_products의 제품(product_info_idx) 삭제 함수
  async delete(datas) {
    // 접근 db table name : seller_products
    // seller_products db table column : seller_id[pk], product_info_idx[pk]

    // sellerId : 로그인 확인이 완료된 아이디
    // productInfoIdx : 삭제할 제품의 idx

    const seller_id = datas.seller_id;
    const product_info_idx = datas.product_info_idx;

    const docName = `${seller_id}_product_info_idx${product_info_idx}`;

    try {
      const docRef = db.collection("seller_products").doc(docName);
      const doc = await docRef.get();

      if (doc.exists) {
          console.log("doc : " + doc);
          console.log("doc.data() : " + doc.data());
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
