import { useEffect, useState } from "react";
import "./Login.scss";
import { supabase } from "../supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [rememberEmail, setRememberEmail] = useState(false);

  useEffect(() => {
    const saveEmail = localStorage.getItem("rememberEmail");
    if (saveEmail) {
      setEmail(saveEmail);
      setRememberEmail(true)
    }
  },[]);

const handleLogin = async (e) => {
  e.preventDefault();

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    toast.error("이메일과 비밀번호를 모두 입력해주세요");
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: trimmedEmail,
    password: trimmedPassword,
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  if (rememberEmail) {
    localStorage.setItem("rememberEmail", email);
  } else {
    localStorage.removeItem("rememberEmail");
  }

  toast.success("로그인 성공!");
  navigate("/");
};

const handleSocialLogin = async (provider) => {
  console.log("소셜 로그인 클릭:", provider);

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: "http://localhost:5173",
    },
  });

  if (error) {
    toast.error("소셜 로그인 실패");
  }
};

  return (
    <div className="loginPage">
      <div className="loginBox">
        <h2>LOGIN</h2>
        <input
          className="loginInput"
          type="text"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="loginInput"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="find-links">
          <label>
            <input
              type="checkbox"
              className="checkbox"
              checked={rememberEmail}
              onChange={(e) => setRememberEmail(e.target.checked)}
            />
            이메일 저장
          </label>
          <div>
          <span onClick={() => navigate("/find-email")}>아이디 찾기</span>
          {" | "}
          <span onClick={() => navigate("/reset-password")}>
            비밀번호 찾기
          </span>
        </div>
        </div>

        <button 
          className="loginBtn"
          onClick={handleLogin}
        >
          로그인
        </button>
        <p>
          계정이 없나요?{" "}
          <span onClick={() => navigate("/signup")}>회원가입</span>
        </p>
      </div>
      <div className="social-login">
        <div
          className="social-login-imgBox"
          alt="Google 로그인"
          onClick={() => handleSocialLogin("google")}
        >
          <img
            className="snsimg"
            src="/src/assets/google.png"
          />
          <p>구글 로그인</p>
        </div>

        <div
          className="social-login-imgBox"
          alt="Kakao 로그인"
          onClick={() => handleSocialLogin("kakao")}
        >
          <img 
            className="snsimg"
            src="/src/assets/kakao.png"
          />
          <p>카카오 로그인</p>
        </div>
      </div>


    </div>
  );
}
