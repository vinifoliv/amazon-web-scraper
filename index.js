#!/usr/bin/node

// Dependencies setup
    // Express
        const express = require('express');
        const app = express();
        const cors = require('cors');
        app.use(cors()); // allows cross-origin resource sharing
        app.use(express.static("public")); // sets the static files inside the public folder to be open at the 
                                           // main route "/"
    
    // Axios
        const axios = require('axios').default;
        const instance = axios.create({
            headers: { // Amazon blocks web scraping by automatized scripts; so as to avoid it, some 
                       // appropriate headers had to be used 
                'Accept-Language': 'en-US,en;q=0.5',
                'User-Agent': 'Product Searcher / 1.0 Project for getting a job'
            }
        });
    
    // JSDOM
        const jsdom = require('jsdom');
        const { JSDOM } = jsdom;

// Routing
    app.get('/api/scrape/:keyword', (request, response) => {
        // Requesting the page
            instance.get('https://www.amazon.com/s?k=' + request.params.keyword).then((html) => {
            const { data } = html;
            const amazonPage = new JSDOM(data, {
                contentType: 'text/html'
            });

        // Scraping required data through jsDOM
            const titles = amazonPage.window.document.getElementsByClassName('a-size-base-plus a-color-base a-text-normal');
            const ratings = amazonPage.window.document.getElementsByClassName('a-icon-alt');
            const reviews = amazonPage.window.document.getElementsByClassName('a-size-base s-underline-text');
            const images = amazonPage.window.document. getElementsByClassName('s-image s-image-optimized-rendering');

        // Preparing a new HTML with the formatted data
            const { document } = (new JSDOM('', {
                contentType: 'text/html'
            })).window;
            let index = 0;
            let itemsCount = titles.length;

            while (index < itemsCount) {
                const container = document.createElement('div');

                // Name
                    const title = amazonPage.window.document.createElement('div');
                    title.textContent = titles.item(index).textContent;
                    console.log(title.textContent)
                    container.appendChild(title);
                
                // Rating
                    const rating = amazonPage.window.document.createElement('div');
                    rating.textContent = ratings.item(index).textContent;
                    console.log(rating.textContent);
                    container.appendChild(rating);

                // Review number
                    const review = amazonPage.window.document.createElement('div');
                    review.textContent = reviews.item(index).textContent;
                    console.log(review.textContent);
                    container.appendChild(review);

                // Image
                    const image = amazonPage.window.document.createElement('img');
                    image.src = images.item(index).src;
                    console.log(image.src);
                    container.appendChild(image);

                 document.body.appendChild(container);
                 index++;
            }

            response.send(document.body.innerHTML);
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