import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Container from "@/components/Container";
import { HeaderVisibilityProvider } from "@/context/HeaderVisibilityContext";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Dongalak",
};

export default async function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <HeaderVisibilityProvider>
      <div className={`mt-6 w-full`}>
        <Container>
          <Header session={session} />
        </Container>
        {children}
        {modal}
        <Footer />
      </div>
    </HeaderVisibilityProvider>
  );
}
