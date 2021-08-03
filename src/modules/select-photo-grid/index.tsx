import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import getAllPhotos from "../../services/get-all-photos";
import saveSelectedPhotos from "../../services/save-selected-photogrid";
import LoadingSpinner from "../loader";
import config from '../../config';

interface Props {
  confirm: (selectedPhotosList: any[]) => void;
}

const blobToBase64 = async (blob: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

// SelectPhotoGrid page renders the user's favourite photos.
// User can edit his favourites by navigating to the photo select grid.
const SelectPhotoGrid: React.FunctionComponent<Props> = ({ confirm }) => {
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<any>>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<Array<any>>([]);
  const [checkboxDisabled, setCheckboxDisabled] = useState<boolean>(false);

  useEffect(() => {
    getUploadedPhotos();
  }, []);



  const getUploadedPhotos = async () => {
    try {
      const photos = await getAllPhotos();

      await Promise.all(photos.entries.map(async (photo: any) => {
        const blob = await fetch(photo.picture + "?nocache=" + photo.id).then(r => r.blob());
        const base64data = await blobToBase64(blob);
        setUploadedPhotos(uploadedPhotos => [...uploadedPhotos, ({ id: photo.id, bloburl: URL.createObjectURL(blob), blob: base64data })]);
        return blob;
      }));
      setCheckboxDisabled(false);
    } catch (error) {
      console.log(error);
    }
  }

  const addRemoveToPhotoList = async (photo: any) => {
    let photos = [...selectedPhotos];
    if (selectedPhotos.some(item => item.id === photo.id)) {
      const index = selectedPhotos.findIndex(item => item.id === photo.id);
      photos.splice(index, 1);
      setCheckboxDisabled(false);
    } else {
      photos.push(photo);
      if (photos.length === config.data.maxFavoritePhotos) {
        setCheckboxDisabled(true);
      }
    }
    setSelectedPhotos(photos);
  }

  const submitPhotoList = () => {
    saveSelectedPhotos(selectedPhotos);
    confirm(selectedPhotos);
  }

  return (
    <div>
      {uploadedPhotos && uploadedPhotos.length === 0 && (<LoadingSpinner />)}
      <div>
        {uploadedPhotos && uploadedPhotos.length > 0 && (
          <div>
            <div className="photogrid-header">
            <h5>Select photos for the grid</h5>
            <div className="photogrid-button">
              <button type="button" className="confirm-button" onClick={submitPhotoList}>Confirm</button> 
            </div>                     
            </div>
            <Row>
              {uploadedPhotos.map((item: any, index: any) => (
                <Col xs={12} md={6} lg={3} style={{ marginBottom: '50px', display: "flex", justifyContent: "center", paddingLeft: 0, paddingRight: 0 }} key={'photo' + index}>
                  <Card style={{ width: '250px', height: ' 300px' }} border="light" bg='light' text='light'
                  >
                    <Card.Img style={{ width: '250px', height: ' 300px' }} src={item.bloburl} />
                    <Card.ImgOverlay>
                      <Card.Text>
                        <div className="select-photos">
                        {(selectedPhotos.findIndex(photo => photo.id === item.id) + 1) > 0 && (<span style={{ color: '#000080' }}>{selectedPhotos.findIndex(photo => photo.id === item.id) + 1}</span>)}
                        <input disabled={checkboxDisabled && !selectedPhotos.some(photo => photo.id === item.id)} className="grid-checkbox" type="checkbox" id={index} name="image" onClick={() => addRemoveToPhotoList(item)}></input>
                       
                        </div>
                      </Card.Text>         
                    </Card.ImgOverlay>                    
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>

  );
};

export default SelectPhotoGrid;


