const form = document.getElementById('form');
const keyword = document.getElementById('keyword');
const search_result = document.getElementById('search-result');
    
function handleSearch(event) {
    fetch('http://127.0.0.1:8081/api/scrape/' + keyword.value)
    .then(response => {
        response.text().then((results) => {
            search_result.innerHTML = results;
        });
    });
    event.preventDefault();
}

form.addEventListener('submit', handleSearch);