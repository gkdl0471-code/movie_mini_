import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Popular from "./pages/Popular";
import Latest from "./pages/Latest";
import Genre from "./pages/Genre";
import Search from "./pages/Search";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPopularMovies } from "./RTK/thunk";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import FindEmail from "./pages/FindEmail";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import { AuthProvider } from "./Context/AuthContext";
import MyPage from "./pages/MyPage";

function App() {
  const posterURL = "https://image.tmdb.org/t/p/w500";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularMovies(1));
  }, [dispatch]);

  return (
    <>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home posterURL={posterURL} />} />
            <Route path="/popular" element={<Popular posterURL={posterURL} />} />
            <Route path="/latest" element={<Latest posterURL={posterURL} />} />
            <Route path="/genre" element={<Genre posterURL={posterURL} />} />
            <Route path="/detail/:id" element={<Detail posterURL={posterURL} />} />
            <Route path="/search" element={<Search posterURL={posterURL} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/find-email" element={<FindEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
