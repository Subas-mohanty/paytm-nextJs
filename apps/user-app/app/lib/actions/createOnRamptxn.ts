import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export const OnRampTransaction = async (amount : number, provider : string)=>{
    const session = await getServerSession(authOptions);
}