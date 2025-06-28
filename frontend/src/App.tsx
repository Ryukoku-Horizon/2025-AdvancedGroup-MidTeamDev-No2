import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages';
import Login from './pages/login';
import Search from './pages/search';
import Request from './pages/request';
import Comp from './pages/comp';
import Admin from './pages/admin';
import ManageCircle from "./pages/manage/circle";
import CirclePage from "./pages/circles/circlePage";
import EditProfile from "./pages/manage/editProfile";
import FQA from "./pages/fqa";
import AIDiagnosis from "./pages/ai-diagnosis";
import EditPage from "./pages/manage/pageEdit";
import ScrollToTop from "./components/scrollToTop";

function App() {
  return (
    <BrowserRouter basename="/ryukoku-circle-hub">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request" element={<Request />} />
        <Route path="/comp" element={<Comp />} />
        <Route path="/fqa" element={<FQA />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/manage/:id" element={<ManageCircle />} />
        <Route path="/manage/:id/editProfile" element={<EditProfile />} />
        <Route path="/manage/:id/editPage" element={<EditPage />} />
        <Route path="/circles/:id" element={<CirclePage />} />
        <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
