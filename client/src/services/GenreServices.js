import axios from "./customize-axios";
const fetchAllGenre = (page) => {
  return axios.get(`Genre`);
};

export { fetchAllGenre };
