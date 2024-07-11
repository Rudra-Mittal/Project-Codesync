import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import { SignInUser,SignUpUser } from "./types";
export const authOptions={
    providers:[
        CredentialsProvider ({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                email: { label: "Email", type: "email" }    
            },
            // @ts-ignore
            async authorize(credentials:any) {
                const userCred={
                    email:credentials.email,
                    username:credentials.name,
                    password:credentials.password
                }
                const hashedPasword = await bcrypt.hash(userCred.password, 10);
                const prisma =  new PrismaClient();
                if(credentials.type==="signUp"){
                    try{
                        const res= SignUpUser.safeParse(userCred);
                        if(res.error){
                            // console.log(res.error)
                            throw new Error(res.error.issues[0].message)
                        }
                        const user=await prisma.user.create({
                            data:{
                                name: userCred.username,
                                email: userCred.email,
                                password: hashedPasword
                            }
                        }).catch((e)=>{
                            prisma.$disconnect();
                            throw new Error("User already exist with this email");
                        })
                        prisma.$disconnect();
                        return {
                            id:user?.id,
                            name: user?.name,
                            email: user?.email,
                        };
                        
                    }catch(e:any){
                        // console.log(e);
                        throw new Error(e?.message)
                    }
                }
                else{
                try{
                    const res=SignInUser.safeParse(userCred);
                    if(res.error){
                        throw new Error(res.error.issues[0].message)
                    }
                    const user=await prisma.user.findFirst({
                        where: {
                            email: userCred.email,
                        }
                    });
                    prisma.$disconnect();
                    // console.log(" user from db",user);
                    if(!user|| ! await bcrypt.compare(userCred.password,user?.password)){
                        
                        throw new Error("Invalid credentials");
                    }
                    // console.log(user);
                    // Return a User object or null based on your logic
                    return {
                        id:user?.id,
                        name: user?.name,
                        email: user?.email,
                    };
                }catch(e:any){
                    
                    throw new Error(e?.message)
                }
            }}
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID||"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET||""
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET||"rlj2379239",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        },
        async signIn({user,profile }:any){
            console.log(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET);
            // console.log("User e",user.error);
            if(user?.error){
                return null;
                // throw new Error(user.error.message);
            }
            return true;
        }
    },
    pages:{
        signIn:"/signin"
    }
}