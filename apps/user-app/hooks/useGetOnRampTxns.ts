import { useGetSession } from "./useGetSession";
import db from "@repo/db/client"

export async function useGetOnRampTxns() {
    const session = await useGetSession();
    const txns = await db.onRampTransaction.findMany({
        where: {
            userId: session?.user.id
        }
    });
    return txns.map(t => ({
        id : t.id,
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}
