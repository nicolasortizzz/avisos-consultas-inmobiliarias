import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { upsertUserFromAuth } from "@/lib/store";

const googleConfigured =
  Boolean(process.env.AUTH_GOOGLE_ID) && Boolean(process.env.AUTH_GOOGLE_SECRET);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    ...(googleConfigured
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
          }),
        ]
      : []),
    // Dev / fallback when Google keys are missing
    Credentials({
      id: "dev-login",
      name: "Acceso de prueba",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Nombre", type: "text" },
      },
      async authorize(credentials) {
        if (googleConfigured) return null;
        const email = String(credentials?.email || "").trim().toLowerCase();
        const name = String(credentials?.name || "").trim() || "Usuario";
        if (!email.includes("@")) return null;
        return { id: email, email, name };
      },
    }),
  ],
  pages: {
    signIn: "/cuenta",
  },
  callbacks: {
    async signIn({ user }) {
      if (user?.email) {
        await upsertUserFromAuth({
          email: user.email,
          name: user.name || user.email.split("@")[0],
          image: user.image || null,
        });
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
  },
  trustHost: true,
});
