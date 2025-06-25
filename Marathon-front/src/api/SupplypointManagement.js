import request from '@/utils/request';

export function fetchEventName(Id) {
  console.log('发起请求 - Event ID:', Id);
  
  return request.get(`http://113.44.75.241:5158/Event/get_by_id?Id=${Id}`)
    .then(response => {
      console.log('请求成功 - 响应数据:', response);
      return response;
    })
    .catch(error => {
      console.error('请求失败 - 错误信息:', error);
      throw error;
    });
}

export function getSupplypointDetails(Event_Id,Supplypoint_Id) {
  console.log('发起请求 - Event ID:', Event_Id,Supplypoint_Id);
  
  return request.get(`http://113.44.75.241:5158/Supply/get_supply_by_eventid?event_id=${Event_Id}&supplypoint_id=${Supplypoint_Id}`)
    .then(response => {
      console.log('请求成功 - 响应数据:', response);
      return response;
    })
    .catch(error => {
      console.error('请求失败 - 错误信息:', error);
      throw error;
    });
}

export function saveSupplypointDetails(SupplypointData) {
 
  
  return request({
    url: `http://113.44.75.241:5158/Supply/supply_entry_multi`,
    method: 'post',
    data: SupplypointData
  })
  .then(response => {
    console.log('请求成功 - 响应数据:', response);
    return response;
  })
  .catch(error => {
    console.error('请求失败 - 错误信息:', error);
    throw error;
  });
}