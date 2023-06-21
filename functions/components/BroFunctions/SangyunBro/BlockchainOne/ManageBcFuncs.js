import {mainBlockchainListDB} from '../../../NangNangServe/MainBlockchainList/MainBlockchainListCRUD'
import {sellersChosenMainBlockchainDB} from '../../../User/SellerData/Chosen/Blockchain/SellersChosenMainBlockchainCRUD'

// 4. 블록체인 관리
// 4-1. 낭낭에서 사용 가능한 블록체인 조회
async function readMainBlockchainList() {
    try {
      const result = await mainBlockchainListDB.readMainBlockchainList();
      console.log("result: ", result);
      return result; // 사용 가능한 블록체인 번호(idx) 리스트 리턴
    } catch (error) {
      console.error(error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  }
  // 4-2. sellersChosenMainBlockchainDB에 선택한 블록체인 등록
  async function createSellersChosenMainBlockchain(input_seller_id, input_main_blockchain_idx) {
    try {
      const result = await sellersChosenMainBlockchainDB.createSellersChosenMainBlockchain(
        input_seller_id,
        input_main_blockchain_idx
      );
      return result; // 1: 성공, -1: 실패
    } catch (error) {
      console.error(error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  }
  
  export { readMainBlockchainList, createSellersChosenMainBlockchain };