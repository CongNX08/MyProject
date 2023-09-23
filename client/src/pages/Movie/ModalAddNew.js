import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
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
  const [genreId, setGenreId] = useState(1);
  const [image, setImage] = useState("");

  const [validated, setValidated] = useState(false);

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

  const checkIfDataIsValid = () => {
    // Kiểm tra tính hợp lệ của các trường dữ liệu
    if (!title || !description || !genreId || !year || !ratingPoint || !image) {
      // Nếu có bất kỳ trường nào không hợp lệ, trả về false
      return false;
    }

    // Kiểm tra thêm các điều kiện khác nếu cần

    return true; // Nếu tất cả các trường đều hợp lệ, trả về true
  };

  const handleSaveMovie = async (event) => {
    console.log(
      "title:",
      title,
      "description:",
      description,
      "Year:",
      year,
      "Rate:",
      ratingPoint,
      "genID:",
      genreId,
      "Image:",
      image
    );
    if (!title || !description || !genreId || !year || !ratingPoint || !image) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      toast.error("Please fill in all fields");
      return;
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidated(false);
      let res = await postCreateMovie(
        title,
        description,
        year,
        ratingPoint,
        genreId,
        image
      );
      console.log(res);
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
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSaveMovie}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid title.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                required
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid description
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <InputGroup hasValidation>
                <Form.Select
                  onChange={(event) => setGenreId(event.target.value)}
                  required
                >
                  {genreList.map((item) => (
                    <option key={item.genreId} value={item.genreId}>
                      {item.description}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please choose a genre.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Year"
                required
                value={year}
                onChange={(event) => setYear(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid year.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>RatingPoint</Form.Label>
              <Form.Control
                type="number"
                placeholder="RatingPoint"
                required
                value={ratingPoint}
                onChange={(event) => setRatingPoint(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid RatingPoint.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Image</Form.Label>
              <FileBase64
                multiple={false}
                onDone={handleSelectImage}
                required
              />
              {image && (
                <div>
                  <div className="d-flex justify-content-center">
                    <img alt="not found" width={"100px"} src={image} />
                  </div>
                  <br />
                  <button
                    className="btn-danger my-3"
                    onClick={() => setImage(null)}
                  >
                    Remove
                  </button>
                </div>
              )}
              <Form.Control.Feedback type="invalid">
                Please provide image
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Save Change </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;
