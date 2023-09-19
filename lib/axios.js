import axios from 'axios'

const axiosInstance = axios.create({
   baseURL: 'http://192.168.43.138/api', // Replace with your API endpoint
   timeout: 10000, // Set a timeout for requests (in milliseconds)
   headers: {
      'Content-Type': 'application/json' // Set the default content type for request headers
   }
})

export default axiosInstance
