import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        await connectToDB();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = new User({
            email: user.email,
            username: user.name.replace(' ', '').toLowerCase(),
            image: user.picture,
            role: user.role,
          });
          await newUser.save();
        }
        token.id = existingUser.id;
        token.role = existingUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
