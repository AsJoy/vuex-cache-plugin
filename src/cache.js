/**
 * Created by yuanqiangniu on 2017/9/10.
 */
export default class Cache {
  key
  cache
  updated
  constructor(key) {
    this.key = key
  }
  set cachekey(key) {
    this.key = key
  }
  cacheSet(key, value, longTerm = false) {
    this.cache = this.cacheGet(key, longTerm)
    this.cache = value
    if (longTerm) {
      window.localStorage.setItem(`${this.key}_${key}`, JSON.stringify(this.cache))
    }
  }
  cacheGet(key, longTerm = false) {
    if (!longTerm || this.updated) {
      this.updated = true
      if (!this.cache) {
        this.cache = {}
      }
      return this.cache
    }
    try {
      this.updated = true
      return JSON.parse(window.localStorage.getItem(`${this.key}_${key}`) || '{}')
    } catch (e) {}
    return {}
  }
}
