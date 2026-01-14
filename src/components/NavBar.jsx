import { Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { useState, useMemo, useCallback } from "react";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { supabase } from "../supabase";

export function NavBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const {session, loading} = useAuth();

  const debounce = (func, delay) => { 
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useMemo(() =>
      debounce( keyword => {
        const trimmed = keyword.trim();

        if (!trimmed) {
          navigate("/");
          return;
        }

        navigate(`/search?movie=${encodeURIComponent(trimmed)}`);
      }, 200),
    [navigate]
  );

  const handleChangeDebounced = useCallback(
    (event) => {
      const value = event.target.value;
      setQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("로그아웃 되었습니다");
    navigate("/login");
  };

  return (
    <div className="topbar">
      <header className="flex">
        <div className="flex h-20">
          <Link to="/">
            <h1 className="text-[50px] font-bold bg-linear-to-b from-red-600 to-indigo-600 bg-clip-text text-transparent">
              OGV
            </h1>
          </Link>
          <img className="w-[100px]" src="/img/CGV로고.png" />
          <nav className="navbox">
            <Link to="/">홈</Link>
            <Link to="/genre">장르별</Link>
          </nav>
        </div>

        <div className="auth-buttons">
          <input
            type="text"
            placeholder="영화 제목 검색"
            value={query}
            onChange={handleChangeDebounced}
            className="search-input"
          />

        {!loading && !session && (
          <>
            <Link to="/login" className="login-btn">로그인</Link>
            <Link to="/signup" className="signup-btn">회원가입</Link>
          </>
        )}

        {!loading && session && (
          <>
            <Link to="/mypage" className="login-btn">마이페이지</Link>
            <button onClick={handleLogout} className="signup-btn">로그아웃</button>
          </>
        )}

        </div>
      </header>

    </div>
  );
}
