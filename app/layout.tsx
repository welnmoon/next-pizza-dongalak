import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Container from "@/components/Container";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Dongalak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} antialiased 
      w-full mt-6`}
      >
        <Container>
          <Header />
        </Container>
        {children}
      </body>
    </html>
  );
}
