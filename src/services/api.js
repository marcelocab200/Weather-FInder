import axios from 'axios'

// More info: https://www.weatherapi.com/docs/

const api = axios.create({
    baseURL: "http://api.weatherapi.com/v1"
})

export default api