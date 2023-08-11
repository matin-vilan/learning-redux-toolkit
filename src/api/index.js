import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 60000,
});

axios.interceptors.response.use((res) => res.data);

export default axios;
