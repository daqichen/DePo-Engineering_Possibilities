import { Container } from "react-bootstrap";

import NavBar from "./components/NavBar";
import ForecasterHomes from './pages/Forecaster'

import "./App.css";

function App() {
  return (
    <div>
      <Container fluid className="App">
        <NavBar />
        <Container fluid>
         <ForecasterHomes/>
        </Container>
      </Container>
    </div>
  );
}

export default App;
