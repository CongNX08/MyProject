import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { deleteMovie } from "../../services/MovieServices";
import { fetchAllMovie } from "../../services/MovieServices";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";
function ModalDelete(props) {
  const navigate = useNavigate();
  const { show, handleClose, dataMovieDelete, handleDeleteMovieFromModel } =
    props;

  const confirmDelete = async () => {
    let res = await deleteMovie(dataMovieDelete.movieId);
    console.log(res);
    if (res && +res.statusCode === 204) {
      toast.success("deleted successfully");
      handleClose();
      handleDeleteMovieFromModel(dataMovieDelete);
    } else {
      toast.error("failed to delete");
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Do you want to delete this Movie?
            <br />
            <b>{dataMovieDelete.title}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
