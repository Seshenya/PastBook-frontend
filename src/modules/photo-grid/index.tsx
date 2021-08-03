import React from "react";
import { Card, Col, Row } from "react-bootstrap";

interface Props {
  selectedPhotogrid: Array<any>;
  edit: () => void;
}

// PhotoGridView page renders the all the photos uploaded by the user.
// User can select the favourites in order and save it.
const PhotoGridView: React.FunctionComponent<Props> = ({ edit, selectedPhotogrid }) => {
  const editPhotoList = () => {
    edit();
  }

  return (
    <div>
      <div className="photogrid-header">
        <h5>Selected Photos</h5>
        <div className="photogrid-button">
          <button type="button" className="confirm-button" onClick={editPhotoList}>Edit grid</button>
        </div>
      </div>
      <div>
        <Row>
          {selectedPhotogrid.map((item: any, index: any) => (
            <Col xs={12} md={6} lg={3} style={{ marginBottom: '50px', display: "flex", justifyContent: "center", paddingLeft: 0, paddingRight: 0 }} key={'photo' + index}>
              <Card style={{ width: '250px', height: ' 300px' }} border="light" bg='light' text='light'
              >
                <Card.Img style={{ width: '250px', height: ' 300px' }} src={item} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PhotoGridView;