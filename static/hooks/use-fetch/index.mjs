const instance = axios.create({
  baseURL: 'http://localhost:9000/',
  timeout: 20000
})
export const useFetch = (url, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      ...config
    }).then(({ data: { data, code, msg } }) => {
      switch (code) {
        case 0: // success
          resolve({ code, msg, data })
          break
        default:
          // other code
          reject(new Error(msg))
          break
      }
    }).catch((e) => {
      console.log("useFetch")
      reject(e)
    })
  })
}
