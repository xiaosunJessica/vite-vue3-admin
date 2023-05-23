import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/token'
import api from '@/api'

interface UserState {
  userInfo: any
  token: string
  userListObj: {
    count?: number
    records?: any[]
  }
}

export interface Get_User_List_Params {
  name?: string
  role?: string
  page_num?: number
  page_size?: number
}

export interface Edit_User_Info {
  role: string
  id: string
}
const useUser = defineStore('user', {
  state: (): UserState => {
    return {
      token: getToken(),
      userInfo: {},
      userListObj: {}
    }
  },
  actions: {
    // user login
    async login(params: any) {
      const res = await api.login(params)
      const token = res?.data?.token
      setToken(token)
    },

    // user logout
    async logout() {
      await api.logout()
      removeToken();
    },

    // get user info
    async getInfo() {
      const res = await api.getInfo()
      this.userInfo = res?.data || {}
    },

    // get user list
    async getUserList(params?: Get_User_List_Params) {
      const res = await api.getUserList(params)
      if (res.data) {
        this.userListObj = res.data
      }
      return res
    },

    // edit user Info
    async editUserInfo(params?: Edit_User_Info) {
      return await api.editUser(params)
    }
  }
})

export default useUser
