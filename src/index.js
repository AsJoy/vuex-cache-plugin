/**
 * Created by yuanqiangniu on 2017/9/11.
 */
/**
 * Created by yuanqiangniu on 2017/9/10.
 */
import Cache from './cache'

const initOps = {
  longTermCaching: false,
  key: 'project_name',
}

const request = 'request'

const upperCase = str => {
  const s = str.replace(/([A-Z])/g, '_$1')
  return s.toUpperCase()
}

const createCachePlugin = (ops = initOps) => {
  const cacheIns = new Cache(ops.key)

  return store => {
    const oldDispatch = store.dispatch
    // 避免重复subscribe
    const mutations = {}
    store.dispatch = (type, payload = {}, ...args) => {
      const cached = cacheIns.cacheGet(request, ops.longTermCaching)
      if (!payload.cacheData) {
        oldDispatch(type, payload, ...args)
        return
      }
      delete payload.cacheData
      const key = type + JSON.stringify(payload || {})

      if (cached[key]) {
        store.commit(upperCase(type), cached[key])
      }
      if (!mutations[key]) {
        mutations[key] = true
        store.subscribe(mutation => {
          if (mutation.type === upperCase(type)) {
          cached[key] = mutation.payload
          cacheIns.cacheSet(request, cached, ops.longTermCaching)
          }
        })
      }
      oldDispatch(type, payload, ...args)
    }
  }
}

export default createCachePlugin
