import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signingKey: JSON.stringify({
      kty: "oct",
      kid: "0qR864vS52J1FApr6S22Ii1CHNSGqXjubANCA8e0Fhg",
      alg: "HS512",
      k: process.env.JWT_SIGNING_SECRET,
    }),
  },
});
