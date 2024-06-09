#!/usr/bin/node

// Dependencies setup
    // Express
        const express = require('express');
        const app = express();
        app.use(express.static("public")); // sets the static files inside the public folder to be open at the main route "/"
    
    // Axios
        const axios = require('axios').default;
        const instance = axios.create({
            baseURL: 'https://www.amazon.com/s?k=',
            headers: { //Amazon blocks web scraping by automatized scripts; so as to avoid it, some appropriate headers had to be used 
                'Accept-Language': 'en-US,en;q=0.5',
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:126.0) Gecko/20100101 Firefox/126.0'
            }
        });
    
    // JSamazonDOM
        const jsdom = require('jsdom');
        const { JSDOM } = jsdom;

// Routing
    app.get('/api/scrape/:keyword', (request, response) => {
        // Requesting the page
        instance.get('' + request.params.keyword).then((html) => {
            const amazonPage = new JSDOM(html.data).window.document;

            // Scraping required data through jsDOM
            const names = amazonPage.getElementsByClassName('a-size-base-plus a-color-base a-text');
            const ratings = amazonPage.getElementsByClassName('a-icon-alt');
            const reviewList = amazonPage.getElementsByClassName('a-size-base s-underline-text');
            const imageURLs = amazonPage.getElementsByClassName('s-image s-image-optimized-rendering');

            // Preparing a new HTML with the formatted data
            const { document } = (new JSDOM('')).window;
            let index = 0;

            console.log(names.item(index));

            // for (var item in names) {
            //     const container = document.createElement('div');

            //     // Image
            //         const image = document.createElement('img');
            //         image.src = imageURLs[index].src;
            //         container.appendChild(image);

            //     // Name
            //         const nameDiv = document.createElement('div');
            //         nameDiv.value = names[index].value;
            //         container.appendChild(nameDiv);
                
            //     // Rating
            //         const ratingDiv = document.createElement('div');
            //         ratingDiv.value = ratings[index].value;
            //         container.appendChild(ratingDiv);

            //     // Review number
            //         const reviewDiv = document.createElement('div');
            //         reviewDiv.value = reviewList[index].value;
            //         container.appendChild(reviewDiv);

            //     document.body.appendChild(container);
            //     index++;
            // }

            //response.send(document.body);
        })

        // Error handling
        .catch((error) => {
            console.log('Failed: ' + error);
        })
        
        // Always executed
        .finally(() => {
            console.log('Whatever!');
        });
    });

// Server setup
    app.listen(8081, () => {
        console.log('Server running at http://localhost:8081');
    });