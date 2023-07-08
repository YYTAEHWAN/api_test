// Table consumer {
//         consumer_id varchar [pk]
//         consumer_nickname varchar
// }

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝

const admin = require("firebase-admin");
const db = admin.firestore();


// const consumerDB = {
module.exports = {
    // consumer 데이터 생성하는 함수
    async createConsumer(datas) {
        // 접근 db table name: consumer
        // consumer db table column: consumer_id[pk], consumer_nickname
      
        // consumerId : 소비자 아이디
        // consumerNickname : 소비자 별명
        const consumerId = datas.consumer_id;
        const consumerNickname = datas.consumer_nickname;

        const data = {
          consumer_id: consumerId,
          consumer_nickname: consumerNickname,
        };
      
        try {
          // consumer 컬렉션에 새로운 문서 생성
          await db.collection('consumer').doc(consumerId).set(data);
          return 1; // 성공
        } catch (error) {
            console.error('데이터 생성 실패:', error);
          return -1; // 실패
        }
    },
      
    // consumer name 읽어오는 함수
    async readConsumer(datas) {
        // 접근 db table name: consumer
        // consumer db table column: consumer_id[pk], consumer_nickname
    
        // consumerId : 소비자 아이디
        const consumerId = datas.consumer_id;
        console.log("consumerId : " + consumerId)
        console.log("datas.consumer_id : " + datas.consumer_id);
        try {
            console.log(consumerId);
            const docRef = await db.collection('consumer').doc(consumerId).get();
            if (docRef.exists) {
                const data = docRef.data();
                return data.consumer_nickname; // 소비자 별명 리턴
            } else {
                console.error('문서가 존재하지 않음:' + consumerId);
                return null; // 
            }
        } catch (error) {
            console.error('데이터 읽기 실패:', error);
            return null;
        }
    },
      
    // consumer name 수정하는 함수
    async updateConsumer(datas) {
        // 접근 db table name: consumer
        // consumer db table column: consumer_id[pk], consumer_nickname
    
        // consumerId : 소비자 아이디
        // consumerNickname : 소비자 별명
        const consumerId = datas.consumer_id;
        const consumerNickname = datas.consumer_nickname;

        try {
            await db.collection('consumer').doc(consumerId).update({
                consumer_nickname: consumerNickname,
            });
    
            return 1; // 성공
        } catch (error) {
            console.error('데이터 수정 실패:', error);
            return -1; // 실패
        }
    },
      
    // consumer 데이터 삭제하는 함수
    async deleteConsumer(datas) {
        // 접근 db table name: consumer
        // consumer db table column: consumer_id[pk], consumer_nickname
    
        // consumerId : 소비자 아이디
        const consumerId = datas.consumer_id;

        try {
            await db.collection('consumer').doc(consumerId).delete();
    
            return 1; // 성공
        } catch (error) {
            console.error('데이터 삭제 실패:', error);
            return -1; // 실패
        }
    }
}