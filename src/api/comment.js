import request from '@/utils/request'

export function fetchCommentsByTopicId(topic_Id) {
  return request({
    url: '/api/comment/get_comments',
    method: 'get',
    params: {
      topicid: topic_Id
    }
  })
}

export function pushComment(data) {
  return request({
    url: '/api/comment/add_comment',
    method: 'post',
    data: data
  })
}

export function deleteCommentById(commentId) {
  return request({
    url: "/api/comment/delete_comment",
    method: "get",
    params: {
      commentId: commentId
    }
  })
}

export function fetchAllComments(pageNo, size) {
  return request({
    url: "/api/comment/all_comments",
    method: "get",
    params: { pageNo: pageNo, size: size }
  })
}