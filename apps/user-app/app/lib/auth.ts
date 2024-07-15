import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { Session, TokenSet } from "next-auth";

interface Credentials {
    name: string;
    phone: string;
    password: string;
}

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name : {label : "Name", type : "text", placeholder : "subas", required: true},
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", placeholder: "password", required: true }
          },
          async authorize(credentials: Credentials | undefined){
            // Do zod validation, OTP validation here
            if(!credentials) return null;
            
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        name : credentials.name,
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });

                await db.balance.create({
                    data :{
                        userId: user.id,
                        amount: 0,
                        locked: 0
                    }
                })
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: {token: TokenSet, session : Session}) {
            if(session?.user){
                session.user.id = token.sub as string
            }
            return session
        }
    }
  }
  