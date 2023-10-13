const apiKey = "MHYkOwPbcFBE8NuZlcYAIF7JBCB77Q4s";

class GiphyApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "https://api.giphy.com/v1/gifs/search";
    }

    getGifs(limit) {
        const fetchGifs = async () => {
            try {
                const response = await axios.get(`${this.baseURL}?api_key=${this.apiKey}&q=happy&limit=${limit}&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`);
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
gifApi.getGifs(3);
