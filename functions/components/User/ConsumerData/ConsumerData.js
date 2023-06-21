import React, { useState, useEffect } from 'react';
import { consumerDB } from './ConsumerCRUD';

function ConsumerData() {
  const [consumerId, setConsumerId] = useState('');
  const [consumerNickname, setConsumerNickname] = useState('');
  const [consumerData, setConsumerData] = useState(null);

  const handleCreate = async () => {
    const result = await consumerDB.createConsumer(consumerId, consumerNickname);
    if (result === 1) {
      console.log('소비자 데이터가 성공적으로 생성되었습니다.');
    } else {
      console.log('소비자 데이터 생성에 실패했습니다.');
    }
  };

  const handleRead = async () => {
    const data = await consumerDB.readConsumer(consumerId);
    if (data) {
      setConsumerData(data);
    } else {
      console.log('소비자 데이터를 읽어오는데 실패했습니다.');
    }
  };

  const handleUpdate = async () => {
    const result = await consumerDB.updateConsumer(consumerId, consumerNickname);
    if (result === 1) {
      console.log('소비자 데이터가 성공적으로 수정되었습니다.');
    } else {
      console.log('소비자 데이터 수정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    const result = await consumerDB.deleteConsumer(consumerId);
    if (result === 1) {
      console.log('소비자 데이터가 성공적으로 삭제되었습니다.');
    } else {
      console.log('소비자 데이터 삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    // 초기 데이터 로드 등 필요한 작업 수행
  }, []);

  return (
    <div>
      <h1>Consumer Data</h1>
      <form>
        <label>
          Consumer ID:
          <input type="text" value={consumerId} onChange={(e) => setConsumerId(e.target.value)} />
        </label>
        <br />
        <label>
          Consumer Nickname:
          <input type="text" value={consumerNickname} onChange={(e) => setConsumerNickname(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleCreate}>Create</button>
        <button type="button" onClick={handleRead}>Read</button>
        <button type="button" onClick={handleUpdate}>Update</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </form>
      {consumerData && (
        <div>
          <h2>Read Result</h2>
          <pre>consumer NickName : {JSON.stringify(consumerData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ConsumerData;