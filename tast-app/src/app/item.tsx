import { useEffect, useState } from "react";

export default function TransactionDetail({ params }: { params: { id: string } }) {
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/transactions`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((tx: any) => tx.id === Number(params.id));
        setTransaction(found);
      });
  }, [params.id]);

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-6 max-w-md mx-auto font-sans space-y-8">
      <h1 className="text-2xl font-bold">{transaction.name}</h1>
      <img src={transaction.logo} alt={transaction.name} className="w-20 h-20" />
      <p className="text-gray-600">{transaction.description}</p>
      <p className="text-gray-400">Amount: ${transaction.amount}</p>
      <p className="text-gray-400">Date: {transaction.date}</p>
    </main>
  );
}
