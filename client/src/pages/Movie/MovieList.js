import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { fetchAllMovie } from "../../services/MovieServices";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalDelete from "./ModalDelete";
import _ from "lodash";

function MovieList() {
  const [listMovies, setListMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModelAddNew, setShowModalAddNew] = useState(false);

  const [isShowModelDelete, setIsShowModelDelete] = useState(false);
  const [dataMovieDelete, setDataMovieDelete] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getMovies(1);
  }, []);

  const getMovies = async (page) => {
    let res = await fetchAllMovie(page);
    let rawTotalPages = +res[0].countNumberofResult;
    let totalPagesAPI = Math.ceil(rawTotalPages / 5);
    setTotalPages(totalPagesAPI);

    if (res) {
      setListMovies([...res]);
    }
  };

  const handlePageClick = (event) => {
    console.log(event.selected);
    setCurrentPage(event.selected + 1);
    getMovies(+event.selected + 1);
  };

  const handleShowModalAddNew = () => {
    setShowModalAddNew(true);
  };
  const handleCloseModal = () => {
    setShowModalAddNew(false);
    setIsShowModelDelete(false);
  };
  const handleUpdateMovie = (movie) => {
    if (listMovies.length < 5) {
      setListMovies([...listMovies, movie]);
    } else {
      setTotalPages(totalPages + 1);
    }
  };

  const handleEditMovie = () => {};

  const handleDeleteMovie = (movie) => {
    setIsShowModelDelete(true);
    setDataMovieDelete(movie);
    console.log(movie);
  };

  const handleDeleteMovieFromModel = (movie) => {
    getMovies(currentPage);
    // console.log("check movie res", movie);
    // let cloneListMovies = _.cloneDeep(listMovies);

    // cloneListMovies = cloneListMovies.filter(
    //   (item) => item.movieId !== movie.movieId
    // );
    // console.log(cloneListMovies);
    // setListMovies(cloneListMovies);
  };
  return (
    <>
      <div className="d-flex justify-content-between m-3">
        <div>ListMovies</div>
        <button className="btn-success" onClick={() => handleShowModalAddNew()}>
          Add New
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Year</th>
            <th>RatingPoint</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listMovies &&
            listMovies.length > 0 &&
            listMovies.map((item, index) => {
              return (
                <tr key={item.movieId}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.genre}</td>
                  <td>{item.year}</td>
                  <td>{item.ratingPoint}</td>
                  <td>
                    <img
                      src={item.image}
                      alt="img"
                      width="100px"
                      height="120px"
                    ></img>
                  </td>
                  <td className="d-flex  ">
                    <button
                      className="btn-warning mx-3 "
                      onClick={() => handleEditMovie(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-danger"
                      onClick={() => {
                        handleDeleteMovie(item);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModelAddNew}
        handleClose={handleCloseModal}
        handleUpdateMovie={handleUpdateMovie}
      />

      <ModalDelete
        show={isShowModelDelete}
        handleClose={handleCloseModal}
        dataMovieDelete={dataMovieDelete}
        getMovies={getMovies}
        handleDeleteMovieFromModel={handleDeleteMovieFromModel}
      />
    </>
  );
}

export default MovieList;
