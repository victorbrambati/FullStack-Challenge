import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.Discord({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET
      }),
    // Passwordless / email sign in
  ],
  // Optional SQL or MongoDB database to persist users
  database: process.env.DATABASE_URL
})