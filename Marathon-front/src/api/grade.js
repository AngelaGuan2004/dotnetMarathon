import request from '@/utils/request'

/*获取一场比赛所有的成绩*/
export function get_all_results(Event_id) {
    return request({
        url: '/Result/get_all_results_by_eventid',
        method: 'get',
        params: { Event_id }
    })
}

//批量录入选手成绩
export function add_results(Event_id) {
    return request({
        url: '/Result/add_results',
        method: 'patch',
        params: {
            Event_id :Event_id,
            Player_id:id,
            gunResults:gun_Results,
            netResults:net_Results,
            Rank:rank,            
        }
    })
}