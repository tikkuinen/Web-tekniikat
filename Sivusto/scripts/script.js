getApi();

// siivoa jos et laita nappia

// let apiButton = document.getElementById("api-button");
// apiButton.addEventListener("click", getApi);

function getApi() {
    fetch('http://numbersapi.com/random/trivia?json')
        .then(response => response.json())
        .then(data => {
            let apiText = data.text;
            
            if (apiText.length < 100) {
                document.getElementById('api-here').innerHTML = apiText;
            } else {
                getApi();
            }
        });    
}