import axios from 'axios';
import env from 'react-dotenv';

const axiosFetch = axios.create({
  baseURL: env.REACT_APP_API_URL,
  timeout: env.REACT_APP_API_TIMEOUT
});

export default axiosFetch;
