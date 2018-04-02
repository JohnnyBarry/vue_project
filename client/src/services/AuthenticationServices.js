import Api from '@/services/Api'

export default {
  register (credientials) {
    return Api().post('register', credientials)
  }
}
