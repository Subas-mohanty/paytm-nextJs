import Heading from '@repo/ui/heading'
import { BalanceCard } from '../../../components/BalanceCard'
import { P2pTransfer } from '../../../components/P2pTransfer'
import SendMoneyCard from '../../../components/SendMoneyCard'
import { useGetBalance } from '../../../hooks/useGetBalance'
import { useGetP2PTxns } from '../../../hooks/useGetP2PTxns'
import { useGetSession } from '../../../hooks/useGetSession'

async function page() {
  const balance = await useGetBalance();
  const session = await useGetSession();
  const transactions = await useGetP2PTxns();

  if (!balance || !transactions || !session) {
    return <div>
        Bad request  !!!! Try logout and then login again
    </div>
}

  return (
    <div className="w-screen">
            <Heading heading='P2P Transfer' />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    < SendMoneyCard />
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="pt-4">
                        < P2pTransfer title='Recent Transactions' userId={session.user.id} transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default page