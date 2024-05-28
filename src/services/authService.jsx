import * as httpRequest from '~/utils/httpRequest';

export const login = async (formData) => {
    try {
        const response = await httpRequest.post('auth/login', formData);
        return response;
    } catch (error) {
        // console.log(error);
    }
};

export const refreshToken = async (data, refreshToken) => {
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        };
        const response = await httpRequest.post('auth/refresh', data, options);
        return response;
    } catch (error) {
        // console.log(error);
    }
};

export const vertifyToken = async (token) => {
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await httpRequest.get('auth/me', options);
        return response;
    } catch (error) {
        // console.log(error);
    }
};
