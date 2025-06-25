import request from '@/utils/request'
export function getInfor(Id) {
    return request({
        url: '/Auth/get_by_playerid',
        method: 'get',
        params: { Id }
    }).catch(error => {
        console.error('获取用户信息失败:', error);
        return Promise.reject(error);
    });
}

export function getPhotographerInfor(Id) {
  return request({
      url: '/Auth/get_by_photographerid',
      method: 'get',
      params: {
          Id: Id
      }
  })
}
export function completeInfor(params) {
    return request({
      url: '/Auth/update_player',
      method: 'patch',
      data: {
        id: params.id,
        name: params.name,
        gender: params.gender,
        age: params.age,
        id_number: params.id_number,
        region: params.region,
        telephone_number: params.telephone_number,
        password: params.password
      }
    })
}
export function getMyVolunteering(Id) {
  return request({
      url: '/Volunteer/acquire_volunteer_event',
      method: 'get',
      params: {
        volunteer_id: Id
      }
  })
}
export function getMyRegistrations(Id) {
  return request({
      url: '/Player/get_events_by_playerid',
      method: 'get',
      params: {
        Id: Id
      }
  })
}

export function getEventInfo(Player_Id,Event_Id) {
  return request({
      url: '/Player/get_number_by_eventid_and_playerid',
      method: 'get',
      params: {
        playerid:Player_Id,
        eventid:Number(Event_Id)
      }
  })
}





