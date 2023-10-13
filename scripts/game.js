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

        // Identify the already selected card
        const activeCard = event.currentTarget.querySelector(".game__card--selected");
        const activeCardsLength = document.querySelectorAll(".game__card--selected").length;

        console.log("click counter:", clickCounter);
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
                }, 400);
            } else {
                matchCounter += 1;
                previousCard.classList.add("game__card--matched");
                currentCard.classList.add("game__card--matched");
                console.log("match counter:", matchCounter);
                const score = document.querySelector(".game__score-counter");
                score.textContent = `${Number(score.textContent) + 5}`
            }
        }

        if (matchCounter === numGifs) {
            // show play again button
            setTimeout(() => {
                gameContent.textContent = "";
                const newCardsButton = createElementsWithClasses("button", ["game__button", "game__level-same"]);
                newCardsButton.textContent = "Next Round";
                gameContent.appendChild(newCardsButton);

                });
            }, 1500);

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

// let seconds = 30;
let seconds = 180; // 3 minutes
let countDownInterval = setInterval(countDownTimer, 1000, seconds);

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
    }

    if (seconds === 0) {
        clearInterval(countDownInterval);
        // clear gameboard page
        let gameSection = document.querySelector(".game");

        // Clear existing game content
        gameSection.textContent = "";
        // Add game over content
        gameOverContent = createGameOverElements();
        gameSection.appendChild(gameOverContent);

    } else {
        seconds--;
    }
}


function createGameOverElements() {
    const contentContainer = createElementsWithClasses("h2", ["gameover"]);
    const header = createElementsWithClasses("h2", ["gameover__header"]);
    const buttonContainer = createElementsWithClasses("div", ["gameover__button-container"]);
    const tryAgainButton = createElementsWithClasses("button", ["gameover__button"]);
    const levelText = createElementsWithClasses("p", ["gameover__text"]);
    const mediumButton = createElementsWithClasses("button", ["gameover__button"]);
    const hardButton = createElementsWithClasses("button", ["gameover__button"]);

    header.textContent = "GAME OVER";
    tryAgainButton.textContent = "Play Again";
    levelText.textContent = "Select another level";
    mediumButton.textContent = "Medium";
    hardButton.textContent = "Hard";

    buttonContainer.appendChild(tryAgainButton);
    buttonContainer.appendChild(levelText);
    buttonContainer.appendChild(mediumButton);
    buttonContainer.appendChild(hardButton);

    contentContainer.appendChild(header);
    contentContainer.appendChild(buttonContainer);

    return contentContainer;
}
