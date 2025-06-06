import type { Metadata } from "next";
import "./global.css";
import Header from "@/components/Header/Header";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Dongalak",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`min-h-screen bg-[#F4F1EE]`}>
      <div className="">
        <Container>
          <Header
            hasSearch={false}
            hasCart={false}
            className="border-b-1 border-gray-200 pb-4 pt-6 mb-6"
          />
          {children}
        </Container>
      </div>
    </div>
  );
}
