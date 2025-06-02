import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Balance from './components/balance/Balance.component';
import TransactionHistory from './components/transferDetails/transferHistoryDetails';
import MakeTransfer from './components/makeTransfer/makeTransfer';
import Login from './pages/login.page';
import Signup from './pages/signup.page';
import ProtectedRoute from './components/auth/protectedRoutes';
import axios from 'axios';

// Main Dashboard Component
const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/users/logout', { withCredentials: true });
      document.cookie = 'Token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      document.cookie = 'Uid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      document.cookie = 'Username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/login');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <h1 className="app-title">MoneyTransfer Pro</h1>
          <p className="app-subtitle">Your secure banking solution</p>
        </div>
        <div className="header-controls">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="dashboard-grid">
          <section className="balance-section">
            <div className="card accountbalance-card">
              <div className="accountbalance-label">Account Balance</div>
              {showBalance ? (
                <Balance />
              ) : (
                <div className="hidden-accountbalance">**********</div>
              )}
              <div className="balance-controls">
                <button
                  className={`toggle-balance-button ${showBalance ? 'active' : ''}`}
                  onClick={() => setShowBalance(prev => !prev)}
                >
                  {showBalance ? 'Hide Balance' : 'Show Balance'}
                </button>
              </div>
            </div>
            <div className="card transfer-card">
              <MakeTransfer />
            </div>
          </section>

          <section className="transactions-section">
            <div className="card transactions-card">
              <h2 className="section-title">Recent Transactions</h2>
              <TransactionHistory />
            </div>
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} MoneyTransfer Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

// App Component with Router
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;