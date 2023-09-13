import axios from "./customize-axios";
const fetchAllMovie = (page) => {
  return axios.get(`Movie?pageSize=3&pageNumber=${page}`);
};

export { fetchAllMovie };
