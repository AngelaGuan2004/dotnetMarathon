import request from '@/utils/request'

// 获取某场赛事的所有医疗点
export function getAllMedicalPoints(Event_Id) {
    return request({
        url: '/Medical/get_all_medicalpoint',
        method: 'get',
        params: { Event_Id }
    })
}

// 获取某场赛事所有伤员
export function getInjury(Event_Id) {
    return request({
        url: '/Medical/get_injury',
        method: 'get',
        params: { Event_Id }
    })
}

// 添加伤员数据
export function addInjury(data) {
    return request({
        url: '/Medical/add_injury',
        method: 'post',
        data: {
            name: data.name,
            IdNumber: data.IdNumber,
            medicalPoint_Id: data.medicalPoint_Id
        }
    })
}


// 删除伤员数据
export function deleteInjury(IdNumber, medicalPoint_Id) {
    return request({
        url: '/Medical/delete_injury',
        method: 'delete',
        params: {
            IdNumber,
            medicalPoint_Id
        }
    })
}
