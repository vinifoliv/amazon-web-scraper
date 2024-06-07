#!/usr/bin/node

// Dependencies
const express = require('express');
const app = express();
const axios = require('axios').default;

// Constants
const AMAZON_QUERY_ADDRESS = 'https://www.amazon.com/s?k=';

// Routing
app.get('/api/scrape/:keyword', (request, response) => {
    axios.get(AMAZON_QUERY_ADDRESS + request.params.keyword).then((html) => {
        response.send(html.data);
    }).catch((error) => {
        // error handling
        console.log('Failed: ' + error);
    }).finally(() => {
        // always executed
        console.log('Whatever!');
    });
});

app.listen(8081, () => {
    console.log('Server running at http://localhost:8081');
});
