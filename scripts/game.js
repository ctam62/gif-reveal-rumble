import { GiphyApi, apiKey } from "./giphy-api.js";

let seconds = 180; // 3 minutes
let countDownInterval = setInterval(countDownTimer, 1000);
const gifApi = new GiphyApi(apiKey);

const level = document.querySelector(".game__level");

const searchTerms = ["happy", "excited", "sad", "laughing"];
const shuffledArray = shuffleArray(searchTerms);


function displayCards(gifData) {
    const gameContent = document.querySelector(".game__content");
    const cardRow1 = createElementsWithClasses("div", ["game__card-row"]);
    const cardRow2 = createElementsWithClasses("div", ["game__card-row"]);

    const numGifs = Object.keys(gifData).length;

    // Create card randomIndexArray
    const randIndexArray = shuffleArray(createPairedArray(0, numGifs));

    // Assign Gifs randomly to cards
    randIndexArray.forEach((value, index) => {
        const cardBody = createCards(gifData, value);
        let cardRow = cardRow1;
        if (index <= numGifs - 1) {
            cardRow1.appendChild(cardBody);
        } else {
            cardRow2.appendChild(cardBody);
            cardRow = cardRow2;
        }
        if ((index + 1) % numGifs === 0) {
            gameContent.appendChild(cardRow);
        }
    });


    const cardsContainer = document.querySelector(".game__content");
    let clickCounter = 0;
    let matchCounter = 0;

    // Click event to flip cards
    cardsContainer.addEventListener("click", (event) => {
        event.preventDefault();
        clickCounter += 1;

        // Identify closest card when clicked event occurred
        const closestCard = event.target.closest(".game__card");

        // Add selected class to clicked card
        closestCard.classList.add("game__card--selected");
        closestCard.id = clickCounter;

        // Remove selected class from previously clicked card
        // do this only if second clicked card does not match first card
        if (clickCounter === 2) {
            clickCounter = 0;
            const previousCard = document.getElementById("1");
            const previousIframe = previousCard.childNodes[0].childNodes[0].childNodes[0];
            const currentCard = document.getElementById("2");
            const activeIframe = currentCard.childNodes[0].childNodes[0].childNodes[0];

            if (activeIframe.src !== previousIframe.src) {
                setTimeout(() => {
                    removeSelectedClass();
                    previousCard.id = 0;
                    currentCard.id = 0;
                }, 400);
            } else {
                matchCounter += 1;
                previousCard.classList.add("game__card--matched");
                currentCard.classList.add("game__card--matched");
                // Update score with each match
                const score = document.querySelector(".game__score-counter");
                score.textContent = `${Number(score.textContent) + 5}`
                previousCard.id = 0;
                currentCard.id = 0;
            }
        }

        if (matchCounter === numGifs) {
            // show play again button
            setTimeout(() => {
                gameContent.textContent = "";
                const newCardsButton = createElementsWithClasses("button", ["game__button", "game__level-same"]);
                newCardsButton.textContent = "Next Round";
                gameContent.appendChild(newCardsButton);

                const playAgain = document.querySelector(".game__level-same");

                playAgain.addEventListener("click", () => {
                    getCardsFromApi(shuffleArray(searchTerms));
                    newCardsButton.remove();
                    matchCounter = 0;
                });
            }, 1000);

        }
    });
}


function createCards(gifData, index) {

    const cardBody = createElementsWithClasses("article", ["game__card"]);
    const cardContent = createElementsWithClasses("div", ["game__card-content"]);

    const cardFront = createElementsWithClasses("div", ["game__card-front"]);
    const gifIframe = createElementsWithClasses("iframe", ["game__card-iframe"]);

    gifIframe.src = gifData[index].embed_url;
    gifIframe.frameBorder = "0";
    const cardBack = createElementsWithClasses("div", ["game__card-back"]);

    cardFront.appendChild(gifIframe);
    cardContent.appendChild(cardFront);
    cardContent.appendChild(cardBack);
    cardBody.appendChild(cardContent);

    return cardBody;
}

function createElementsWithClasses(element, classNames) {
    const containerElement = document.createElement(element);
    classNames.forEach((className) => {
        containerElement.classList.add(className);
    });

    return containerElement;
};


function createPairedArray(min, max) {
    const pairedArray = [];
    for (let i = 0; i < max; i++) {
        pairedArray.push(i);
    }

    pairedArray.push(...pairedArray);
    return pairedArray;
}

