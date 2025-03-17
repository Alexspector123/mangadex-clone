import ReactDOM from "react-dom/client";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homepage";
import ErrorPage from "./pages/ErrorPage";
import RecentlyAdded from "./pages/Titles/RecentlyAdded";
import LastestUpdates from "./pages/Titles/LastestUpdates";
import Random from "./pages/Titles/Random";
import RootLayout from "./layout/RootLayout";
import TitlesLayout from "./layout/TitlesLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="titles" element={<TitlesLayout />}> 
        <Route path="recent" element={<RecentlyAdded />} />
        <Route path="lastest" element={<LastestUpdates />} />
        <Route path="random" element={<Random />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
)

export default function App() {
  return (
    <div className="font-sans">
      <RouterProvider router = {router}/>
    </div>

  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);