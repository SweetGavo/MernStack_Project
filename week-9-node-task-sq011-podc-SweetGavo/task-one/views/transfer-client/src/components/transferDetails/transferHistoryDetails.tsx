import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../App.css';

interface Transaction {
    userId: string;
    amount: number;
    receiverAccount: string;
    senderAccount: string;
    transferDescription?: string;
    description: string;
    date: string;
  }

const TransactionHistory = () => {
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Get userId from cookies
        const userId = document.cookie
          .split('; ')
          .find(row => row.startsWith('Uid='))
          ?.split('=')[1];

        if (!userId) {
          throw new Error('User ID not found');
        }

        const response = await axios.get(
          `http://localhost:5000/api/transactions/${userId}/transaction`, 
          { withCredentials: true }
        );

        setTransactions(response.data);
      } catch (err) {
        setError('Failed to fetch transactions');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!transactions.length) return <div>No transactions found</div>;

  return (
    <div className="transaction-history">
  <h2 className="history-title">Your Transaction History</h2>
  
  <div className="transaction-section">
    <h3 className="section-title debit-title">
      <span className="title-icon">↓</span> Debits
    </h3>
    <ul className="transaction-list">
      {transactions.map(tx => (
        <li key={tx.userId} className="transaction-item debit-item">
          <span className="transaction-amount">-₦{tx.amount.toLocaleString()}</span>
          <span className="transaction-details">
            To: {tx.receiverAccount} 
          </span>
          { <div className="transaction-note">Note: {tx.transferDescription}</div>}
        </li>
      ))}
      {(!transactions || transactions.length === 0) && (
        <li className="no-transactions">No debit transactions</li>
      )}
    </ul>
  </div>

  <div className="transaction-section">
    <h3 className="section-title credit-title">
      <span className="title-icon">↑</span> Credits
    </h3>
    <ul className="transaction-list">
      {transactions.map(tx => (
        <li key={tx.userId} className="transaction-item credit-item">
          <span className="transaction-amount">+₦{tx.amount.toLocaleString()}</span>
          <span className="transaction-details">
            From: {tx.senderAccount} 
          </span>
          { <div className="transaction-note">Note: {tx.transferDescription}</div>}
        </li>
      ))}
      {(!transactions || transactions.length === 0) && (
        <li className="no-transactions">No credit transactions</li>
      )}
    </ul>
  </div>
</div>
  );
};

export default TransactionHistory;