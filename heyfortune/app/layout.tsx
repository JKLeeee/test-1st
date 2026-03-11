import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "헤이포춘 | AI 사주 분석 · 궁합",
  description:
    "뻔한 운세 말고, 진짜 너에 대한 이야기. AI가 분석하는 현대적 사주 서비스.",
  openGraph: {
    title: "헤이포춘 — 너의 사주, 필터 없이",
    description: "3분이면 충분해. AI가 풀어주는 나만의 사주 리포트.",
    type: "website",
    locale: "ko_KR",
    siteName: "헤이포춘",
  },
  twitter: {
    card: "summary_large_image",
    title: "헤이포춘 — 너의 사주, 필터 없이",
    description: "3분이면 충분해. AI가 풀어주는 나만의 사주 리포트.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
