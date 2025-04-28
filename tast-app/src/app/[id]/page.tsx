import { Transaction } from "../interface";

async function getTransaction(id: string): Promise<Transaction | undefined> {
    const LINK = 'https://payment-app-backend-svci.onrender.com'
    const res = await fetch(`${LINK}/api/transactions`, { cache: 'no-store' });
    const data = await res.json();
    return data.find((tx: Transaction) => tx.id === Number(id));
}

export default async function TransactionDetail({ params }: {params: Promise<{ id: string }>}) {
    const resolvedParams = await params;
    const transaction = await getTransaction(resolvedParams.id);

    if (!transaction) {
        return <div>Loading...</div>;
    }

    return (
        <main className="bg-gray-100 min-h-screen overflow-hidden">
            <div className="p-6 max-w-md mx-auto font-sans space-y-8">
                <div className=" flex flex-col justify-center text-center">
                    <h1 className="text-4xl font-bold m-2">{!transaction.payment ? "$" + `${transaction.amount}` : "-$" + `${transaction.amount}`}</h1>
                    <p className="text-xs font-light text-gray-400 m-0">{transaction.name}</p>
                    <p className="text-xs font-light text-gray-400 m-0">{transaction.date}</p>
                </div>

                <div className="bg-white rounded-2xl p-4 flex flex-col align-middle">
                    <div>
                        <p className="font-bold">Status: {!transaction.pending ? "Approved" : "Pending"}</p>
                        <p className="text-xs text-gray-400">{transaction.bank}</p>
                    </div>
                    <hr className="h-px m-5 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className="flex justify-between">
                        <p>Total:</p>
                        <p>{!transaction.payment ? "$" + `${transaction.amount}` : "-$" + `${transaction.amount}`}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
