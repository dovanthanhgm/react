import * as httpRequest from '~/utils/httpRequest';

export const fetchTodos = async (token) => {
    try {
        const response = await httpRequest.get('todos');
        return response;
    } catch (error) {
        // console.log(error);
    }
};
