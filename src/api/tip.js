import request from '@/utils/request'

export function getNews() {
  return request({
    url: '/api/tip/today',
    method: 'get'
  })
}