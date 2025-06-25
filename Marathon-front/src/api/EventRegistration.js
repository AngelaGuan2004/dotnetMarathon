import request from '@/utils/request';

export function getParticipantInfo(Id) {
  return request({
    url: '/Player/get_by_playerId',
    method: 'get',
    params: { id: Id }
});
}

export function registerParticipant(registrationData) {
  return request({
    url: '/Participate/add_participate',
    method: 'post',
    data: registrationData
  });
}