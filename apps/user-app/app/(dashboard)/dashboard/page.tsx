import prisma from "@repo/db/client";
import Heading from "@repo/ui/heading"
import {useGetSession} from "../../../hooks/useGetSession";
import { useGetBalance } from "../../../hooks/useGetBalance";

export default async function() {
    const session = await useGetSession();
    const balance = await useGetBalance();

    if (!balance || !session) {
        return <div>
          Bad request  !!!! Try logout and then login again
        </div>
      }
    return <div className="w-screen">
        <Heading heading={`Welcome ${session?.user.name}`}></Heading>
        <div className="text-xl">
            Here is your account details 
        </div>
        <div className='w-full text-center text-xl mb-2 flex justify-center flex-col m-auto items-center'>
            <h2>Available Balance
                <span className="text-xl font-bold">  Rs {(balance.amount / 100).toFixed(2)}</span>
            </h2>
            <h2>Locked Balance
                <span className="text-xl font-bold">  Rs {(balance.locked / 100).toFixed(2)}</span>
            </h2>
            <h2>Total Balance
                <span className="text-xl font-bold">  Rs {((balance.locked + balance.amount) / 100).toFixed(2)}</span>
            </h2>
        </div>
    </div>
}