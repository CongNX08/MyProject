import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllGenre } from "../../services/GenreServices";
import { postCreateMovie } from "../../services/MovieServices";
import { toast } from "react-toastify";
import FileBase64 from "react-file-base64";
function ModalAddNew(props) {
  const { show, handleClose, handleUpdateMovie } = props;
  const [genreList, setgenreList] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [ratingPoint, setRatingPoint] = useState("");
  const [genreId, setGenreId] = useState("");
  const [image, setImage] = useState("");
  // const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    let res = await fetchAllGenre();
    setgenreList(res);
  };

  const handleSelectImage = (base64Files) => {
    setImage(base64Files.base64);
  };

  const handleSaveMovie = async () => {
    console.log(image);
    let res = await postCreateMovie(
      title,
      description,
      year,
      ratingPoint,
      genreId,
      image
    );
    if (res) {
      handleClose();
      setTitle("");
      setDescription("");
      setYear("");
      setRatingPoint("");
      setGenreId("");
      setImage("");
      handleUpdateMovie({
        // Gọi handleUpdateMovie để thêm phim vào danh sách
        movieId: res.movieId, // Đảm bảo rằng bạn có thông tin cần thiết của phim
        title,
        description,
        year,
        ratingPoint,
        genreId,
        image,
      });
      toast.success("Movie added successfully");
    } else {
      toast.error("Something went wrong");
    }
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
                onChange={(event) => setGenreId(event.target.value)}
              >
                <option defaultValue>Open this select menu</option>
                {genreList.map((item) => (
                  <option key={item.genreId} value={item.genreId}>
                    {item.description}
                  </option>
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
              <label>RatingPoint</label>
              <input
                type="number"
                className="form-control"
                value={ratingPoint}
                onChange={(event) => setRatingPoint(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <FileBase64 multiple={false} onDone={handleSelectImage} />
              {image && (
                <div>
                  <div className="d-flex justify-content-center">
                    <img alt="not found" width={"100px"} src={image} />
                  </div>
                  <br />
                  <button
                    className="btn-danger mt-3"
                    onClick={() => setImage(null)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveMovie}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;
