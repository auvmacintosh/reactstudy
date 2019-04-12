class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

const not200 = response => {
    console.log(response.status)
    if (response.status === 200) {
        return response;
    } else {
        throw new HttpError(response);
    }
}

// return a promise contains a object {xs, page}
const getXs = apiUrl => {
    const serviceFolder = apiUrl.split('/').pop();
    return (signal = null, page = 0, size = 20, sort = '') => {
        return fetch(apiUrl + '?page=' + page + '&size=' + size + '&sort=' + sort, {signal: signal})
            .then(not200)
            .then(response => response.json())
            .then(obj => ({
                xs: obj._embedded[serviceFolder],
                page: obj.page,
            }))
            .catch(alert);
    }
};

export default getXs;
