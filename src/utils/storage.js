const storage = {
  get (key) {
    const cache = window.localStorage.getItem(key)
    if (!cache) return []
    return JSON.parse(cache)
  },
  save (key, data) {
    window.localStorage.setItem(key, JSON.stringify(data))
  },
  clear (key) {
    window.localStorage.setItem(key, null)
  }
}

export default storage
