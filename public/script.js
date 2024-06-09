const form = document.getElementById('form');
const keyword = document.getElementById('keyword');
const search_result = document.getElementById('search-result');
    
function handleSearch(event) {
    fetch('http://127.0.0.1:8081/api/scrape/' + keyword.value)
    .then(response => {
        search_result.innerHTML = response.json();
    })
    .catch(error => {
        search_result.innerHTML = 'Your search has failed: ' + error;
    });
    event.preventDefault();
}

form.addEventListener('submit', handleSearch);