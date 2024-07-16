"use client";
import { Card } from "@repo/ui/card";
import { OnRampStatus } from "@prisma/client";
import { useState } from "react";

export const OnRampTransactions = ({
  transactions,
  title,
}: {
  transactions: {
    id: string;
    time: Date;
    amount: number;
    status: OnRampStatus;
    provider: string;
  }[];
  title: string;
}) => {
  const [showAll, setShowAll] = useState(false);

  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  function toggleShowAll() {
    setShowAll(!showAll);
  }

  const visibleTransactions = showAll ? transactions : transactions.slice(0, 5);

  return (
    <Card title={title}>
      <div>
        <div className="pt-2">
          {visibleTransactions.map((t) => (
            <div className="flex justify-between">
              <div>
                <div className="text-sm">Received INR</div>
                <div className="text-slate-600 text-xs">
                  {/* built in method for time and date formatting */}
                  {t.time.toDateString()} {t.time.toLocaleTimeString()}
                </div>
              </div>
              <div className="flex flex-col items-end font-semibold">
                <div>Rs {(t.amount / 100).toFixed(2)}</div>
                <div className={getStatusColour(t.status)}>
                  {getStatus(t.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
        {transactions.length > 5 && !showAll && (
          <button
            onClick={toggleShowAll}
            className="text-blue-500 mt-2 font-bold"
          >
            Show More
          </button>
        )}
        {showAll && (
          <button
            onClick={toggleShowAll}
            className="text-blue-500 mt-2 font-bold"
          >
            Show Less
          </button>
        )}
      </div>
    </Card>
  );
};

function getStatusColour(status: OnRampStatus) {
  switch (status) {
    case "Success":
      return "text-green-600";
    case "Failure":
      return "text-red-600";
    case "Processing":
      return "text-orange-600";
    default:
      return "text-slate-600";
  }
}

function getStatus(status: OnRampStatus) {
  switch (status) {
    case "Success":
      return "Success";
    case "Failure":
      return "Failed";
    case "Processing":
      return "Pending";
    default:
      return "";
  }
}
