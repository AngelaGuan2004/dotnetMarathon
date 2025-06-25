import request from '@/utils/request';

// 获取所有赛事信息（一次性）
export function fetchAllEvents() {
    return request({
        url: '/Event/get_all_event',  // 使用正确的后端 API 端点
        method: 'get'
    });
}

// 获取某赛事的信息
export function fetchEventById(eventId) {
    return request({
        url: '/Event/get_by_id',
        method: 'get',
        params: { id: eventId }
    });
}

// 添加赛事
export function addEvent(data) {
    return request({
      url: '/Event/add_event',
      method: 'post',
      data: data // 赛事数据对象
    });
  }
  
  // 编辑赛事
  export function updateEvent(data) {
    return request({
      url: '/Event/update_event',
      method: 'put',
      data: data // 包括 id 和要更新的字段
    });
  }
  
  // 删除赛事
  export function deleteEvent(eventId) {
    return request({
      url: '/Event/delete_event',
      method: 'delete',
      params: { id: eventId } // 通过 ID 删除指定赛事
    });
  }