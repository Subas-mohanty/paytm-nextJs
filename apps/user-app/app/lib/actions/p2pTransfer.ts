"use server";

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import db from "@repo/db/client";

export const p2pTransfer = async (number : string, amount : number) =>{
    const session = await getServerSession(authOptions);
    const from = session?.user.id;
    
    if(!from){
        return {
            msg : "Error while sending money"
        }
    }

    const toUser = await db.user.findFirst({
        where : {
            number
        }
    });
    
    if(!toUser){
        return {
            msg : "User not found"
        }
    }

    try {
        await db.$transaction(async (txn)=>{
            await txn.$queryRaw`SELECT  * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
            const fromBalance = await txn.balance.findUnique({
                where : {
                    userId : from
                }
            });
            if(!fromBalance || fromBalance.amount < amount) throw new Error("Insufficient funds");
            
            await txn.balance.update({
                where: {userId : from},
                data : {
                    amount : {
                        decrement : amount
                    }
                }
            });

            await txn.balance.update({
                where: {userId : toUser.id},
                data : {
                    amount : {
                        increment : amount
                    }
                }
            });

            await txn.p2pTransfer.create({
                data :{
                    amount,
                    timestamp : new Date(),
                    fromUserId : from,
                    toUserId  : toUser.id
                }
            })
        })
    } catch (error : any) {
        console.error(error.message);
    }
}