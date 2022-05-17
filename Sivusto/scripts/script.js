// Ensimmäisellä sivun latauksella haetaan fakta, ja jos merkkimäärä on liian pitkä, haetaan uudelleen.
getApi();

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


// siivoa jos et laita nappia ja katso tuo merkkimäärä kuntoon