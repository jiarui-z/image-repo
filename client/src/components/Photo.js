import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteImage } from "../actions/photos";

const Photo = ({ name, id, dispatch }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    dispatch(deleteImage(id));
    setShow(false);
  };

  const download = (e) => {
    fetch(e.target.src, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${id}.jpg`); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Card className="photo">
        <Card.Img
          variant="top"
          src={`http://localhost:8080/images/${id}`}
          alt="Photo"
          onClick={(e) => download(e)}
        />
        <Button variant="primary" onClick={handleShow} className="close">
          X
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>Are you sure you want to delete this image?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
      <Card.Text className="name">{name}</Card.Text>
    </div>
  );
};

const mapStateToProps = (state) => ({
  photos: state.photos || [],
});

export default connect(mapStateToProps)(Photo);

