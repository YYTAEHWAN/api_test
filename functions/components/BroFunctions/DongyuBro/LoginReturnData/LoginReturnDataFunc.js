import { userDataDB } from "../../../User/UserData/UserDataCRUD.js";

// login 함수
async function Login(input_user_id, input_user_pwd) {
    // 접근 db table name : user_data
    // user_data db table column : id[pk], password, consumer_or_not, email, real_name, phone_number, resident_registration_number
  
    // input_user_id : 사용자가 입력한 아이디
    // input_user_pwd : 사용자가 입력한 비밀번호
  
    const result = await userDataDB.readUserData(input_user_id);
    if (input_user_id === result.id && input_user_pwd === result.password) {
      if (result.consumer_or_not === 1) {
        console.log("Login 함수 - 소비자 로그인 성공 1 리턴");
        return 1; // 소비자 로그인 성공
      } else if (result.consumer_or_not === 0) {
        console.log("Login 함수 - 판매자 로그인 성공 0 리턴");
        return 0; // 판매자 로그인 성공
      }
    } else {
      console.log("Login 함수 - 로그인 실패 -1 리턴");
      return -1; // 로그인 실패
    }
  }


// login 함수인데 이제 사용자, 판매자 데이터 리턴을 곁들인...
// Login 함수의 리턴값이 1이면 consumer DB 접근, 0이면 seller DB 접근
async function LoginReturnData(input_user_id, input_user_pwd) {
    // result 값이 1이면 consumer DB 접근, 0이면 seller DB 접근
    // result 값이 -1이면 로그인 실패

    // 접근 db table name : seller, consumer
    // seller db table column : seller_id[pk], seller_platform_name
    // consumer db table column : consumer_id[pk], consumer_nickname
    
    // input_user_id : 사용자가 입력한 아이디
    // input_user_pwd : 사용자가 입력한 비밀번호
    
    const result = await Login(input_user_id, input_user_pwd);
    if (result === 1) {
        // consumer DB 접근
        const consumer_data = await userDataDB.readUserData(input_user_id);
        console.log("LoginReturnData 함수 - consumer_data 리턴")
        return consumer_data;
    }
    else if (result === 0) {
        // seller DB 접근
        const seller_data = await userDataDB.readUserData(input_user_id);
        console.log("LoginReturnData 함수 - seller_data 리턴")
        return seller_data;
    }
    else {
        // 로그인 실패
        console.log("LoginReturnData 함수 - 로그인 실패 -1 리턴");
        return -1;
    }

}

export {LoginReturnData};