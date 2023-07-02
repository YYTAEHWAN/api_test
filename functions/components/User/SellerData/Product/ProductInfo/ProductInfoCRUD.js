// // 판매자의 제품 이름, 가격을 저장하는 테이블
// Table product_info {
//     product_info_idx int [increment, primary key]
//      // 제품의 이름
//     product_name varchar
//     // 제품의 하나당 원화 가격
//     product_won_price_per int
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


module.exports =   {
  // product_info 데이터 생성하는 함수
  async create(datas) {
    // 접근 db table name : product_info
    // product_info db table column : product_info_idx[pk], product_name, product_won_price_per

    // productName : 제품 이름
    // productWonPricePer : 제품 하나당 원화 가격
    // productName, productWonPricePer
    try {
      const productName = datas.product_name;
      const productWonPricePer = datas.product_won_price_per;
      
      const productInfoRef = db.collection("product_info");

      // product_info 컬렉션의 행 개수를 세기 위해 모든 문서를 가져옴
      const snapshot = await productInfoRef.get();
      const rowCount = snapshot.size;
      console.log("새로운 데이터를 생성하기 전 rowCount:", rowCount);

      // product_info 컬렉션의 행 개수 + 1 = 새로운 문서의 product_info_idx 값
      const newIdxValue = rowCount+1;
      // 새로운 문서의 product_info_idx 값을 생성
      const productInfoIdx = `product_info_idx${newIdxValue}`;

      // 새로운 문서 데이터
      const productInfoData = {
        product_name: productName,
        product_won_price_per: productWonPricePer,
      };

      // product_info 컬렉션에 새로운 문서 생성
      await productInfoRef.doc(productInfoIdx).set(productInfoData);

      return newIdxValue; // 성공: product_info_idx 문자열의 숫자값만 리턴
    } catch (error) {
      console.error("데이터 생성 실패:", error);
      return -1; // 실패
    }
  },
  
  // product_info 데이터(제품 이름, 제품 하나당 원화 가격) 읽어오는 함수
  async read(datas) {
    // 접근 db table name : product_info
    // product_info db table column : product_info_idx[pk], product_name, product_won_price_per

    // productInfoIdx : 제품 idx
    // ex) productInfoIdx = "productInfoIdx24"
    const productInfoIdx = datas.product_info_idx;

    const docName = `product_info_idx${productInfoIdx}`;

    try {
      // product_info 컬렉션에서 해당 문서 가져오기
      const doc = await db.collection("product_info").doc(docName).get();
      if (doc.exists) {
        // 문서가 존재하는 경우 데이터 반환
        return doc.data();
      } else {
        console.log("데이터를 찾을 수 없음");
        return null;
      }
    } catch (error) {
      console.error("데이터 읽기 실패:", error);
      return null;
    }
  },
  
  // product_info 데이터(제품 이름, 제품 하나당 원화 가격) 수정하는 함수
  async update(datas) {
    // 접근 db table name : product_info
    // product_info db table column : product_info_idx[pk], product_name, product_won_price_per

    // productInfoIdx : 제품 idx
    // modifiedProductName : 수정된 제품의 이름
    // modifiedProductWonPricePer : 수정된 제품 하나당 원화 가격

    const productInfoIdx = datas.product_info_idx;
    const modifiedProductName = datas.product_name;
    const modifiedProductWonPricePer = datas.product_won_price_per;

    const docName = `product_info_idx${productInfoIdx}`;

    try {
      // product_info 컬렉션에서 해당 문서 가져오기
      const docRef = db.collection("product_info").doc(docName);
      const doc = await docRef.get();

      if (doc.exists) {
        // 문서가 존재하는 경우 데이터 수정
        await docRef.update({
          product_name: modifiedProductName,
          product_won_price_per: modifiedProductWonPricePer,
        });

        // 수정된 데이터 가져오기
        const updatedDoc = await docRef.get();
        return updatedDoc.data();
      } else {
        console.log("데이터를 찾을 수 없음");
        return null;
      }
    } catch (error) {
      console.error("데이터 수정 실패:", error);
      return null;
    }
  },
  
  // product_info 데이터를 삭제하는 함수
  async delete(datas) {
    // 접근 db table name : product_info
    // product_info db table column : product_info_idx[pk], product_name, product_won_price_per

    // productInfoIdx : 제품 idx
    const productInfoIdx = datas.product_info_idx;

    const docName = `product_info_idx${productInfoIdx}`;

    try {
      // product_info 컬렉션에서 해당 문서 삭제
      await db.collection("product_info").doc(docName).delete();
      return 1; // 성공
    } catch (error) {
      console.error("데이터 삭제 실패:", error);
      return -1; // 실패
    }
  }
}