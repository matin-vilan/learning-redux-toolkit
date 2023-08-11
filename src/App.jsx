import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Posts from "./store/posts/Posts";
import MainRoutes from "./routes/routes";
import "./assets/index.css";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;
