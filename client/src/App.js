import "./App.css";
import Header from "./layout/Header/Header";
import MovieList from "./pages/Movie/MovieList";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./pages/Login/Login";
function App() {
  return (
    <>
      <Header />
      <MovieList />
      <Login />
    </>
  );
}

export default App;
