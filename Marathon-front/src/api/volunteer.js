import request from '@/utils/request';

// 志愿者报名
export function registerVolunteer(data) {
  return request({
    url: '/Volunteer/add_volunteer',
    method: 'post',
    data: data
  });
}

export function getVolunteersByEventId(eventId) {
  return request({
    url: '/Volunteer/inquiry_volunteer_by_eventid',
    method: 'GET',
    params: { event_id: eventId }
  });
}

export function scheduleVolunteer(data) {
  return request({
    url: '/Volunteer/schedule_volunteer',
    method: 'PATCH',
    data: data
  });
}

export function acquireVolunteerInformation(volunteerId, eventId) {
  return request({
    url: '/Volunteer/acquire_volunteer_information',
    method: 'GET',
    params: { 
      volunteer_id: volunteerId,
      event_id: eventId
    }
  });
}

// 获取某场赛事的所有补给点
export function getAllSupplyPoints(eventId) {
  return request({
    url: '/Supply/get_all_supplypoint',
    method: 'GET',
    params: { Event_Id: eventId }
  });
}

// 将志愿者添加到补给点
export function addVolunteerToSupplyPoint(data) {
  return request({
    url: '/Volunteer/add_volunteer_supplypoint',
    method: 'POST',
    data: data
  });
}

// 获取指定补给点的志愿者信息
export function getSupplyVolunteers(eventId, supplyPointId) {
  return request({
    url: '/Volunteer/get_supply_volunteer',
    method: 'GET',
    params: {
      Event_Id: eventId,
      supplypoint_id: supplyPointId
    }
  });
}

// 获取某场赛事的所有接驳车
export function getAllCarPoints(eventId) {
  return request({
    url: '/Shuttlecar/inquire_shuttlecar_info',
    method: 'GET',
    params: { event_Id: eventId }
  });
}

// 获取指定接驳车的志愿者信息
export function getCarVolunteers(eventId, carPointId) {
  return request({
    url: '/Volunteer/get_shuttlecar_volunteer',
    method: 'GET',
    params: {
      Event_Id: eventId,
      shuttlecar_id: carPointId
    }
  });
}

// 将志愿者添加到接驳车
export function addVolunteerToCarPoint(data) {
  return request({
    url: '/Volunteer/add_drive',
    method: 'POST',
    data: data
  });
}

// 获取某场赛事的所有医疗点
export function getAllMedicalPoints(eventId) {
  return request({
    url: '/Medical/get_all_medicalpoint',
    method: 'GET',
    params: { Event_Id: eventId }
  });
}

// 获取指定医疗点的志愿者信息
export function getMedicalVolunteers(eventId, medicalPointId) {
  return request({
    url: '/Volunteer/get_medical_volunteer',
    method: 'GET',
    params: {
      Event_Id: eventId,
      medicalpoint_id: medicalPointId
    }
  });
}

// 将志愿者添加到医疗点
export function addVolunteerToMedicalPoint(data) {
  return request({
    url: '/Volunteer/add_volunteer_medicalpoint',
    method: 'POST',
    data: data
  });
}
