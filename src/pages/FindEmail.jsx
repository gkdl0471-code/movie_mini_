import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./FindEmail.scss";

export default function FindEmail() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleFind = () => {
    if (!phone) {
      toast.error("휴대폰 번호를 입력해주세요");
      return;
    }

    toast.success("가입 시 사용한 이메일로 안내를 보냈습니다 📧");
    navigate("/login");
  };

  return (
    <div className="loginPage">
      <div className="simplePage">
        <h2>아이디 찾기</h2>
        <input placeholder="휴대폰 번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button onClick={handleFind}>아이디 찾기</button>
      </div>
    </div>
  );
}