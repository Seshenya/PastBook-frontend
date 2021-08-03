import React, { useState, useEffect } from "react";
import SelectPhotoGrid from "../select-photo-grid";
import PhotoGridView from "../photo-grid";

import getSelectedPhotoGrid from "../../services/get-selected-photogrid";

interface Props { }

// Landing page renders the users favourite photos if the user has saved his favourites.
// Else a photo grid appears where the user can select the favourites.
const LandingPage: React.FunctionComponent<Props> = () => {
  const [selectedPhotos, setSelectedPhotos] = useState<Array<any>>([]);
  const [selectedPhotoGrid, setSelectedPhotoGrid] = useState<Array<any>>([]);


  const onConfirm = async (selectedPhotosList: any[]) => {
    setSelectedPhotos(selectedPhotosList);
  }

  const onEdit = async () => {
    setSelectedPhotoGrid([]);
  }

  useEffect(() => {
    getPhotoGrid();
  }, [selectedPhotos]);


  const getPhotoGrid = async () => {
    try {
      const response = await getSelectedPhotoGrid();
      if (response && response.photos && response.photos.length > 0) {
        await Promise.all(response.photos.map(async (photo: any) => {
          const gh = await (await fetch(photo.blob)).blob();
          const bloburl = URL.createObjectURL(gh);
          setSelectedPhotoGrid(selectedPhotos => [...selectedPhotos, bloburl]);
          return bloburl;
        }));
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p className="pastbook-title">PastBook</p>
      {(!selectedPhotoGrid || selectedPhotoGrid.length === 0) && (<SelectPhotoGrid confirm={onConfirm} />)}
      {selectedPhotoGrid && selectedPhotoGrid.length > 0 && (<PhotoGridView selectedPhotogrid={selectedPhotoGrid} edit={onEdit} />)}
    </div>

  );
};

export default LandingPage;