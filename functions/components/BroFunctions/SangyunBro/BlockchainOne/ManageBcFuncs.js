
const sellersChosenMainBlockchainDB = require("../../../User/SellerData/Chosen/Blockchain/SellersChosenMainBlockchainCRUD");
const mainBlockchainListDB = require("../../../NangNangServe/MainBlockchainList/MainBlockchainListCRUD");

// 4. 블록체인 관리
// 4-1. 낭낭에서 사용 가능한 블록체인 조회
module.exports = {

  async readMainBlockchainList() {
    try {
      const result = await mainBlockchainListDB.read();
      console.log("result: ", result);
      return result; // 사용 가능한 블록체인 번호(idx) 리스트 리턴
    } catch (error) {
      console.error(error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  },
  // 4-2. sellersChosenMainBlockchainDB에 선택한 블록체인 등록
  async createSellersChosenMainBlockchain(datas) {
    const input_seller_id = datas.seller_id;
    const input_main_blockchain_idx = datas.main_blockchain_idx;

    try {
      const result = await sellersChosenMainBlockchainDB.create(datas);
      return result; // 1: 성공, -1: 실패
    } catch (error) {
      console.error(error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  }
}
