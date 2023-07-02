// // 결제의 코인가격과 거래 주소 정보 테이블
// Table payment_receipt_price_address_info {
//     // 결제 영수증 식별 idx 칼럼
//     payment_receipt_idx int [pk]
    
//     // 원화 총 결제 금액
//     // payment_receipt_multiple_products_info 를 통해 계산
//     total_won_price int
//     // 코인 총 결제 금액 ex) 0.00196 (ETH의 경우)
//     total_coin_price int
//     // 발신자 id
//     sender_consumer_id varchar
//     // 수신자 id
//     receiver_seller_id varchar
//     // 발신자 지갑 주소
//     sender_wallet_address varchar
//     // 수신자 지갑 주소
//     receiver_wallet_address varchar
//   }

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝


// // 이런 형식으로 넣고 빼고 리턴하자
// let priceAddressInfo = {
//     payment_receipt_idx: 1,
//     total_coin_price: 0.00196,
//     sender_consumer_id: "consumer1",
//     receiver_seller_id: "seller1",
//     sender_wallet_address: "0x123...",
//     receiver_wallet_address: "0x456..."
// };

const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = {

    // payment_receipt_price_address_info 데이터 생성하는 함수
    async create(datas) {
        // 접근 db table name: payment_receipt_price_address_info
        // payment_receipt_price_address_info db table column: payment_receipt_idx[pk], total_coin_price, sender_consumer_id, receiver_seller_id, sender_wallet_address, receiver_wallet_address

        // payment_receipt_idx : 결제 영수증 식별 idx
        // total_coin_price : 코인 총 결제 금액 ex) 0.00196 (ETH의 경우)
        // sender_consumer_id : 발신자 id
        // receiver_seller_id : 수신자 id
        // sender_wallet_address : 발신자 지갑 주소
        // receiver_wallet_address : 수신자 지갑 주소
        
        
        try {
            // 데이터가 이미 존재하는지 확인
            const doc = await db.collection('payment_receipt_price_address_info').doc(String(datas.payment_receipt_idx)).get();
            if (doc.exists) {
                console.log('이미 데이터가 존재합니다.');
                return -1; // 실패
            } else {
                // payment_receipt_price_address_info 컬렉션에 새로운 문서 생성
                await db.collection('payment_receipt_price_address_info')
                .doc(String(datas.payment_receipt_idx))
                .set(datas);
                // console.log("PriceAddressInfoDB.create 정상종료");
                return 1; // 성공
            }
        } catch (error) {
            console.log("PriceAddressInfoDB.create 비정상 종료");
            console.error('데이터 생성 실패:', error);
            return -1; // 실패
        }
    },

    // payment_receipt_price_address_info 데이터 읽어오는 함수
    async read(datas) {
        // 접근 db table name: payment_receipt_price_address_info
        // payment_receipt_price_address_info db table column: payment_receipt_idx[pk], total_coin_price, sender_consumer_id, receiver_seller_id, sender_wallet_address, receiver_wallet_address

        // payment_receipt_idx : 결제 영수증 식별 idx
        const payment_receipt_idx = datas.payment_receipt_idx;

        try {
            // 데이터가 이미 존재하는지 확인
            const doc = await db.collection('payment_receipt_price_address_info').doc(String(payment_receipt_idx)).get();

            if (doc.exists) {
                const resultObject = doc.data();
                return resultObject; // { payment_receipt_idx, total_coin_price, total_won_price, sender_consumer_id, receiver_seller_id, sender_wallet_address, receiver_wallet_address }
            } else {
                console.log('해당 데이터가 없습니다.');
                return null;
            }
        } catch (error) {
            console.error('데이터 읽기 실패:', error);
            return null;
        }
    },

    // payment_receipt_price_address_info 데이터 수정하는 함수
    async update(datas) {
        // 접근 db table name: payment_receipt_price_address_info
        // payment_receipt_price_address_info db table column: payment_receipt_idx[pk], total_coin_price, sender_consumer_id, receiver_seller_id, sender_wallet_address, receiver_wallet_address

        // payment_receipt_idx : 결제 영수증 식별 idx
        // total_coin_price : 코인 총 결제 금액 ex) 0.00196 (ETH의 경우)
        // sender_consumer_id : 발신자 id
        // receiver_seller_id : 수신자 id
        // sender_wallet_address : 발신자 지갑 주소
        // receiver_wallet_address : 수신자 지갑 주소

        // const data = {
        //     payment_receipt_idx : datas.payment_receipt_idx,
        //     total_coin_price : datas.total_coin_price,
        //     total_won_price : datas.total_won_price,
        //     sender_consumer_id : datas.sender_consumer_id,
        //     receiver_seller_id : datas.receiver_seller_id,
        //     sender_wallet_address : datas.sender_wallet_address,
        //     receiver_wallet_address : datas.receiver_wallet_address
        // }
        try {
            // 데이터가 이미 존재하는지 확인
            const doc = await db.collection('payment_receipt_price_address_info').doc(String(datas.payment_receipt_idx)).get();

            if (doc.exists) {
                // 수정하려는 데이터가 존재한다면
                await db.collection('payment_receipt_price_address_info')
                .doc(String(datas.payment_receipt_idx))
                .update(datas);
                console.log('데이터 수정 성공');
                return 1; // 성공
            } else {
                // 수정하려는 데이터가 존재하지 않는다면
                console.log('수정하려는 데이터가 존재하지 않습니다.');
                console.log("PriceAddressInfoDB.update 실패");
                return -1; // 실패
            }
        } catch (error) {
            console.error('데이터 수정 실패:', error);
            return -1; // 실패
        }
    },

    // payment_receipt_price_address_info 데이터 삭제하는 함수
    async delete(datas) {
        // 접근 db table name: payment_receipt_price_address_info
        // payment_receipt_price_address_info db table column: payment_receipt_idx[pk], total_coin_price, sender_consumer_id, receiver_seller_id, sender_wallet_address, receiver_wallet_address

        // payment_receipt_idx : 결제 영수증 식별 idx
        const payment_receipt_idx = datas.payment_receipt_idx;

        try {
            // 데이터가 이미 존재하는지 확인
            const doc = await db.collection('payment_receipt_price_address_info').doc(String(payment_receipt_idx)).get();

            if (doc.exists) {
                // 삭제하려는 데이터가 존재한다면
                await db.collection('payment_receipt_price_address_info').doc(String(payment_receipt_idx)).delete();
                console.log('데이터 삭제 성공');
                return 1; // 성공
            } else {
                console.log('삭제하려는 데이터가 존재하지 않습니다.');
                return -1; // 실패
            }
        } catch (error) {
            console.error('데이터 삭제 실패:', error);
            return -1; // 실패
        }
    }
};
