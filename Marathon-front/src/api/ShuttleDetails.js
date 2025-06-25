import request from '@/utils/request';

export function getShuttleDetails(event_id) {
  console.log('发起请求 - Event ID:', event_id);
  
  return request.get(`http://113.44.75.241:5158/Shuttlecar/inquire_shuttlecar_info?event_id=${event_id}`)
    .then(response => {
      console.log('请求成功 - 响应数据:', response);
      return response;
    })
    .catch(error => {
      console.error('请求失败 - 错误信息:', error);
      throw error;
    });
}
