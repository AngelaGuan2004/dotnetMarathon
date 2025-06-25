import request from '@/utils/request';

/**
 * 发起抽签请求
 * @param {number} eventId - 赛事 ID
 * @param {number} totalParticipants - 中签人数
 * @returns {Promise} - 后端响应
 */
export function drawLots(eventId, totalParticipants) {
  return request({
    url: `/event/${eventId}/drawLots`,
    method: 'post',
    params: { totalParticipants }, // 通过 params 传递参数
  });
}

/**
 * 获取某赛事的选手信息
 * @param {number} eventId - 赛事 ID
 * @returns {Promise} - 选手信息数组
 */
export function fetchParticipantsByEvent(eventId) {
  return request({
    url: '/event/participants',
    method: 'get',
    params: { eventId }, // 通过 params 传递 eventId
  });
}

/**
 * 获取选手历史成绩
 * @param {number} playerId - 选手ID
 * @returns {Promise} - 选手历史成绩
 */
export function fetchPlayerHistory(playerId) {
  return request({
    url: '/event/player/history',
    method: 'get',
    params: { playerId },
  });
}

/**
 * 提交选手配速员名单
 * @param {number} eventId - 事件ID
 * @param {Array<number>} pacerIds - 选中的配速员ID列表
 * @returns {Promise} - 提交结果
 */
export function submitPacers(eventId, pacerIds) {
  return request({
    url: '/event/submitPacers',
    method: 'post',
    data: { eventId, pacerIds }, // 参数以 JSON 格式传输
  });
}

/**
 * 提交选手急救跑者名单
 * @param {number} eventId - 事件ID
 * @param {Array<number>} aidIds - 选中的急救跑者ID列表
 * @returns {Promise} - 提交结果
 */
export function submitAids(eventId, aidIds) {
  return request({
    url: '/event/submitAids',
    method: 'post',
    data: { eventId, aidIds }, // 参数以 JSON 格式传输
  });
}

export function submitGrades(results) {
  return request({
    url: '/event/submitGrades',
    method: 'post',
    data:  results , // 参数以 JSON 格式传输
    headers: {
      'Content-Type': 'application/json',  // 确保传送的内容类型是 JSON
    },
  });
}