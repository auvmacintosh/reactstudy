import getXs, {adaptorSDR} from "./getXs";
import mockArticles from './articles.json';

const apiUrl= '/api/articles';
describe('getXs tests', ()=>{
    test('200 response', () => {
        window.fetch = jest.fn(() => new Promise(resolve => resolve({
            ok: true,
            status: 200,
            json: () => mockArticles
        })));
        return (getXs(apiUrl)().then(obj => expect(obj).toEqual(
            mockArticles
        )));
    });
    test('!200 response', () => {
        window.fetch = jest.fn(() => new Promise(resolve => resolve({
            ok: true,
            status: 404,
            json: () => mockArticles
        })));
        return (getXs(apiUrl)().catch(e => expect(e).toEqual(
            new Error('404 for undefined')
        )));
    });
});

describe('Spring Data Rest Adaptor tests', ()=>{
    test('format', ()=>{
        expect(adaptorSDR(apiUrl)(mockArticles)).toEqual(
            {
                xs: mockArticles._embedded.articles,
                page: mockArticles.page,
            }
        )
    })
})
