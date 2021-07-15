import request from '@/utils/request'

// 列表
export function getList(pageNo, size, tab) {
  return request(({
    url: '/api/post/list',
    method: 'get',
    params: { pageNo: pageNo, size: size, tab: tab }
  }))
}

// 发布
export function post(topic) {
  return request({
    url: '/api/post/create',
    method: 'post',
    data: topic
  })
}

// 浏览
export function getPost(id) {
  return request({
    url: `/api/post`,
    method: 'get',
    params: {
      id: id
    }
  })
}

// 获取详情页推荐
export function getRecommends(id) {
  return request({
    url: '/api/post/recommend',
    method: 'get',
    params: {
      topicId: id
    }
  })
}

// 更新
export function update(topic) {
  return request({
    url: '/api/post/update',
    method: 'post',
    data: topic
  })
}

// 删除
export function deletePost(id) {
  return request({
    url: `/api/post/delete/${id}`,
    method: 'delete'
  })
}