import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signOut } from "next-auth/react";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOGGLE_CLIENT_SECRET,
      // httpOptions: {
      //   timeout: 10000,
      // },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // Making sure which user is currently online

      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();

        return session;
      } else {
        // return nothing
      }
    },
    async signIn({ profile }) {
      try {
        // Every nextJs route is a serverless route
        // That means its a lambda function that opens up only when it is called
        // Every time it gets called it needs to spin up the server and make a connection to database
        // That is great because we don't have to run the server constantly
        await connectToDB();

        // Check if the user already exist
        const userExists = await User.findOne({
          email: profile.email,
        });

        // If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
