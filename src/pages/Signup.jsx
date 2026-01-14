import { useState } from "react";
import "./Signup.scss";
import { supabase } from "../supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleSignup = async () => {
    if (
      !name ||
      !gender ||
      !birth ||
      !phone ||
      !email ||
      !password ||
      !passwordCheck
    ) {
      toast.error("모든 항목을 입력해주세요");
      return;
    }

    if (password !== passwordCheck) {
      toast.error("비밀번호가 일치하지 않습니다");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email, password, options: { data: { name, gender, birth, phone } }
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("회원가입 성공! 이메일을 확인해주세요 📧");
    navigate("/login");
  };

  return (
    <div className="signupPage">
      <div className="signupBox">
        <h2>SIGN UP</h2>

        <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">성별 선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>

        <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
        <input placeholder="휴대폰번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <button onClick={handleSignup}>회원가입</button>

        <p>
          이미 계정이 있나요?{" "}
          <span onClick={() => navigate("/login")}>로그인</span>
        </p>
      </div>
    </div>
  );
}
