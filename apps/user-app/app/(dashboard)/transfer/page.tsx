import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { useGetOnRampTxns } from "../../../hooks/useGetOnRampTxns";
import { useGetBalance } from "../../../hooks/useGetBalance";
import Heading from "@repo/ui/heading";


export default async function() {
    const balance = await useGetBalance();
    const transactions = await useGetOnRampTxns();

    return <div className="w-screen">
        <Heading heading="Transfer"/>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance?.amount || 0} locked={balance?.locked || 0} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}