import request from '@/utils/request'

/*查询显示该比赛的所有接驳车信息*/
export function get_shuttleInfo(event_id) {
    return request({
        url: '/Shuttlecar/inquire_shuttlecar_info',
        method: 'get',
        params: {
            event_id,
        }
    })
}

/*添加接驳车*/
export function add_shuttleInfo({ Event_id, shuttlecar_id, departtime, arrivetime }) {
    return request({
        url: '/Shuttlecar/release_shuttlecar_info',
        method: 'post',
        data: {
            event_id: Event_id,
            id: shuttlecar_id,
            Departure_Time: departtime,
            Arrival_Time: arrivetime
        }
    });
}

/*删除接驳车*/
export function delete_shuttleInfo(shuttlecar_id) {
    return request({
        url: '/Shuttlecar/delete_shuttlecar',
        method: 'delete',
        params: {
            shuttlecar_id
        }
    });
}
