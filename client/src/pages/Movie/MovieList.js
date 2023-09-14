import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { fetchAllMovie } from "../../services/MovieServices";
import ReactPaginate from "react-paginate";
function MovieList() {
  const [listMovies, setListMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getMovies(1);
  }, []);

  const getMovies = async (page) => {
    let res = await fetchAllMovie(page);
    let rawTotalPages = +res[0].countNumberofResult;
    let totalPagesAPI = Math.ceil(rawTotalPages / 3);
    setTotalPages(totalPagesAPI);
    console.log(res);
    console.log(totalPages);

    if (res) {
      setListMovies(res);
    }
  };
  const handlePageClick = (event) => {
    console.log(event.selected);
    getMovies(+event.selected + 1);
  };
  return (
    <>
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
                      className="img-fluid "
                      width="100px"
                      height="100px"
                    ></img>
                  </td>
                  <td>Action</td>
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
    </>
  );
}

export default MovieList;
