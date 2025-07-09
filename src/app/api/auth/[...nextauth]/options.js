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
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = new User({
            email: user.email,
            username: user.name.replace(' ', '').toLowerCase(),
            image: user.picture,
            role: user.role || 'user',
          });
          await existingUser.save();
        }
        token.id = existingUser._id.toString();
        token.role = existingUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user?.email) {
        await connectToDB();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.id = dbUser._id.toString();
          session.user.role = dbUser.role;
        } else {
          session.user.id = token.id;
          session.user.role = token.role;
        }
      }
      return session;
    },
  },
};
