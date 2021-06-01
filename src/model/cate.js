export default class Cate{
  constructor(cate={}){
    this.id=cate.id || 0,
    this.cateName=cate.cateName || '',
    this.cateCode=cate.cateCode || '',
    this.parentCateCode=cate.parentCateCode || '',
    this.parentCateName=cate.parentCateName || '',
    this.isDelete=cate.isDelete || 0
    return this
  }
}