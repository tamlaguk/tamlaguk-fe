import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import ReviewPage from "./pages/reviewPage";
import TourPage from "./pages/tourPage";
import FoodPage from "./pages/foodPage";
import LeisurePage from "./pages/leisurePage";
import UserPage from "./pages/userPage";
import UploadReviewPage from "./pages/uploadReviewPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/tour" element={<TourPage />} />
        <Route path="/leisure" element={<LeisurePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/uploadReview" element={<UploadReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;