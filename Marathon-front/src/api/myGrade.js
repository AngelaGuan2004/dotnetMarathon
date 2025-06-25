import request from '@/utils/request'
/*刚打开页面，页面显示该选手的所有比赛成绩*/
export function getMyResults(playerId) {
    return request({
        url: '/Result/search_history_result',
        method: 'get',
        params: { 
            playerId 
        }
    })
}

/*获取半马成绩*/
export function getHalfResults(playerId) {
    return request({
        url: '/Result/search_history_half_result',
        method: 'get',
        params: { 
            playerId 
        }
    })
}
/*获取全马成绩*/
export function getFullResults(playerId) {
    return request({
        url: '/Result/search_history_full_result',
        method: 'get',
        params: { 
            playerId
        }
    })
}

