"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { CreateOnRampTransaction } from "../app/lib/actions/createOnRamptxn";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoneyCard = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setAmount(Number(val));
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                // window.location.href = redirectUrl || "";
                if(!amount || amount < 1 || !redirectUrl){
                    alert('Please Enter a valid amount')
                }
                else{
                    const intAmount = generateIntAmount(amount);
                    await CreateOnRampTransaction(intAmount, provider);
                    alert(`Successfully added ${intAmount / 100}`)
                    location.reload()
                }
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}

// converting 12.67 to 1267
function generateIntAmount(amount: number){
    const stringAmount = amount.toString();
    const values = stringAmount.split(".");
    const finalAmount = Number(values[0]) * 100;
    if(!values[1]) return finalAmount;
    else{
        const decimalValue = values[1];
        if (decimalValue.length === 1) {
            return finalAmount + (Number(decimalValue.charAt(0)) * 10);
        } else {
            return finalAmount + Number(decimalValue.charAt(0) + decimalValue.charAt(1));
        }
    }
}