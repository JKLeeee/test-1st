export const metadata = {
  title: "헤이포춘 | AI 사주 분석",
  description: "뻔한 운세 말고, 진짜 너에 대한 이야기.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#09090b" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔮</text></svg>" />
      </head>
      <body style={{ margin: 0, background: "#09090b" }}>{children}</body>
    </html>
  );
}
