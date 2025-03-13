import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from '/src/components/Navbar.jsx';
import SideBar from "./components/SideBar";
import AdvancedSearch from "./pages/Titles/AdvancedSearch";
import RecentlyAdded from "./pages/Titles/RecentlyAdded";
import LastestUpdates from "./pages/Titles/LastestUpdates";
import Random from "./pages/Titles/Random";

export default function App() {
  return (
    <div className="font-sans">
    <BrowserRouter>
      <Navbar />
      <SideBar>
      <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<HomePage />} />
            <Route path="titles" element={<AdvancedSearch />} />
            <Route path="recent" element={<RecentlyAdded />} />
            <Route path="lastest" element={<LastestUpdates />} />
            <Route path="random" element={<Random />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
      </Routes>
      </SideBar>
    </BrowserRouter>
    </div>

  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);