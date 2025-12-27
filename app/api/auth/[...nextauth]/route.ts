import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare } from "bcrypt";
import { UserRole } from "@prisma/client";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Введите email и пароль");
        }

        const findUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!findUser) {
          throw new Error("Неверный email или пароль");
        }

        if (findUser.provider && findUser.provider !== "credentials") {
          throw new Error(
            `Войдите через ${findUser.provider === "github" ? "GitHub" : "Google"}`
          );
        }

        if (!findUser.password) {
          throw new Error("Пароль для этого аккаунта не задан");
        }

        let isPasswordValid = false;
        try {
          isPasswordValid = await compare(
            credentials.password,
            findUser.password
          );
        } catch {
          isPasswordValid = false;
        }

        if (!isPasswordValid) {
          throw new Error("Неверный email или пароль");
        }

        if (!findUser.verified) {
          await prisma.user.update({
            where: { id: findUser.id },
            data: { verified: new Date() },
          });
        }

        return {
          id: String(findUser.id),
          email: findUser.email,
          fullName: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token }) {
      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email as string,
        },
      });
      if (findUser) {
        token.id = String(findUser.id);
        token.fullName = findUser.fullName;
        token.role = findUser.role;
        token.email = findUser.email;
      } else {
        // Если пользователя нет — очищаем токен
        delete token.id;
        delete token.fullName;
        delete token.role;
        delete token.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id && token.email) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.email = token.email as string;
        // session.user.fullName = token.fullName as string; // убрано для прохождения сборки
      }
      // Если нет id/email — session.user не трогаем (оставляем как есть)
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account!.provider !== "credentials") {
        const existingUser = await prisma.user.findFirst({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              fullName: profile?.name || user.name || "OAuth User",
              password: "", // OAuth пользователи не имеют пароля
              provider: account!.provider,
              providerId: account!.providerAccountId,
              verified: new Date(),
            },
          });
        }
      }

      const cookiesStore = cookies();
      const token = (await cookiesStore).get("cartToken")?.value;

      if (token && user.id) {
        const userId = Number(user.id);

        const guestCart = await prisma.cart.findFirst({ where: { token } });
        if (guestCart && !guestCart.userId) {
          await prisma.cart.update({
            where: { id: guestCart.id },
            data: { userId },
          });
        }

        await prisma.order.updateMany({
          where: { token, userId: null },
          data: { userId },
        });
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
