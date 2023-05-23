import request from '@/utils/request'

interface USER_LIST_QUERY {
  name?: string
  role?: string
  page_num?: string | number
  page_size?: string | number
}

export default {
  login(data: any) {
    return request.post('/api/user/login', data)
  },
  logout() {
    return request.post('/api/user/logout', {})
  },
  getInfo(data?: any) {
    return request.get('/api/user/info', data)
  },
  getUserList(params?: USER_LIST_QUERY) {
    return request.get('/api/user/list', { params })
  },
  editUser(data?: any) {
    return request.post('/api/user/edit', data)
  }
}
