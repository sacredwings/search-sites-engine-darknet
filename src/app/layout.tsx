import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/app/global.sass'
import YandexMetrika from '@/component/metrika/yandex-metrika'
import GoogleAnalytics from '@/component/metrika/google-analytics'
import Navbar from '@/component/menu/navbar/client'

export const metadata: Metadata = {
  title: "Search sites engine darknet Ton | Tor",
  description: "Google search engine for domains adnl | ton | onion",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="ru">
      <body>
      <YandexMetrika/>
      <GoogleAnalytics/>
      <Navbar />
      {children}
      </body>
      </html>
  );
}
