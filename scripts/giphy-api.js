const apiKey = process.env.API_KEY;

class GiphyApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = `${process.env.API_URL}/v1/gifs/search`;
    }

    getGifs(search, limit) {
        const fetchGifs = async () => {
            try {
                const response = await axios.get(`${this.baseURL}?api_key=${this.apiKey}&q=${search}&limit=${limit}&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`);
                const gifData = response.data.data;
                return gifData;
            } catch (error) {
                console.log("Error", error);
            }
        }

        return fetchGifs();
    }
}

export { GiphyApi, apiKey };