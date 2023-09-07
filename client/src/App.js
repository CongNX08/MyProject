import "./App.css";
import Header from "./layout/Header/Header";
import MovieList from "./pages/Movie/MovieList";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <>
      <Header />
      <MovieList />
    </>
  );
}

export default App;
