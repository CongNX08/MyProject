import axios from "./customize-axios";
const fetchAllMovie = () => {
  return axios.get("Movie");
};

export { fetchAllMovie };
