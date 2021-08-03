import fetchClient from "../utils/fetch-client";
import config from '../config';

const getAllPhotos = async () => {
    const response = await fetchClient(config.data.photosUrl);
    return response;
}

export default getAllPhotos;