# 🔮 헤이포춘 (HeyFortune)

**너의 사주, 필터 없이** — AI 기반 무료 사주 분석 & 궁합 서비스

## ✨ 주요 기능

- **AI 사주 분석**: 이름 + 생년월일시 + 성별 입력 → 성격/재물/연애운 분석
- **궁합 분석**: 상대방 정보 입력 → 3단계 궁합 판정 (💔헤어져 / 🤔노력해 / 💍결혼해)
- **12지신 × 10간 조합**: 띠별 고유 아키타입 & 오행 에너지 분석
- **SNS 공유**: 카카오톡 / 인스타 스토리 / 링크 복사

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS-in-JS (Inline Styles)
- **Deploy**: Vercel

## 🚀 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/YOUR_USERNAME/heyfortune.git
cd heyfortune
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 4. 프로덕션 빌드

```bash
npm run build
npm run start
```

## 📁 프로젝트 구조

```
heyfortune/
├── app/
│   ├── globals.css      # 글로벌 스타일 (애니메이션, 리셋)
│   ├── layout.tsx       # 루트 레이아웃 (메타데이터, OG)
│   └── page.tsx         # 메인 앱 (전체 페이지 & 컴포넌트)
├── public/
│   └── favicon.ico
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🌐 Vercel 배포

1. [Vercel](https://vercel.com) 가입
2. GitHub 저장소 연결
3. **Deploy** 클릭 — 끝!

별도 환경변수 설정 없이 바로 배포됩니다.

## 📱 화면 구성

| 화면 | 설명 |
|------|------|
| 랜딩 | 서비스 소개 + CTA |
| 사주 입력 (4단계) | 이름 → 생년월일 → 시간 → 성별 |
| 로딩 | 원형 프로그레스 + 단계별 메시지 |
| 결과 | 스코어 바 + 성격/재물/연애 탭 + 공유 |
| 궁합 입력 (2단계) | 상대방 이름 → 생년월일 |
| 궁합 로딩 | 하트비트 애니메이션 |
| 궁합 결과 | 3단계 판정 + 점수 + 조언 |

## 📄 라이선스

MIT License
