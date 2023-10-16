import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";
import { authService } from "@/services/auth";

export const authOptions: AuthOptions = {
  providers: [
    // GithubProvider({
    //     clientId: process.env.GITHUB_ID as string,
    //     clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID as string,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "jsmith" },
        password: { label: "password", type: "password", placeholder: "jsmith" },
      },
      async authorize(credentials:any,req) {
        const responseAuth = await authService.login({
          username: credentials.username,
          password: credentials.password
        })
        console.info('responseAuth===>', responseAuth)
        console.info('isSuccess===>', responseAuth?.success)
          const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
          if(responseAuth.Success){
            return user;
          }else{
            alert('login fail!')
            console.log('Password not correct!')
            // throw new Error('Password not correct!');
          }
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session:{
      strategy:'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
