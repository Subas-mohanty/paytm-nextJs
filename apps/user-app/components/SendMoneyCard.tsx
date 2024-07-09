"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { Center } from "@repo/ui/center";
import { sendMoney } from "../app/lib/actions/sendMoney";

export const AddMoney = () => {
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState("");
  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
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
              <Button onClick={() => {
                sendMoney("10000", Number(amount)*100);
              }}>Send Money</Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};

export default AddMoney;
