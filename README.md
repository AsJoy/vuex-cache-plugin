# vuex-cache-plugin

## Overview
`vuex-cache-plugin` is a cache plugin when you try to cache data when you try to do a async function in actions.
 we intercept the mutations payload using `store.subscribe` and next time `dispatch` we will get the data first and then do the dispatch.
## Usage
  the store
 ```js 
 import createCachePlugin from 'vuex-cache-plugin'
 
 const store = new Vuex.Store({
    actions,
    plugins: [createCachePlugin({
      longTermCaching: true,
    })],
  })
  ```
the actions
   ```js 
   ...
   async fetchCodes({ commit }, payload) {
     const res = await fetchInviteCode({ activityCode: payload.activityCode })
     commit(FETCH_CODES, { ...res })
   },
   ...
   ```
now we can dispatch with `cacheData` props in payload
```js
  store.dispatch('fetchCodes', { cacheData: true })
```
then we will get a mutation typed by the action types ,in this case it's FETCH_CODES
the mutation
 ```js
  ...
  [FETCH_CODES](state, payload) {
   state.code = payload.message
  }
  ...
```
## License

MIT © [asjoy](https://github.com/AsJoy)