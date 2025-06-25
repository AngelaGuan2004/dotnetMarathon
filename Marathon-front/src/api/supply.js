import request from '@/utils/request'

/*查询显示该比赛的所有补给点*/
export function get_supply_point(Event_id) {
    return request({
        url: '/Supply/get_all_supplypoint',
        method: 'get',
        params: {
            Event_id,
        }
    })
}

/*添加补给点*/
export function add_supply_point({ id, place, kind }) {
    return request({
        url: '/Supply/add_supplypoint',
        method: 'post',
        data: { id, place, kind }
    });
}

/*删除补给点*/
export function delete_supply_point(supplyPointID) {
    return request({
        url: '/Supply/delete_supplypoint_by_id',
        method: 'delete',
        params: {
            id: supplyPointID
        }
    });
}
