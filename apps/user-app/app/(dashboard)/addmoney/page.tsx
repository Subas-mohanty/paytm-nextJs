// "use client"
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { useGetOnRampTxns } from "../../../hooks/useGetOnRampTxns";
import { useGetBalance } from "../../../hooks/useGetBalance";
import Heading from "@repo/ui/heading";
import { AddMoneyCard } from "../../../components/AddMoneyCard";


export default async function() {
    const balance = await useGetBalance();
    const transactions = await useGetOnRampTxns();

    return <div className="w-screen">
        <Heading heading="Add Money"/>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoneyCard />
            </div>
            <div>
                <BalanceCard amount={balance?.amount || 0} locked={balance?.locked || 0} />
                <div className="pt-4">
                    <OnRampTransactions title='Recent Transactions' transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}