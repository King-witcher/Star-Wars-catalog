export const api = {
  get: vi.fn(),
  post() {
    throw new Error('post should not be used')
  },
  put() {
    throw new Error('put should not be used')
  },
  delete() {
    throw new Error('delete should not be used')
  },
  patch() {
    throw new Error('patch should not be used')
  },
}
