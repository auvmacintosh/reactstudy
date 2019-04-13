import getXs from './getXs';
import mockArticles from './articles.json';

test('fetch with 200', () => {
    window.fetch = jest.fn(() => new Promise(resolve => resolve({
        ok: true,
        status: 200,
        json: () => mockArticles
    })));
    return (getXs('/api/articles')().then(obj => expect(obj).toEqual(
        {
            xs: mockArticles._embedded.articles,
            page: mockArticles.page,
        }
    )));
});
test('fetch with non 200', () => {

});
