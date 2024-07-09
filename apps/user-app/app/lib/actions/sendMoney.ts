"use server";

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export const sendMoney = async (number : string, amount : number) =>{
    const session = await getServerSession(authOptions);
    
    console.log(number)
    // console.log(amount)
    const from = session.user.id;
    
    if(!from){
        return {
            msg : "Error while sending money"
        }
    }

    const toUser = await prisma.user.findFirst({
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
        await prisma.$transaction(async (txn)=>{
            const fromBalance = await txn.balance.findUnique({
                where : {
                    userId : Number(from)
                }
            });
            if(!fromBalance || fromBalance.amount < amount) throw new Error("Insufficient funds");

            await txn.balance.update({
                where: {userId : Number(from)},
                data : {
                    amount : {
                        decrement : amount
                    }
                }
            });

            await txn.balance.update({
                where: {userId : Number(toUser.id)},
                data : {
                    amount : {
                        increment : amount
                    }
                }
            });

            // return {
            //     msg : "Transaction completed"
            // }
        })
    } catch (error : any) {
        console.error(error.message);
    }
}