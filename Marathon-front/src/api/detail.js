import request from '@/utils/request';

// 志愿者信息获取 API 接口
export function acquireVolunteerInformation(volunteer_id, event_id) {
  return request({
    url: '/Volunteer/acquire_volunteer_information',
    method: 'get',
    params: {
      volunteer_id: volunteer_id,
      event_id: event_id
    }
  });
}


