
const userDataDB = require("../../User/UserData/UserDataCRUD");

// login 함수

module.exports = {
    async Login(datas) {
      // 접근 db table name : user_data
      // user_data db table column : id[pk], password, consumer_or_not, email, real_name, phone_number, resident_registration_number
    
      // input_user_id : 사용자가 입력한 아이디
      // input_user_pwd : 사용자가 입력한 비밀번호
    
      const input_user_id = datas.input_user_id;
      const input_user_pwd = datas.input_user_pwd;
      
      const id_data = {
        id: input_user_id
      };
      
      const result = await userDataDB.readUserData(id_data);
      // console.log("Login 함수 - result.id : ", result.id);
      // console.log("Login 함수 - result.password : ", result.password);
      // console.log("Login 함수 - result.consumer_or_not : ", result.consumer_or_not);
      // console.log("Login 함수 - input_user_id : ", input_user_id);
      // console.log("Login 함수 - input_user_pwd : ", input_user_pwd);

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
    },


    // login 함수인데 이제 사용자, 판매자 데이터 리턴을 곁들인...
    // Login 함수의 리턴값이 1이면 consumer DB 접근, 0이면 seller DB 접근
    async LoginReturnData(datas) {
      // result 값이 1이면 consumer DB 접근, 0이면 seller DB 접근
      // result 값이 -1이면 로그인 실패

      // 접근 db table name : seller, consumer
      // seller db table column : seller_id[pk], seller_platform_name
      // consumer db table column : consumer_id[pk], consumer_nickname
      
      // input_user_id : 사용자가 입력한 아이디
      // input_user_pwd : 사용자가 입력한 비밀번호
      const input_user_id = datas.input_user_id;
      const input_user_pwd = datas.input_user_pwd;
      // console.log("LoginReturnData 함수 - input_user_id : " + input_user_id);
      // console.log("LoginReturnData 함수 - input_user_pwd : " + input_user_pwd);
      const id_data = {
        id: input_user_id
      };

      const loginData = await userDataDB.readUserData(id_data);
      if (input_user_id === loginData.id && input_user_pwd === loginData.password) {
        if (loginData.consumer_or_not === 1) {
          // 소비자 로그인 성공
          const consumer_data = await userDataDB.readUserData(id_data);
          console.log("LoginReturnData 함수 - 소비자 로그인 성공 consumer_data 리턴")
          console.log(consumer_data);
          return consumer_data;
        } else if (loginData.consumer_or_not === 0) {
          // 판매자 로그인 성공
          const seller_data = await userDataDB.readUserData(id_data);
          console.log("LoginReturnData 함수 - 판매자 로그인 성공 seller_data 리턴")
          console.log(seller_data);
          return seller_data;
        }
      } else {
        console.log("LoginReturnData 함수 - 로그인 실패 -1 리턴");
        return -1;
      }
  }
}
