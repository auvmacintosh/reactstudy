class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

const not200 = response => {
    if (response.status === 200) {
        return response;
    } else {
        throw new HttpError(response);
    }
};

// json data adaptor for Spring Data Rest
export const adaptorSDR = apiUrl => {
    const serviceFolder = apiUrl.split('/').pop();
    return obj => ({
        xs: obj._embedded[serviceFolder],
        page: obj.page,
    })
}

// return a promise contains a object {xs, page}
const getXs = apiUrl => (signal = null, page = 0, size = 20, sort = '') => {
    return fetch(apiUrl + '?page=' + page + '&size=' + size + '&sort=' + sort, {signal: signal})
        .then(not200)
        .then(response => response.json())
        .catch(error => {
            throw error
        });
};
export default getXs;
