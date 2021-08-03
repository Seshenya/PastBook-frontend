import {postClient} from "../utils/api-client";

const saveSelectedPhotos = async (photoList:any) => {
    const response = await postClient('/photoGrid', photoList);
    return response;
}

export default saveSelectedPhotos;