import React from 'react';
import App from './App';
import {render, fireEvent, wait} from 'react-testing-library';
import axios from 'axios';
import a from './articles.json';

jest.mock('axios');

test('displays titles when clicking Search',
    async () => {
        axios.get.mockResolvedValue({data: a});
        const {getByText, getByTestId} = render(<App/>);
        fireEvent.click(getByText('Search'));
        await wait(() => getByTestId('search-result'))

        expect(axios.get).toHaveBeenCalledTimes(1)

        expect(getByTestId('search-result')).toHaveTextContent('Linux')


    }
);
