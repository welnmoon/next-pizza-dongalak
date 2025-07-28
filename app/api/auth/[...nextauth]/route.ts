import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare } from "bcrypt";
import { UserRole } from "@prisma/client";

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
        if (!credentials) {
          throw new Error("Неверные данные");
        }

        const findUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!findUser) {
          throw new Error("Пользователь не найден");
        }

        const isPasswordValid = await compare(
          credentials.password,
          findUser.password
        );

        if (!isPasswordValid) {
          throw new Error("Неверный пароль");
        }

        if (!findUser.verified) {
          throw new Error("Пользователь не подтвержден");
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
        session.user.fullName = token.fullName as string;
      } else {
        // Если нет id/email — session.user не заполняем
        session.user = undefined;
      }
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

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
