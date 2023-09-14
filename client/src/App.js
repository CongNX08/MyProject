import "./App.css";
import Header from "./layout/Header/Header";
import MovieList from "./pages/Movie/MovieList";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <MovieList />
        </Container>
      </div>
    </>
  );
}

export default App;
