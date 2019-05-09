class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
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
// export const adaptorSDR = apiUrl => {
//     const serviceFolder = apiUrl.split('/').pop();
//     return obj => {
//         let result = {
//             xs: obj._embedded[serviceFolder],
//             page: obj.page,
//         };
//         if(result.xs === undefined || result.page === undefined) {
//             throw new Error('Wrong API response format.')
//         } else {
//             return result;
//         }
//     }
// };

// json data adaptor for json-server
export const adaptorJSONServer = obj => {
    let result = {
        xs: obj,
    };
    if (result.xs === undefined) {
        throw new Error('Wrong API response format.')
    } else {
        return result;
    }
};

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
