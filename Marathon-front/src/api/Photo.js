import request from '@/utils/request'

// 获取所有照片信息
export function getAllPhotos() {
  return request({
    url: '/PhotoView/get_all_photos',
    method: 'get'
  });
}

// 获取一张照片
export function getPhotoById(photo_id) {
  return request({
    url: '/Photo/get_photo_by_id',
    method: 'get',
    params: { photo_id }
  });
}

// 获取所有匹配的照片拍摄地址列表
export function inquiryLocation(location_key) {
  return request({
    url: '/PhotoView/inquiry_location',
    method: 'get',
    params: { location_key }
  })
}

// 根据拍摄地址获取匹配的照片列表
export function inquiryPhotoByLocation(location) {
  return request({
    url: '/PhotoView/inquiry_photo_by_location',
    method: 'get',
    params: { location }
  })
}

// 根据赛事名称获取匹配的照片列表
export function inquiryPhotoByEventName(event_name) {
  return request({
    url: '/PhotoView/inquiry_photo_by_eventname',
    method: 'get',
    params: { event_name }
  })
}

// 点赞照片
export function likePhoto(id) {
  return request({
    url: '/PhotoView/like_photo',
    method: 'patch',
    params: { id }
  })
}

// 根据摄影师ID获取匹配的照片列表
export function inquiryPhotoByPhotographer(id, photographer_name) {
  return request({
    url: '/PhotoView/inquiry_photo_by_photographer',
    method: 'get',
    params: { id, photographer_name }
  })
}

//根据摄影师ID获取摄影师名字
export function inquiryPhotographerNameById(id) {
  return request({
    url: '/PhotoView/get_photographer_name_by_id',
    method: 'get',
    params: { id }
  })
}


// 上传照片
export function uploadPhoto(event_id, time, location, photographer_id, file) {

  return request({
    url: '/Photo/upload_photo',
    method: 'post',
    data: file,
    params: { event_id, time, location, photographer_id },
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}

// 删除照片
export function deletePhoto(id) {
  return request({
    url: '/Photo/delete_photo',
    method: 'delete',
    params: { id }
  });
}

//获取所有赛事
export function getAllEvents() {
  return request({
    url: '/Event/get_all_event',
    method: 'get',
  })
}
