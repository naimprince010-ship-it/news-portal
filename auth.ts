import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Simple hardcoded check for demo purposes
                // In a real app, check against a database or environment variables
                if (
                    credentials.email === "admin@prothomalo.com" &&
                    credentials.password === "admin123"
                ) {
                    return {
                        id: "1",
                        name: "Admin User",
                        email: "admin@prothomalo.com",
                        role: "admin",
                    };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnKeystatic = nextUrl.pathname.startsWith('/keystatic');

            if (isOnDashboard || isOnKeystatic) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && nextUrl.pathname === '/login') {
                // Redirect logged-in users away from login page
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
});
