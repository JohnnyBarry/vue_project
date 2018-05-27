import Api from '@/services/Api'

export default {
  register (credientials) {
    return Api().post('register', credientials)
  },
  login (credientials) {
    return Api().post('login', credientials)
  }
}
