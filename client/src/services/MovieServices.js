import axios from "./customize-axios";
const fetchAllMovie = (page) => {
  return axios.get(`Movie?pageSize=5&pageNumber=${page}`);
};

const postCreateMovie = (
  title,
  description,
  year,
  ratingPoint,
  genreId,
  image
) => {
  return axios.post(`Movie`, {
    title,
    description,
    year,
    ratingPoint,
    genreId,
    image,
  });
};

const deleteMovie = (id) => {
  return axios.delete(`Movie?id=${id}`);
};
export { fetchAllMovie, postCreateMovie, deleteMovie };
