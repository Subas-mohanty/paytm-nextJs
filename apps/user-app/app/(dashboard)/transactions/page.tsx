import Heading from "@repo/ui/heading";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { useGetOnRampTxns } from "../../../hooks/useGetOnRampTxns";
import { useGetSession } from "../../../hooks/useGetSession";
import { P2pTransfer } from "../../../components/P2pTransfer";
import { useGetP2PTxns } from "../../../hooks/useGetP2PTxns";

export default async function() {
    const transactions = await useGetOnRampTxns();
    const p2pTransactions = await useGetP2PTxns();
    const session = await useGetSession();

    if (!p2pTransactions || !session || !transactions) {
        return <div>
          Bad request  !!!! Try logout and then login again
        </div>
    }
    
    return (
        <div className="w-screen">
        <Heading heading="Transaction History"/>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
          <div>
          < P2pTransfer title='P2P Transactions' userId={session?.user.id} transactions={p2pTransactions} />
          </div>
          <div>
            <div>
              < OnRampTransactions title='Recent Transactions' transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
  
    )
}