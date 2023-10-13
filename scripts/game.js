

function displayCards(gifData) {
    const gameContent = document.querySelector(".game__content");
    const cardRow1 = createElementsWithClasses("div", ["game__card-row"]);
    const cardRow2 = createElementsWithClasses("div", ["game__card-row"]);

    // Create random card indexArray to assign gifs to
    const numGifs = Object.keys(gifData).length;
    const randIndexArray = shuffle(randomPairedArray(0, numGifs));

    console.log(shuffle(randomPairedArray(0, numGifs)));
    console.log(Object.keys(gifData).length);

    //check if easy, medium, hard level
    randIndexArray.forEach((value, index) => {
        const cardBody = createCards(gifData, value);
        let cardRow = cardRow1;
        if (index <= 2) {
            cardRow1.appendChild(cardBody);
        } else {
            cardRow2.appendChild(cardBody);
            cardRow = cardRow2;
        }
        if ((index + 1) % 3 === 0) {
            gameContent.appendChild(cardRow);
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


function randomPairedArray(min, max) {
    const pairedArray = [];
    for (let i = 0; i < max; i++) {
        pairedArray.push(i);
    }

    pairedArray.push(...pairedArray);
    return pairedArray;
}

randomPairedArray(0, 3);

function shuffle(array) {
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

