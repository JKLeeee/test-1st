export const metadata = {
  title: "헤이포춘 | AI 사주 분석",
  description: "뻔한 운세 말고, 진짜 너에 대한 이야기.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700;900&family=Noto+Sans+KR:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#09090b" }}>
        {children}
      </body>
    </html>
  );
}
