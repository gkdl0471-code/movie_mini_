# OGV Movie Mini Project


https://github.com/user-attachments/assets/257b2a69-1e90-40d1-b656-734a046265b2


React + Vite 기반의 영화 탐색 웹 애플리케이션입니다.  
TMDB API로 영화 데이터를 가져오고, Supabase Auth로 회원 인증(이메일/소셜 로그인)을 제공합니다.

## 프로젝트 개요

- **프로젝트명**: OGV Movie Mini
- **목표**: 영화 목록 탐색, 상세 조회, 검색, 인증 기능을 하나의 서비스 흐름으로 구현
- **핵심 포인트**
  - TMDB 인기 영화 데이터 연동
  - Redux Toolkit 기반 전역 상태 관리
  - Supabase 인증(이메일 로그인/회원가입, OAuth, 비밀번호 재설정)
  - 반응형 UI 구성(SCSS, Tailwind, Swiper)

## 주요 기능

- **홈 화면**
  - NEW/인기 캐러셀 노출
  - 카드 클릭 시 상세 페이지 이동
- **영화 탐색**
  - 인기/최신/장르별 페이지 제공
  - 검색어 기반 영화 필터링
  - `korean-regexp`를 활용한 한글 검색 매칭
- **상세 페이지**
  - 포스터, 배경, 평점, 장르, 줄거리 표시
  - YouTube 예고편 임베드 노출
- **인증**
  - 이메일 회원가입/로그인
  - Google, Kakao 소셜 로그인
  - 비밀번호 재설정 메일 발송
  - 로그인 상태 기반 네비게이션 제어
- **마이페이지**
  - 현재 로그인 사용자 계정 정보 확인

## 기술 스택

- **Frontend**: React 19, React Router, Vite
- **State Management**: Redux Toolkit, React Redux
- **Auth/Backend Service**: Supabase Auth
- **Styling**: SCSS, Tailwind CSS
- **UI Library**: Swiper, React Hot Toast
- **Utilities**: korean-regexp

## 라우트 구조

- `/` : 홈
- `/popular` : 인기 영화
- `/latest` : 최신 영화
- `/genre` : 장르별 영화
- `/detail/:id` : 영화 상세
- `/search?movie=키워드` : 검색 결과
- `/login` : 로그인
- `/signup` : 회원가입
- `/find-email` : 아이디 찾기(안내 페이지)
- `/reset-password` : 비밀번호 재설정
- `/mypage` : 마이페이지

## 폴더 구조

```bash
movie_mini_/
├─ public/
│  └─ img/
├─ src/
│  ├─ components/      # 레이아웃/네비게이션/카드/캐러셀 컴포넌트
│  ├─ pages/           # 라우트 페이지
│  ├─ RTK/             # slice, thunk, selector, store
│  ├─ Context/         # 인증 컨텍스트(AuthProvider)
│  ├─ hooks/           # 커스텀 훅(useMovieTrailer)
│  ├─ supabase.js      # Supabase 클라이언트
│  └─ App.jsx          # 라우트 엔트리
├─ index.html
├─ package.json
└─ vite.config.js
```

## 시작하기

### 1) 의존성 설치

```bash
npm install
```

### 2) 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 값을 설정하세요.

```bash
VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> `ResetPassword` 페이지의 `redirectTo` URL은 현재 코드에 고정값이 있으므로, 배포 환경에 맞게 수정이 필요할 수 있습니다.

### 3) 개발 서버 실행

```bash
npm run dev
```

브라우저에서 안내되는 로컬 주소(일반적으로 `http://localhost:5173`)에 접속합니다.

## 스크립트

- `npm run dev` : 개발 서버 실행
- `npm run build` : 프로덕션 빌드
- `npm run preview` : 빌드 결과 미리보기
- `npm run lint` : ESLint 검사

## 데이터 소스

- 영화 데이터: [TMDB API](https://www.themoviedb.org/documentation/api)
- 인증/세션: [Supabase Auth](https://supabase.com/docs/guides/auth)
