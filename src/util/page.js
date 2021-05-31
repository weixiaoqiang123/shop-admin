export default class Page{
  constructor(page={}){
    this.total = page.total || 0,
    this.currentPage = page.current || 1,
    this.lineSize = page.size || 0

    return this
  }
}