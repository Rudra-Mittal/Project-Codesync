import z from "zod"

export const SignUpUser = z.object({
  email: z.string().email({message:"Email is invalid"}),
  username: z.string().min(1,{message:"Username cannot be empty"}).max(30),
  password: z.string().min(3,{message:"Password must be of length atleast 3"}).max(100,{message:"Password tooo Long"}),
})

export const SignInUser = z.object({
  email: z.string().email({message:"Email is invalid"}),
  password: z.string().min(3,{message:"Password must be of length atleast 3"}).max(100,{message:"Password tooo Long"}),
})