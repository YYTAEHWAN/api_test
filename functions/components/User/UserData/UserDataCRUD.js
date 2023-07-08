
// Table user_data {
//     id varchar [pk]
//     password varchar
  
//     // 소비자인지 아닌지도 확인해서 페이지 다르게 보여줘야하니까
//     consumer_or_not int // 1이면 소비자, 0이면 셀러
  
//     email varchar
//     real_name varchar
//     phone_number varchar
//     resident_registration_number varchar
  
  
//     // 각 사용자를 아이디 말고 번호로 구분하면 쉬울 것 같아서 일단 넣어봤다가
//     // 그냥 빼버렸어. 뭐 시스템이 작으니까 int 쓰면서 속도 높일 필요는 없잖아 그지?
//     // unique_number int
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

module.exports = {
  // user_data 데이터 생성하는 함수
  async createUserData(datas) {
    // 접근 db table name : user_data
    // user_data db table column : id[pk], password, consumer_or_not, email, real_name, phone_number, resident_registration_number

    // id : 사용자가 입력한 아이디
    // password : 사용자가 입력한 비밀번호
    // consumer_or_not : 소비자(1)인지 판매자(0)인지 확인하는 변수
    // email : 사용자가 입력한 이메일
    // real_name : 사용자가 입력한 실명
    // phone_number : 사용자가 입력한 전화번호
    // resident_registration_number : 사용자가 입력한 주민등록번호
    
    // const user_data = {
    //   id: id,
    //   password: password,
    //   consumer_or_not: consumer_or_not,
    //   email: email,
    //   real_name: real_name,
    //   phone_number: phone_number,
    //   resident_registration_number: resident_registration_number,
    // };

    console.log(datas)
    const id = datas.id;
    try {
      // user_data 컬렉션에서 해당 문서 가져오기
      const doc = await db.collection("user_data").doc(id).get();
      if (doc.exists) {
        // 문서가 존재하는 경우
        console.log("이미 존재하는 아이디입니다.");
        return -1; // 실패
      }

      // user_data 컬렉션에 새로운 문서 생성
      await db.collection("user_data").doc(id).set(datas);
      return 1; // 성공

    } catch (error) {
      console.error("데이터 읽기 실패:", error);
      return -1; // 실패
    }
  },

  // user_data 데이터 읽어오는 함수
  async readUserData(datas) {
    // 접근 db table name : user_data
    // user_data db table column : id[pk], password, consumer_or_not, email, real_name, phone_number, resident_registration_number

    // id : 사용자가 입력한 아이디
    const id = datas.id;   

    console.log("db 함수 readUserData 가 실행되었습니다.")
    
    try {
        // user_data 컬렉션에서 해당 문서 가져오기
        const doc = await db.collection("user_data").doc(id).get();
        if (doc.exists) {
          // 문서가 존재하는 경우 데이터 반환
          return doc.data();
        } else {
          console.log("문서가 존재하지 않습니다.");
          return null;
        }
      } catch (error) {
        console.error("데이터 읽기 실패:", error);
        return null;
      }

    // return result_object; // object = {password, consumer_or_not, email, real_name, phone_number, resident_registration_number} 리턴
  },

  // user_data 데이터 수정하는 함수
  async updateUserData(datas) {
    // 접근 db table name : user_data
    // user_data db table column : id[pk], password, consumer_or_not, email, real_name, phone_number, resident_registration_number

    // id : 사용자가 입력한 아이디[pk]

    // password : 사용자가 입력한 비밀번호
    // email : 사용자가 입력한 이메일
    // real_name : 사용자가 입력한 실명
    // phone_number : 사용자가 입력한 전화번호
    const input_id = datas.id;
    const modified_user_datas = {
      password: datas.password,
      email: datas.email,
      real_name: datas.real_name,
      phone_number: datas.phone_number,
    };
    try {
        // user_data 컬렉션에서 해당 문서 가져오기
        const docRef = db.collection("user_data").doc(input_id);
        const doc = await docRef.get();
    
        if (doc.exists) {
          // 문서가 존재하는 경우 데이터 수정
          await docRef.update(modified_user_datas);
    
          // 수정된 데이터 가져오기
          const updatedDoc = await docRef.get();
          return updatedDoc.data();
        } else {
          console.log("문서가 존재하지 않습니다.");
          return null;
        }
      } catch (error) {
        console.error("데이터 수정 실패:", error);
        return null;
      }

    // return result_object; // object = {password, email, real_name, phone_number} 리턴
  },

  // user_data 데이터 삭제하는 함수
  async deleteUserData(datas) {
    // 접근 db table name : user_data
    // user_data db table column : id[pk], password, consumer_or_not, email, real_name, phone_number, resident_registration_number

    // id : 사용자가 입력한 아이디

    const id = datas.id;
    try {
        // user_data 컬렉션에서 해당 문서 삭제
        await db.collection("user_data").doc(id).delete();
        return 1; // 성공
      } catch (error) {
        console.error("데이터 삭제 실패:", error);
        return -1; // 실패
      }

    // return result; // 1: 성공, -1: 실패
  }
}
