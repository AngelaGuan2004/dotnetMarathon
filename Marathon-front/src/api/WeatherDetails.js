import request from '@/utils/request';

// 获取某赛事的信息
export function getWeatherDetails(eventId) {
  return request({
      url: '/Weather/get_weather',
      method: 'get',
      params: { event_id: eventId }
  });
}