function shuffleArray(array) {
    let count = array.length, temp, index;

    // While there are elements in the array
    while (count > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * count);
        // Decrease count by 1
        count--;
        // And swap the last element with it
        temp = array[count];
        array[count] = array[index];
        array[index] = temp;
    }
    return array;
}

function removeSelectedClass() {
    const activeCards = document.querySelectorAll(".game__card--selected");
    activeCards.forEach((card) => {
        card.classList.remove("game__card--selected");
        card.id = 0;
    });
};

function createGameOverElements() {
    const contentContainer = createElementsWithClasses("div", ["gameover"]);
    const header = createElementsWithClasses("h2", ["gameover__header"]);
    const buttonContainer = createElementsWithClasses("div", ["gameover__button-container"]);
    const tryAgainButton = createElementsWithClasses("button", ["gameover__button", "game__level-same"]);
    const levelText = createElementsWithClasses("p", ["gameover__text"]);
    const easyButton = createElementsWithClasses("button", ["gameover__button", "game__level-easy"]);
    const mediumButton = createElementsWithClasses("button", ["gameover__button", "game__level-medium"]);
    const hardButton = createElementsWithClasses("button", ["gameover__button", "game__level-hard"]);

    header.textContent = "GAME OVER";
    tryAgainButton.textContent = "Play Again";
    levelText.textContent = "Select another level";
    easyButton.textContent = "Easy";
    mediumButton.textContent = "Medium";
    hardButton.textContent = "Hard";

    buttonContainer.appendChild(tryAgainButton);
    buttonContainer.appendChild(levelText);
    buttonContainer.appendChild(easyButton);
    buttonContainer.appendChild(mediumButton);
    buttonContainer.appendChild(hardButton);

    contentContainer.appendChild(header);
    contentContainer.appendChild(buttonContainer);

    return contentContainer;
};

function countDownTimer() {
    let minutes = Math.round((seconds - 30) / 60),
        remainingSeconds = seconds % 60;

    if (remainingSeconds < 10) {
        remainingSeconds = `0${remainingSeconds}`;
    }

    const timer = document.querySelector(".game__timer-countdown");
    timer.textContent = `${minutes}:${remainingSeconds}`;

    if (seconds < 6) {
        timer.classList.add("game__timer--danger");
    } else {
        timer.classList.remove("game__timer--danger");
    }

    if (seconds === 0) {
        clearInterval(countDownInterval);

        let gameSection = document.querySelector(".game__content");

        // Clear existing game content
        gameSection.textContent = "";

        // Add game over content
        const gameOverContent = createGameOverElements();
        gameSection.appendChild(gameOverContent);

        const easyLevel = document.querySelector(".game__level-easy");
        const mediumLevel = document.querySelector(".game__level-medium");
        const hardLevel = document.querySelector(".game__level-hard");

        easyLevel.addEventListener("click", () => {
            window.location.href = "./../pages/gameboard-easy.html";
        });

        mediumLevel.addEventListener("click", () => {
            window.location.href = "./../pages/gameboard-medium.html";
        });

        hardLevel.addEventListener("click", () => {
            window.location.href = "./../pages/gameboard-hard.html";
        });

        const playAgain = document.querySelector(".game__level-same");

        if (level.textContent.toLowerCase() === "medium") {
            mediumLevel.remove();
        } else if (level.textContent.toLowerCase() === "hard") {
            hardLevel.remove();
        } else {
            easyLevel.remove();
        }

        playAgain.addEventListener("click", () => {
            getCardsFromApi(shuffleArray(searchTerms));
            gameOverContent.remove();
            seconds = 180;
        })

        countDownInterval = setInterval(countDownTimer, 1000);

    } else {
        seconds--;
    }
};


function getCardsFromApi(randomArray) {
    const getRandomGIFs = async () => {
        try {
            // Check if difficulty level
            if (level.textContent.toLowerCase() === "medium") {
                const getResponse = await gifApi.getGifs(randomArray[0], 4);
                displayCards(getResponse);
            } else if (level.textContent.toLowerCase() === "hard") {
                const getResponse = await gifApi.getGifs(randomArray[0], 6);
                displayCards(getResponse);
            } else {
                const getResponse = await gifApi.getGifs(randomArray[0], 3);
                displayCards(getResponse);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return getRandomGIFs();
}


getCardsFromApi(shuffledArray);
