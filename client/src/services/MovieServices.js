import axios from "./customize-axios";
const fetchAllMovie = (page) => {
  return axios.get(`Movie?pageSize=3&pageNumber=${page}`);
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
export { fetchAllMovie, postCreateMovie };
