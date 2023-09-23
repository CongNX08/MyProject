import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoutes";
import MovieList from "../pages/Movie/MovieList";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<MovieList />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
