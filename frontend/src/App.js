import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

// swiper css
import { Suspense } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/virtual";
import { AdminRoutes } from "./route/AdminRoutes";
import { DefaultRoutes } from "./route/DefaultRoutes";
import { SuperAdminRoutes } from "./route/SuperAdminRoutes";

function App() {
  let { user } = useSelector((state) => state?.userReducer);

  const Role = {
    admin: SuperAdminRoutes,
    organizer: AdminRoutes,
  };
  let AppRoutes = Role[user?.role] ?? DefaultRoutes;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Router>
        <AppRoutes />
      </Router>
    </Suspense>
  );
}

export default App;
