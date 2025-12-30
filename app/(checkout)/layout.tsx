"use client";

import "./global.css";
import Header from "@/components/Header/Header";
import Container from "@/components/Container";
import { useSession } from "next-auth/react";
import { Suspense } from "react";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  return (
    <div className="min-h-screen bg-[#F7F3EE]">
      <div className="">
        <Container>
          <Suspense fallback={null}>
            <Header
              session={session.data}
              hasSearch={false}
              hasCart={false}
              className="border-b-1 border-stone-200 pb-4 pt-6 mb-6"
            />
          </Suspense>
          {children}
        </Container>
      </div>
    </div>
  );
}
