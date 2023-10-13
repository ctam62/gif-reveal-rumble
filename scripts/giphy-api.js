const apiKey = "MHYkOwPbcFBE8NuZlcYAIF7JBCB77Q4s";

class GiphyApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "https://api.giphy.com/v1/gifs/search";
    }

    getGifs(search, limit) {
        console.log(search);
        const fetchGifs = async () => {
            try {
                const response = await axios.get(`${this.baseURL}?api_key=${this.apiKey}&q=${search}&limit=${limit}&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`);
                const gifData = response.data.data;
                console.log(gifData);
                displayCards(gifData);
            } catch (error) {
                console.log("Error", error);
            }
        }

        return fetchGifs();
    }
}

const gifApi = new GiphyApi(apiKey);

const level = document.querySelector(".game__level");

const searchTerms = ["happy", "excited", "sad", "laughing"];
const shuffledArray = shuffleArray(searchTerms);
// Check if difficulty level
if (level.textContent.toLowerCase() === "medium") {
    gifApi.getGifs(shuffledArray[0], 4);
} else if (level.textContent.toLowerCase() === "hard") {
    gifApi.getGifs(shuffledArray[0], 6);
} else {
    gifApi.getGifs(shuffledArray[0], 3);
}
