import {useGetSession} from './useGetSession'
import db from "@repo/db/client"

export async function useGetBalance() {
    try {
        const session = await useGetSession();
        const balance = await db.balance.findFirst({
            where: {
                userId: session?.user.id
            }
        });

        return {
            amount : balance?.amount || 0,
            locked : balance?.locked || 0
        }
        
        
    } catch (error) {
        console.log(error);
    }
}