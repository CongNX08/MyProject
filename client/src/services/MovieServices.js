import axios from "axios";
const fetchAllMovie = () => {
  return axios.get("https://localhost:7052/api/Movie");
};

export { fetchAllMovie };
