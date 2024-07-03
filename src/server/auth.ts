import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type DefaultUser,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
// import DiscordProvider from "nexts-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/server/db";
import { signIn } from "./api/routers/user/user.services";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    session: ({ session, token }) => {
      console.log(session, token);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const response = await signIn({ username, password });
        const { id } = response.user;

        return {
          id,
          username,
        };
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
