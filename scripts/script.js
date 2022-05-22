// Ensimmäisellä sivun latauksella haetaan fakta, ja jos merkkimäärä on liian pitkä, haetaan uudelleen.
getApi();

function getApi() {

    //let i = 5;
    fetch('https://api.math.tools/numbers/nod')
    .then(response => response.json())
    .then(
        data => {
            document.getElementById('api-here').innerHTML = data.contents.nod.numbers.number + "<br>" + 
            "Binary: " + data.contents.nod.numbers.bases.binary.value + "<br>" +
            "Roman: " + data.contents.nod.numbers.numerals.roman.value;
            document.getElementById('api-here').innerHTML += "Binary: " + data.contents.nod.numbers.bases.hexadecimal.value;
            //document.getElementById('api-here').innerHTML += "Roman: " + data.contents.nod.numbers.numerals.roman.name;
            //document.getElementById('api-here').innerHTML += "Roman: " + data.contents.nod.numbers.numerals.roman.value;
            // oli 34778 lauantaina
            // data.contents.nod.numbers.names.cardinal.value = on se numero kirjoitettuna

            //document.getElementById('api-here').innerHTML = data.cotents.result;
            //document.getElementById('api-here').innerHTML = data.cotents.number;
            //document.getElementById('api-here').innerHTML = JSON.stringify(data);
           
        });
    
    
    
    
    
    // fetch('http://numbersapi.com/random/trivia?json')
    //     .then(response => response.json())
    //     .then(data => {
    //         let apiText = data.text;
            
    //         if (apiText.length < 100) {
    //             document.getElementById('api-here').innerHTML = apiText;
    //         } else {
    //             getApi();
    //         }
    //     });    
}


// siivoa jos et laita nappia ja katso tuo merkkimäärä kuntoon