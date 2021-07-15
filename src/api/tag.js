import request from '@/utils/request'

export function getTopicsByTag(paramMap) {
  return request({
    url: '/api/tag/' + paramMap.name,
    method: 'get',
    params: {
      page: paramMap.page,
      size: paramMap.size
    }
  })
}