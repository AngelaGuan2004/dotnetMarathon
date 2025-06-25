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

export function getPackageDetails(Event_Id) {
  console.log('发起请求 - Event ID:', Event_Id);
  
  return request.get(`http://113.44.75.241:5158/Supply/get_package_by_eventid?event_id=${Event_Id}`)
    .then(response => {
      console.log('请求成功 - 响应数据:', response);
      return response;  // 确保返回的是真实的数据部分
    })
    .catch(error => {
      console.error('请求失败 - 错误信息:', error);
      throw error;
    });
}

export function savePackageDetails(PackageData) {
  console.log('发起保存请求 - 发送的数据:', PackageData);
  
  return request({
    url: `http://113.44.75.241:5158/Supply/package_entry_multi`,
    method: 'post',
    data: PackageData
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
