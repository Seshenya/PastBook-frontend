import {getClient} from "../utils/api-client";
import config from "../config";

//As user information is not handled through this app, a default value is used for user id
const getSelectedPhotoGrid = async () => {
    const response = await getClient(`/photoGrid/${config.data.currentUserId}`);
    return response;
}

export default getSelectedPhotoGrid;