import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllGenre } from "../../services/GenreServices";
function ModalAddNew(props) {
  const { show, handleClose } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenres] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    let res = await fetchAllGenre();
    setGenres(res);
    console.log(res);
  };

  return (
    <>
      {" "}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option defaultValue>Open this select menu</option>
                {genre.map((item) => (
                  <option key={item.genreId}>{item.description}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                className="form-control"
                value={year}
                onChange={(event) => setYear(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              {selectedImage && (
                <div>
                  <div className="d-flex justify-content-center">
                    <img
                      alt="not found"
                      width={"100px"}
                      src={URL.createObjectURL(selectedImage)}
                    />
                  </div>
                  <br />
                  <button
                    className="btn-danger mt-3"
                    onClick={() => setSelectedImage(null)}
                  >
                    Remove
                  </button>
                </div>
              )}

              <br />

              <input
                type="file"
                name="myImage"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;
