import ReactDOM from "react-dom/client";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TitlesLayout from "./layout/TitlesLayout";
import RecentlyAdded from "./pages/Titles/RecentlyAdded";
import LastestUpdates from "./pages/Titles/LastestUpdates";
import Random from "./pages/Titles/Random";
import Updates from "./pages/Follows/Updates";
import Library from "./pages/Follows/Library";
import FollowsLayout from "./layout/FollowsLayout";
import MDLists from "./pages/Follows/MDLists";
import MyGroup from "./pages/Follows/MyGroup";
import History from "./pages/Follows/History";
import Manga from "./pages/Mangas/Manga";
import ChapPage from "./pages/Chapter/ChapPage";
import ChapLayout from "./layout/ChapLayout";
import "./app.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="my" element={<FollowsLayout />}>
        <Route path="lists" element={<MDLists />} />
        <Route path="groups" element={<MyGroup />} />
        <Route path="history" element={<History />} />
      </Route>
      <Route path="titles" element={<TitlesLayout />}> 
        <Route path="recent" element={<RecentlyAdded />} />
        <Route path="lastest" element={<LastestUpdates />} />
        <Route path="random" element={<Random />} />
        <Route path="feed" element={<Updates />} />
        <Route path="follows" element={<Library />} />
        <Route path=":id" element= {<Manga/>} />
      </Route>
      <Route path="chapter" element={<ChapLayout />}>
        <Route path=":id/:page" element={<ChapPage />}/>
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