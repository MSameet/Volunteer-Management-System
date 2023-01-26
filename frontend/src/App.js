import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./route";

// swiper css
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
