// Virheilmoitukset ja tulosilmoitukset
const ERRORNUM = "Syötä vain numeroita!";
const ERRORLENGTH = "Syötä vain yksi numero!";

const BESTRESULT = "Onnea! Pärjäsit niin hyvin, että saat kokonaisen kakun!";
const MEDIUMRESULT = "Meni tosi hyvin, saat näin ison palan kakkua!";
const POORRESULT = "Harmi, tarvitset lisää harjoittelua. Saat kuitenkin pienen palan kakkua!";

// Kuvat 
const YES = '<img src="../sivusto/images/yes.png" alt="correct" class="img-fluid">';
const NO = '<img src="../sivusto/images/no.png" alt="wrong" class="img-fluid">';

const SMALLCAKE = '<img src="../sivusto/images/smallcake.png" alt="small_cake" class="img-fluid">';
const MEDIUMCAKE = '<img src="../sivusto/images/mediumcake.png" alt="medium_cake" class="img-fluid">';
const BIGCAKE = '<img src="../sivusto/images/bigcake.png" alt="big_cake" class="img-fluid">';

// haettu W3Schools-sivustolta 22.4.2022 https://www.w3schools.com/JS/js_random.asp
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Pelin osille luodaan muuttujat
let instructions = document.getElementById("instructions");
let imageBox = document.getElementById("img-box");
let question = document.getElementById("question");

let answerSection = document.getElementById("answer");
let answerField = document.getElementById("answer-field");
let answerImage = document.getElementById("answer-image");

let counterSpan = document.getElementById("counter");
let rightnessCheck = document.getElementById("rightness");

// Nappien muuttujat ja niille event listenerit
let startButton = document.getElementById("start");
startButton.addEventListener("click", startGame);

let nextButton =  document.getElementById("next");
nextButton.addEventListener("click", nextQuestion);

let checkButton =  document.getElementById("check");
checkButton.addEventListener("click", checkAnswer);

// Laskujen luontiin, määrään ja tuloksiin tarvittavat muuttujat
let counter = 1;
let rightCounter = 0;
let firstNumber = 0;

/*
Funktion startGame aloittaa pelin aloita-napista. Se piilottaa samalla aloita-napin ja ohjeet, ja tuo näkyviin pelin muut osat. Funktio myös arpoo ensimmäisen kysymyksen luvun ja tulostaa sen kysymyskenttään.
*/
function startGame() {
    startButton.classList.add("d-none");
    instructions.classList.add("d-none");

    let gamePart = document.querySelectorAll(".game-part");

    for (elem of gamePart) {
        elem.classList.remove("d-none");
    }

    firstNumber = getRndInteger(1,9);
    printCalc();
}

// Tällä funktiolla testataan, onko vastauskenttään vastattu, jolloin tarkista-nappi vapautuu.
answerField.oninput = function() { 
    checkButton.classList.remove("disabled");
}

/*
Funktio nextQuestion toimii kun painetaan seuraava-nappia. Funktio tyhjentää kaiken edeltävän tiedon, ja luo uuden kysymyksen. For-loopilla tehdään tarkistus, että sama numero ei tule arvotuksi kahdella peräkkäisellä kerralla. Samalla laskuri laskee kuinka moneen tehtävään on vastattu. Lisäksi tämä funktio disabloi seuraava-napin, jotta sitä ei voi painaa ennen laskun tarkistamista.
*/
function nextQuestion() {
    answerField.value = "";
    let currentNumber = getRndInteger(1,9);

    for (let i = 0; firstNumber == currentNumber; i++) {
        currentNumber = getRndInteger(1,9);
    }
    firstNumber = currentNumber;
    printCalc();
    
    imageBox.classList.add("d-none");
    answerSection.classList.remove("d-none");
    counter++;
    counterSpan.textContent = "Kysymys " + counter + "/" + 10;
    nextButton.classList.add("disabled");
}

/* 
Funktio checkAnswer toimii kun painetaan tarkista-napppia. Tämä funktio tarkistaa onko vastaus kirjain tai liian pitkä numero, tai onko vastaus oikein vai ei. Tässä myös tyhjennetään vastauskenttää, vaihdetaan nappien disablointistatusta. Tämä toimii myös visan loppumisen tarkastajana, eli kun kysymykset on kaikki menneet, tämä funktio siirtää käyttäjän loppusivulle.
*/
function checkAnswer() {
    let input = answerField.value;
    let answer = 10 - firstNumber;

    if (isNaN(input) === true) {
        showError();
        rightnessCheck.textContent = ERRORNUM;
        answerField.value = "";
        return;
    }
    
    if (input.length > 1) {
        showError();
        rightnessCheck.textContent = ERRORLENGTH;
        answerField.value = "";
        return;
    }
        
    if (input == answer) {
        showCheckResult();
        rightnessCheck.textContent = "Oikein!";
        answerImage.innerHTML = YES;
        rightCounter++;
        answerSection.classList.add("d-none"); 
        
    } else {
        showCheckResult();
        rightnessCheck.textContent = "Väärin, oikea vastaus on " + answer + " !";
        answerImage.innerHTML = NO;
        answerField.value = "";
        answerSection.classList.add("d-none");
    }

    nextButton.classList.remove("disabled");
    checkButton.classList.add("disabled");
    answerField.value = "";

    if (counter > 2) { // oli ysi
        nextButton.innerText = "Tulokset";
        nextButton.removeEventListener("click", checkAnswer);
        nextButton.addEventListener("click", showResults); 
    }
}

/* Funktion showResults näyttää loppusivun ja tulokset. Se piilottaa muut pelin osat. Funktio näyttää myös tekstin ja kakun kuvan pisteiden määrän perusteella. Yritä uudelleen -toiminta on tehty html-tiedoston puolella.
*/
function showResults() {
    let gamePart = document.querySelectorAll(".game-part");
    let endPart = document.querySelectorAll(".end-part");
    let resultText = document.getElementById("result-text");
    let resultImage = document.getElementById("result-img");

    for (elem of gamePart) {
        elem.classList.add("d-none");
    }

    for (elem of endPart) {
        elem.classList.remove("d-none");
    }

    if (rightCounter > 8) {
        resultImage.innerHTML = BIGCAKE;
        resultText.innerHTML = "<span>" + rightCounter + "/" + 10 + "</span>" + "<br>" + BESTRESULT;
    } else if (rightCounter > 4) {
        resultImage.innerHTML = MEDIUMCAKE;
        resultText.innerHTML = "<span>" + rightCounter + "/" + 10 + "</span>" + "<br>" + MEDIUMRESULT;
    } else {
        resultImage.innerHTML = SMALLCAKE;
        resultText.innerHTML = "<span>" + rightCounter + "/" + 10 + "</span>" + "<br>" + POORRESULT;
    }
}

// Tämä funktio tulostaa kysymyskenttään uuden kysymyksen.
function printCalc() {
    question.innerHTML = "Mikä luku puuttuu?" + "<br>" + firstNumber + " + " + " ? = " + 10;
}

// Tämä funktio näyttää virheviestin eli piilottaa ja näyttää osia, sekä lisää error-luokan.
function showError() {
    imageBox.classList.remove("d-none");
    rightnessCheck.classList.remove("d-none");
    answerImage.classList.add("d-none");
    imageBox.classList.add("error");
}

// Tämä funktio näyttää tarkistusviestin eli piilottaa ja näyttää osia.
function showCheckResult() {
    imageBox.classList.remove("d-none");
    answerImage.classList.remove("d-none");
    rightnessCheck.classList.remove("d-none");
    imageBox.classList.remove("error");
}