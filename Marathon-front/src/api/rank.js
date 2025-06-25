import request from '@/utils/request';

export function getRank(event_id, topN, gender,sortOrder) {
    return request({
        url: '/TopPlayers/get_top_players',
        method: 'get',
        params: { event_id, topN, gender,sortOrder }
    });
}