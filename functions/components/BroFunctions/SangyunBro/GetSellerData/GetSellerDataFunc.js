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

const userDataDB = require("../../../User/UserData/UserDataCRUD");
const sellerDB = require("../../../User/SellerData/SellerCRUD");


module.exports = {
  
  // 1. 판매자 정보(내정보) 가져오기
  async getSellerData(datas) {
    // 접근 db table name : user_data, seller
    // user_data db table column : id[pk], password, consumer_or_not, email, real_name, phone_number, resident_registration_number
    // seller db table column : seller_id[pk], seller_platform_name

    // seller_id : 사용자가 입력한 아이디
    const seller_id = datas.seller_id;
    const user_data_for_read = {
      id: seller_id,
    }
    try {
      // 1단계 : user_data db에서 정보 읽어오기
      const userData = await userDataDB.readUserData(user_data_for_read);

      const sellerDataObject = {
        id: userData.id,
        password: userData.password,
        consumer_or_not: userData.consumer_or_not,
        real_name: userData.real_name,
        email: userData.email,
        phone_number: userData.phone_number,
        resident_registration_number: userData.resident_registration_number,
      };

      if (sellerDataObject.consumer_or_not === 0) {
        // seller라면 seller db에서 정보 읽어오기
        const sellerDataPlatformName = await sellerDB.readPlatformName(datas);
        if (sellerDataPlatformName !== -1) {
          sellerDataObject.platform_name = sellerDataPlatformName;
          console.log("판매자 정보 조회 완료");
          return sellerDataObject; // 성공적으로 seller 사용자 정보 조회 완료
        } else {
          return -1; // 사용자 정보 조회 실패
        }
      } else {
        console.log("판매자가 아닙니다.");
        return -1; // 사용자 정보 조회 실패
      }
    } catch (error) {
      console.error("판매자 정보 조회 실패:", error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  }

}