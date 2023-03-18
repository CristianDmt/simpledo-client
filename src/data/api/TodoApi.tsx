import axios from 'axios';

const API_BASE_PATH = 'http://localhost:3000/';

export default axios.create({
    baseURL: API_BASE_PATH
});