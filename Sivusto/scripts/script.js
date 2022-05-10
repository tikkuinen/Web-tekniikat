fetch('http://numbersapi.com/random/trivia?json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('api-here').innerHTML = data.text;

    });