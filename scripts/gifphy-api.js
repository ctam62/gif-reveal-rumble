const apiKey = "MHYkOwPbcFBE8NuZlcYAIF7JBCB77Q4s";

class GiphyApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "https://api.giphy.com/v1/gifs/search/tags";
    }

    getGifs() {
        const fetchGifs = async () => {
            try {
                const response = await axios.get(`${this.baseURL}?api_key=${this.apiKey}&q=happy&limit=6&offset=0`);
                console.log(response.data);
            } catch (error) {
                console.log("Error", error);
            }
        }

        return fetchGifs();
    }
}

const gifApi = new GiphyApi(apiKey);
gifApi.getGifs();
