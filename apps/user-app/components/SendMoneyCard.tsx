"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { Center } from "@repo/ui/center";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export const AddMoney = () => {
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState("");
  return (
    <div className="w-full">
      <Center>
        <Card title="Send Money">
          <div className="min-w-72 pt-2">
            <TextInput
              label={"Phone number"}
              placeholder={"1234567890"}
              onChange={(val) => {
                setNumber(val);
              }}
            />
            <TextInput
              label={"Amount"}
              placeholder={"1000"}
              onChange={(val) => {
                setAmount(Number(val));
              }}
            />
            <div className="flex justify-center pt-4">
              <Button onClick={async () => {
                try {
                  if (!amount || amount < 1) {
                      alert("Error: Please enter valid input")
                  } else {
                      const result = await p2pTransfer(number, amount * 100);
                      console.log(result)
                      if (result && result.msg === "Transfer successful") {
                          alert("Transfer successful");
                          location.reload();
                      } else {
                          alert("Error: " + (result && result.msg ? result.msg : "Unknown error"));
                      }
                  }
              } catch (error) {
                  console.log(error)
              }
              }}>Send Money</Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};

export default AddMoney;
