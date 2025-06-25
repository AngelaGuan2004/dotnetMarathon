import request from '@/utils/request';

export function getItem() {
  
  return request.get(`http://113.44.75.241:5158/Supply/get_item`)
    .then(response => {
      console.log('请求成功 - 响应数据:', response);
      return response;
    })
    .catch(error => {
      console.error('请求失败 - 错误信息:', error);
      throw error;
    });
}