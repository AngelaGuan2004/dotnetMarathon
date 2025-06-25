import request from '@/utils/request';

export function getSupplypointDetails(event_id) {
  console.log('发起请求 - Event ID:', event_id);
  
  return request.get(`http://113.44.75.241:5158/Supply/get_all_supplypoint?Event_Id=${event_id}`)
    .then(response => {
      console.log('请求成功 - 响应数据:', response); // 这里应该打印完整的响应对象
      return response; // 确保返回整个响应对象，而不是 response.data
    })
    .catch(error => {
      console.error('请求失败 - 错误信息:', error);
      throw error;
    });
}
