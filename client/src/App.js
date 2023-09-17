import "./App.css";
import Header from "./layout/Header/Header";
import MovieList from "./pages/Movie/MovieList";
import { Container } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <MovieList />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
