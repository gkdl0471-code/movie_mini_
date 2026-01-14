import { useState } from "react";
import { supabase } from "../supabase";
import toast from "react-hot-toast";
import "./ResetPassword.scss";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) {
      toast.error("이메일을 입력해주세요");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://oz-15-react-mini-e1vl.vercel.app/login",
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("비밀번호 재설정 이메일을 보냈습니다 📧");
  };

  return (
    <div className="loginPage">
      <div className="simplePage">
        <h2>비밀번호 찾기</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleReset}>비밀번호 재설정</button>
      </div>
    </div>
  );
}
