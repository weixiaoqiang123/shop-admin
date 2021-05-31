export default class User{
  constructor(user={}){
    this.nickname = user.nickname || '',
    this.name = user.name || '',
    this.role = user.role || 0,
    this.method = user.method || '',
    this.isDelete = user.isDelete || 0
    return this
  }
}