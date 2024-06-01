import axios from 'axios';
import { getEnvVar } from './env';

const httpRequest = axios.create({
    baseURL: getEnvVar('VITE_BASE_API'),
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, data = {}, options = {}) => {
    const response = await httpRequest.post(path, data, options);
    return response.data;
};

export default httpRequest;
