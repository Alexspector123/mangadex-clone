import axios from "axios";

const apiUrl = "https://api.mangadex.org/manga";
const proxyUrl = `http://localhost:5000/proxy?url=`;

export const fetchMangaById = async (id, retryCount = 0) => {
    try {
        const fullUrl = `${apiUrl}/${id}`;
        console.log(`Fetching Manga by ID: ${fullUrl}`);

        const response = await axios.get(`${proxyUrl}${encodeURIComponent(fullUrl)}`);
        return response.data.data ?? null; // Return single object or null
    } catch (error) {
        return handleRequestError(error, () => fetchMangaById(id, retryCount + 1), retryCount);
    }
};

export const fetchMangaByTitle = async (title, limit = 10, retryCount = 0) => {
    try {
        const queryParams = new URLSearchParams({ title, limit });
        const fullUrl = `${apiUrl}?${queryParams.toString()}`;
        console.log(`Searching Manga: ${fullUrl}`);

        const response = await axios.get(`${proxyUrl}${encodeURIComponent(fullUrl)}`);
        return response.data.data ?? [];
    } catch (error) {
        return handleRequestError(error, () => fetchMangaByTitle(title, limit, retryCount + 1), retryCount);
    }
};

const handleRequestError = async (error, retryFunction, retryCount) => {
    if (axios.isAxiosError(error) && error.response?.status === 429 && retryCount < 5) {
        console.warn(`Rate limit hit! Retrying in ${(retryCount + 1) * 2000}ms...`);
        await new Promise((resolve) => setTimeout(resolve, (retryCount + 1) * 2000));
        return retryFunction();
    }
    throw new Error(`Error fetching manga: ${error.message}`);
};