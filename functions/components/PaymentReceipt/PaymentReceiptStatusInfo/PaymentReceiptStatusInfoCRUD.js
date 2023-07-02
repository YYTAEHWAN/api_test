

// Table payment_receipt_status_info {
//     // 결제 영수증 식별 idx 칼럼
//     payment_receipt_idx int [increment, pk]
  
//     // 해당 영수증이 발행된 후 상태가 "테이블 만드는 중(0)" 인지 "결제 중(1)" 인지, // 결제 전 관련 테이블 모두 완성 상태 번호 = "0011"
//     // 아니면 "결제 완료(999)" 인지, "환불 요청(2)" 인지, "환불 완료(3)" 인지, "결제 실패(-1)" 인지
//     // 처럼 결제의 상태를 알려주는 payment_status 칼럼
//     payment_status varchar
//     // 결제 시작 시점을 알려주는 칼럼
//     payment_start_time varchar
//     // 결제 완료 시점을 알려주는 칼럼
//     payment_end_time varchar
//   }

const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = {
    // 결제 영수증 상태 정보를 저장하는 함수
    async create() {
        // 접근 db table name: payment_receipt_status_info
        // payment_receipt_status_info db table column: payment_receipt_idx[increment, pk], payment_status, payment_start_time, payment_end_time
    
        // paymentReceiptIdx: 결제 영수증 식별 idx - 자동 생성

        // 해당 영수증이 발행된 후 상태가 "테이블 만드는 중(0)" 인지 "결제 중(1)" 인지, // 결제 전 관련 테이블 모두 완성 상태 번호 = "0011"
        // 아니면 "결제 완료(999)" 인지, "환불 요청(2)" 인지, "환불 완료(3)" 인지, "결제 실패(-1)" 인지
        // paymentStatus: 결제 상태 이건 당연히 0에서부터 시작

        // paymentStartTime: 결제 시작 시점 - 자연생성
        // paymentEndTime: 결제 완료 시점 - 나중 첨가

        try {
            const statusInfoRef = db.collection("payment_receipt_status_info");

            // payment_receipt_status_info 컬렉션의 행 개수를 세기 위해 모든 문서를 가져옴
            const snapshot = await statusInfoRef.get();
            const rowCount = snapshot.size;
            console.log("statusInfoRef - 새로운 데이터를 생성하기 전 rowCount:", rowCount);

            // product_info 컬렉션의 행 개수 + 1 = 새로운 문서의 product_info_idx 값
            const paymentReceiptIdx = rowCount+1;

            // 데이터가 이미 존재하는지 확인
            const doc = await db.collection('payment_receipt_status_info').doc(String(paymentReceiptIdx)).get();
    
            if (doc.exists) {
                console.log('이미 데이터가 존재합니다.');
                return -1; // 실패
            } else {
                // payment_receipt_status_info 컬렉션에 새로운 문서 생성
                // 데이터 만들기
                const beginingData = {
                    payment_receipt_idx: paymentReceiptIdx,
                    payment_status: 0, // 영수증 만드는 중(초기화 중)
                    payment_start_time: new Date().toLocaleString(),
                    payment_end_time: null
                };
                await db.collection('payment_receipt_status_info').doc(String(paymentReceiptIdx)).set(beginingData);
                console.log('데이터 생성 성공');
                
                return paymentReceiptIdx; // 성공하면 결제 영수증 식별 idx 반환
            }
        } catch (error) {
            console.error('데이터 생성 실패:', error);
            return -1; // 실패
        }
    },
    
    // 결제 영수증 상태 정보를 읽어오는 함수
    async read(datas) {
        // 접근 db table name: payment_receipt_status_info
        // payment_receipt_status_info db table column: payment_receipt_idx[increment, pk], payment_status, payment_start_time, payment_end_time
    
        // paymentReceiptIdx: 결제 영수증 식별 idx
        const paymentReceiptIdx = datas.payment_receipt_idx;

        try {
            // 데이터가 이미 존재하는지 확인
            const doc = await db.collection('payment_receipt_status_info').doc(String(paymentReceiptIdx)).get();
    
            if (doc.exists) {
                const resultObject = doc.data();
                console.log('데이터 읽기 성공');
                return resultObject; // { paymentReceiptIdx, payment_status, payment_start_time, payment_end_time }
            } else {
                console.log('해당 데이터가 없습니다.');
                return null;
            }
        } catch (error) {
            console.error('데이터 읽기 실패:', error);
            return null;
        }
    },
    
    // 결제 영수증 상태 정보를 수정하는 함수
    async updateOnlyStatus(datas) {
        // 접근 db table name: payment_receipt_status_info
        // payment_receipt_status_info db table column: payment_receipt_idx[increment, pk], payment_status, payment_start_time, payment_end_time
    
        // paymentReceiptIdx: 결제 영수증 식별 idx
        // modifiedUpdatedStatus: 수정된 결제 상태
        const paymentReceiptIdx = datas.payment_receipt_idx;
        const modifiedUpdatedStatus = datas.payment_status;

        try {
            // 데이터가 이미 존재하는지 확인
            const doc = await db.collection('payment_receipt_status_info').doc(String(paymentReceiptIdx)).get();
    
            if (doc.exists) {
                // 수정하려는 데이터가 존재한다면
                await db.collection('payment_receipt_status_info').doc(String(paymentReceiptIdx)).update({
                    payment_status: modifiedUpdatedStatus
                });
                console.log('데이터 수정 성공');
                return 1; // 성공
            } else {
                // 수정하려는 데이터가 존재하지 않는다면
                console.log('수정하려는 데이터가 존재하지 않습니다.');
                return -1; // 실패
            }
        } catch (error) {
            console.error('데이터 수정 실패:', error);
            return -1; // 실패
        }
    },

    // 결제 영수증의 결제 시작, 완료 시점을 수정하는 함수 // 혹시 몰라서 만들어놓음
    // 안 쓸 듯
    async updateTime(paymentReceiptIdx, modifiedStartTime, modifiedEndTime) {
        // 접근 db table name: payment_receipt_status_info
        // payment_receipt_status_info db table column: payment_receipt_idx[increment, pk], payment_status, payment_start_time, payment_end_time
    
        // paymentReceiptIdx: 결제 영수증 식별 idx
        // modifiedUpdatedStatus: 수정된 결제 상태
    
        try {
            // 데이터가 이미 존재하는지 확인
            const doc = await db.collection('payment_receipt_status_info').doc(String(paymentReceiptIdx)).get();
    
            if (doc.exists) {
                // 수정하려는 데이터가 존재한다면
                await db.collection('payment_receipt_status_info').doc(String(paymentReceiptIdx)).update({
                    payment_status: doc.data().payment_status,
                    payment_start_time: modifiedStartTime,
                    payment_end_time: modifiedEndTime
                });
                console.log('시간 데이터 수정 성공');
                return 1; // 성공
            } else {
                // 수정하려는 데이터가 존재하지 않는다면
                console.log('수정하려는 데이터가 존재하지 않습니다.');
                return -1; // 실패
            }
        } catch (error) {
            console.error('데이터 수정 실패:', error);
            return -1; // 실패
        }
    },

    // 결제 종료 시 종료된 시간을 기입하고, 해당 paymentReceiptIdx의 결제 상태(완료:999 or 실패:-1)를 바꾸는 함수
    async updatePaymentEnd(datas) {
        // 접근 db table name: payment_receipt_status_info
        // payment_receipt_status_info db table column: payment_receipt_idx[increment, pk], payment_status, payment_start_time, payment_end_time
    
        // paymentReceiptIdx: 결제 영수증 식별 idx
        const paymentReceiptIdx = datas.payment_receipt_idx;
        const paymentStatus = datas.payment_status;

        try {
            // 데이터가 이미 존재하는지 확인
            const doc = await db.collection('payment_receipt_status_info').doc(String(paymentReceiptIdx)).get();
    
            if (doc.exists) {
                // 수정하려는 데이터가 존재한다면
                await db.collection('payment_receipt_status_info').doc(String(paymentReceiptIdx)).update({
                    payment_status: paymentStatus, // 결제 완료:999, 실패:-1
                    payment_end_time: new Date().toLocaleString()
                });
                // console.log('updatePaymentEnd 실행 성공');
                return 1; // 성공
            } else {
                // 수정하려는 데이터가 존재하지 않는다면
                console.log('끝내려하는 결제 정보(paymentReceiptIdx)가 존재하지 않습니다.');
                return -1; // 실패
            }
        } catch (error) {
            console.error('결제 종료 함수 실행 실패:', error);
            return -1; // 실패
        }
    },

    // 결제 영수증 상태 정보를 삭제하는 함수
    async delete(datas) {
        // 접근 db table name: payment_receipt_status_info
        // payment_receipt_status_info db table column: payment_receipt_idx[increment, pk], payment_status, payment_start_time, payment_end_time
    
        // paymentReceiptIdx: 결제 영수증 식별 idx
        const paymentReceiptIdx = datas.payment_receipt_idx;

        try {
            // 데이터가 이미 존재하는지 확인
            const doc = await db.collection('payment_receipt_status_info').doc(String(paymentReceiptIdx)).get();
    
            if (doc.exists) {
                // 삭제하려는 데이터가 존재한다면
                await db.collection('payment_receipt_status_info').doc(String(paymentReceiptIdx)).delete();
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
