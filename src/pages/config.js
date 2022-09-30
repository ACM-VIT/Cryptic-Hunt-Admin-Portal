// eslint-disable-next-line no-undef
export const BACKEND_API_URL = 'https://crypticbackend.acmvit.in';

export const defaultOptions = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
};