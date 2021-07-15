import request from '@/utils/request'

// 用户主页
export function getInfoByName(username, page, size) {
  return request({
    url: '/api/ums/user/' + username,
    method: 'get',
    params: {
      pageNo: page,
      size: size
    }
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/api/ums/user/info',
    method: 'get',
  })
}

// 更新
export function update(user) {
  return request({
    url: '/api/ums/user/update',
    method: 'post',
    data: user
  })
}

// 获取全部用户信息
export function getAllInfo() {
  return request({
    url: '/api/ums/user/all',
    method: 'get',
  })
}

// 分页获取用户信息
export function getAllUsers(pageNo, size) {
  return request({
    url: '/api/ums/user/userList',
    method: 'get',
    params: { pageNo: pageNo, size: size }
  })
}

// 获取用户粉丝
export function getFansByName(userId) {
  return request({
    url: '/api/ums/user/fans',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

// 根据用户ID删除用户
export function deleteUserById(userId) {
  return request({
    url: '/api/ums/user/deleteUser',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

// 更新token
export function renewToken(userName) {
  return request({
    url: "/api/ums/user/renewToken",
    method: "get",
    params: { userName: userName }
  })
}