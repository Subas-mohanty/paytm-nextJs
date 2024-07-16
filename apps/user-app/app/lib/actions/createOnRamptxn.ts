"use server";

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import db from "@repo/db/client"

export const CreateOnRampTransaction = async (amount : number, provider : string)=>{
    const session = await getServerSession(authOptions);
    console.log(amount);
    
    const token = (Math.random() * 1000000).toString();
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    
    try {
        const userId = session.user.id;

        await db.$transaction([

            db.onRampTransaction.create({
                data :{
                    status: 'Processing',
                    token,
                    provider,
                    amount,
                    userId,
                    startTime: new Date(),
                }
            }),

            db.balance.updateMany({
                where : {
                    userId,
                },
                data :{
                    locked : {
                        increment : amount
                    }
                }
            }) 
        ]);

        return {
            message : "done"
        }

    } catch (error) {
        console.log(error);
        return ({
            message: "Error while updating data"
        })
    }
}