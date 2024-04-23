import React, { useState, useEffect } from "react";

export default function TransactionList() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await fetch(`http://localhost:3001/transaction/get-all`, {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch transactions: ${response.statusText}`);
            }
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    return (
        <div>
            <h1>Your Transactions</h1>
            {transactions.length > 0 ? (
                <table className='min-w-full table-auto'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='px-4 py-2'>Transaction ID</th>
                            <th className='px-4 py-2'>Total</th>
                            <th className='px-4 py-2'>Product ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td className='border px-4 py-2'>{transaction.id}</td>
                                <td className='border px-4 py-2'>{transaction.total}</td>
                                <td className='border px-4 py-2'>{transaction.product_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No transactions found.</p>
            )}
        </div>
    );
}
