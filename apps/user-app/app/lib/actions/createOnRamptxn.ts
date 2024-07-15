"use server";

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export const CreateOnRampTransaction = async (amount : number, provider : string)=>{
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    const token = Math.random().toString();
    if(!userId){
        return {
            msg : "User is not logged in"
        }
    }
    
    await prisma.onRampTransaction.create({
        data : {
            amount,
            provider,
            token,
            startTime : new Date(),
            userId,
            status : "Processing"
        }
    })
    return {
        msg : "On ramp transaction added"
    }
}