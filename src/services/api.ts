import axios from 'axios'

const BASE_URL = 'https://swapi.dev/api'
export const api = axios.create({ baseURL: BASE_URL })
