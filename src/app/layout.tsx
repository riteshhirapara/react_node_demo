import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
        <footer>
          <img className="fixed bottom-0 w-screen" src="/footer-1.svg" />
          <img className="fixed bottom-0 w-screen" src="/footer-2.svg" />
        </footer>
      </body>
    </html>
  );
}