
const sellersChosenMainBlockchainDB = require("../../../User/SellerData/Chosen/Blockchain/SellersChosenMainBlockchainCRUD");


// 4. 블록체인 관리
// 4-3. 판매자 블록체인 관리 (판매자가 사용하기로 선택한 블록체인 리스트를 볼 수 있음)
module.exports = {
  
  async readSellersChosenMainBlockchain(datas) {
    const input_seller_id = datas.seller_id;
    try {
      const result = await sellersChosenMainBlockchainDB.read(datas);
      return result; // 선택한 블록체인 번호(idx) 리스트 리턴
    } catch (error) {
      console.error(error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  },

  // 4-4. 판매자 블록체인 관리 (판매자가 삭제하기로 한 블록체인을 삭제)
  async deleteSellersChosenMainBlockchain(datas) {
    const input_seller_id = datas.seller_id;
    const input_main_blockchain_idx = datas.main_blockchain_idx;
    
    try {
      const result = await sellersChosenMainBlockchainDB.delete(datas);
      return result; // 1: 성공, -1: 실패
    } catch (error) {
      console.error(error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  }
}