import { useAuth } from "../Context/AuthContext";
import "./MyPage.scss";

export default function MyPage() {
  const { session } = useAuth();
  const user = session.user;

  return (
    <div className="page mypage">
      <header className="page-header">
        <h2>마이페이지</h2>
        <p>내 계정 정보를 아래에서 확인할 수 있어요.</p>
      </header>

      <section className="mypage-section">
        <h3>계정 정보</h3>

        <div className="info-list">
          <div className="info-item">
            <span className="label">이메일</span>
            <span className="value">{user.email}</span>
          </div>

          <div className="info-item">
            <span className="label">가입일</span>
            <span className="value">
              {new Date(user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
