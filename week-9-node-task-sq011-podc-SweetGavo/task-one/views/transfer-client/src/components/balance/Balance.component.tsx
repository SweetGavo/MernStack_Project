import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';

interface BalanceData {
  success: boolean;
  balance: string;
  accountNumber: string;
  userId: string;
  currency?: string;
  message?: string;
}

const BalanceComponent = () => {
  const [data, setData] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // Get userId from cookies
        const userId = document.cookie
          .split('; ')
          .find(row => row.startsWith('Uid='))
          ?.split('=')[1];

        if (!userId) {
          throw new Error('User ID not found');
        }

        const response = await axios.get(`http://localhost:5000/api/balances/${userId}`, {
          withCredentials: true
        });

        if (!response.data.success) {
          throw new Error(response.data["message"] || 'Failed to fetch balance');
        }

        setData(response.data);
      } catch (err:any) {
        console.error('Balance fetch error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch balance');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading balance...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!data) {
    return <div>No balance data available</div>;
  }

  return (
    <div className="balance-container">
      <h2>Account Balance</h2>
      <div className="balance-amount">{data.balance}</div>
      
      <div className="account-details">
        <p>Account Number: {data.accountNumber}</p>
        {data.currency && <p>Currency: {data.currency}</p>}
      </div>
    </div>
  );
};

export default BalanceComponent;