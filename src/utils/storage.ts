export const get = (key: string) => localStorage.getItem(key)

export const set = (key: string, data: string) => localStorage.setItem(key, data)

export const remove = (key: string) => localStorage.removeItem(key)

export default { get, set, remove }
