import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Container from "@/components/Container";
import { HeaderVisibilityProvider } from "@/context/HeaderVisibilityContext";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

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

  if (!session) return null;
  return (
    <HeaderVisibilityProvider>
      <div className={`mt-6 mb-6 w-full`}>
        <Container>
          <Header session={session}/>
        </Container>
        {children}
        {modal}
      </div>
    </HeaderVisibilityProvider>
  );
}
