"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Transaction, UserResponse } from "./interface";

export default function App() {
  const [transactions, settransactions] = useState<Transaction[] | null>(null);
  const [userData, setUserData] = useState<UserResponse | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/transactions!")
      .then(res => res.json())
      .then((data) => {
        settransactions(data)
        console.log(data)
      })
    fetch('http://localhost:3001/api/user')
      .then(res => res.json())
      .then((data) => {
        setUserData(data)
        console.log(data)
      });
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen overflow-hidden">
      <div className="p-6 max-w-md mx-auto font-sans space-y-8 h-full">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <div className="bg-white p-4 rounded-2xl">
              <p className="text-sm text-gray-600">Card Balance</p>
              <h2 className="text-2xl font-bold mt-2">${userData?.money}</h2>
              <p className="text-xs text-gray-400 mt-1">$1,482.70 Available</p>
            </div>

            <div className="bg-white p-4 rounded-2xl">
              <p className="text-sm">Daily Points</p>
              <h2 className="text-xs mt-1 text-gray-400">{userData?.points}</h2>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl flex flex-col justify-between w-40">
            <div>
              <p className="text-sm text-gray-600">No Payment Due</p>
              <p className="text-xs text-gray-400 mt-1">You’ve paid your September balance.</p>
            </div>
            <div className="text-center mt-4 text-4xl text-gray-500">✔️</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold m-1">Latest transactions!</h3>
          <div className="space-y-3 rounded-2xl bg-white">
            {transactions?.map((tx?: any) => (
              <Link
                key={tx?.id}
                href={`/${tx?.id}`}
                className="flex flex-col items-center justify-between p-3 cursor-pointer m-0"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <img src={tx?.logo} alt={tx?.name} className="w-10 h-10 object-contain" />
                    <div>
                      <p className="font-semibold">{tx?.name}</p>
                      <p className="text-xs text-gray-400">{tx?.pending ? 'Pending ' : ' '} {tx?.description}</p>
                      <p className="text-xs text-gray-400">{userData?.user == tx?.user ? '' : "From: " + tx?.user}</p>
                      <p className="text-xs text-gray-400">{tx?.date}</p>
                    </div>
                  </div>

                  <div className={`font-semibold ${tx?.type == 'Payment' ? "text-green-500" : "text-red-500"}`}>
                    {tx?.type == 'Payment' ? `$${tx?.amount}` : `-$${tx?.amount}`}
                  </div>
                </div>
                <hr className="h-px mt-5 w-full bg-gray-200 border-0 dark:bg-gray-700"/>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
