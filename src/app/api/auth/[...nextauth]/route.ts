// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials?.password === "password123"
        ) {
          return { id: 1, name: "Admin" };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async redirect({ baseUrl }) {
      // Redirect to your dashboard page after login.
      return `${baseUrl}/admin/boats`;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
