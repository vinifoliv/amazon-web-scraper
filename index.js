#!/usr/bin/node

// Dependencies
    // Express
    const express = require('express');
    const app = express();
    app.use(express.static("public"));
    
    // Axios
    const axios = require('axios').default;
    
    // JSDOM
    const jsdom = require('jsdom');
    const { JSDOM } = jsdom;
    const dom = new JSDOM('');

    //Others
    const path = require('path');

// Constants
const SEARCH_ADDRESS = 'https://www.amazon.com/s?k=';

// Routing
app.get('/api/scrape/:keyword', (request, response) => {
    axios.get(SEARCH_ADDRESS + request.params.keyword).then((html) => {
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