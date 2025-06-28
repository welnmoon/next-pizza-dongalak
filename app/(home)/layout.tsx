import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Container from "@/components/Container";
import { HeaderVisibilityProvider } from "@/context/HeaderVisibilityContext";

export const metadata: Metadata = {
  title: "Dongalak",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <HeaderVisibilityProvider>
      <div className={`mt-6 mb-6 w-full`}>
        <Container>
          <Header />
        </Container>
        {children}
        {modal}
      </div>
    </HeaderVisibilityProvider>
  );
}
