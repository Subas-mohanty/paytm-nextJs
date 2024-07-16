"use client"
import { Card } from "@repo/ui/card";
import { useState } from "react";

export async function P2pTransfer({title, userId, transactions} : {
    title : string,
    userId : string,
    transactions : {
        id : string,
        time: Date,
        amount: number,
        fromAcc: string,
        toAcc: string;
    }[],
}) {    
    const [showAll, setShowAll] = useState(false);

    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }

    function toggleShowAll() {
        setShowAll(!showAll)
    }

    const visibleTransactions = showAll ? transactions : transactions.slice(0, 5);

    return (
        <Card title={title}>
            <div className="pt-2">
                {visibleTransactions.map(t => <div key={t.id} className="flex justify-between">
                    <div>
                        <div className="text-md">
                            {t.toAcc === userId ? "Received INR" : "Sent INR"}
                        </div>
                        <div className="text-slate-600 text-sm">
                            {t.time.toLocaleTimeString()} {/* Using custom formatDate function */}
                        </div>
                    </div>
                    <div className="flex flex-col items-end font-semibold">
                        <div >
                            {t.toAcc === userId ? "+ " : "- "}Rs {(t.amount / 100).toFixed(2)}
                        </div>
                    </div>
                </div>)}
            </div>
            {transactions.length > 5 && !showAll &&
                <button onClick={toggleShowAll} className="text-blue-500 mt-2 font-bold">
                    Show More
                </button>
            }
            {showAll &&
                <button onClick={toggleShowAll} className="text-blue-500 mt-2 font-bold">
                    Show Less
                </button>
            }
        </Card>
    )

}