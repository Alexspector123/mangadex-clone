import axios from "axios";

const apiUrl = "https://api.mangadex.org/manga";
const proxyUrl = `http://localhost:5000/proxy?url=`;

export const fetchMangaData = async (params, retryCount = 0) => {
    try {
        const fullUrl = `${apiUrl}/${params.toString()}`;
        const response = await axios.get(`${proxyUrl}${encodeURIComponent(fullUrl)}`);
        return response.data.data;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response?.status === 429 && retryCount < 5) {
            console.warn(`Rate limit hit! Retrying in ${(retryCount+1)*2000}ms...`);
            await new Promise((resolve) => setTimeout(resolve, (retryCount+1)*2000));
            return fetchMangaData(params, retryCount+1);
        }
        else {
            throw new Error("Error fetching manga.");
        }
    }
}