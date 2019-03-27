import React, {useState} from 'react';
import axios from 'axios';

const renderItem = article => (
    <h5 key={article._links.self.href}><a href={article._links.self.href}>{article.title}</a></h5>
);

const App = ({fuck}) => {
    const [articles, setArticles] = useState([]);

    const handleSearch = e => {
        e.preventDefault();
        axios.get('http://localhost:8080/api/articles').then(
            // res=>console.log(res)
            ({data: {_embedded: {articles}}}) => {
                setArticles(articles);
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        );
    };

    return (
        <>
            {fuck}
            <button name='searchButton' onClick={handleSearch}>Search</button>
            <div data-testid="search-result">{articles.map(renderItem)}</div>
        </>
    );
};

export default App;