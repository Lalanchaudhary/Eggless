import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  fetchWalletTransactions ,AddMoneyinWallet
} from '../../services/paymentServices';
import AddMoneyDialog from './AddMoneyDialog';

const MyWallet = () => {
  const { user, updateUser } = useUser();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsRefreshing(true);
      const data = await fetchWalletTransactions();
      setTransactions(data.transactions);
      // Optionally update user wallet balance here if needed
      if (updateUser) updateUser();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wallet</h2>
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-[#e098b0] to-[#d88aa2] rounded-lg p-6 text-white mb-6">
          <h3 className="text-lg font-medium mb-2">Available Balance</h3>
          <p className="text-3xl font-bold">₹{user?.wallet?.balance.toFixed(2) || 0}</p>
        </div>
        <button 
          onClick={handleOpen}
          className='w-full text-center bg-gradient-to-r from-[#e098b0] to-[#d88aa2] rounded-lg p-2 text-white mb-4'
        >
          Add Money
        </button>
        {/* Transaction History */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <span className={`font-semibold ${
                  transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'Credit' ? '+' : ''}{transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Add Money Dialog */}
      <AddMoneyDialog
        open={open}
        onClose={handleClose}
        user={user}
        onMoneyAdded={() => {
          fetchTransactions();
          if (updateUser) updateUser();
        }}
      />
    </Box>
  );
};

export default MyWallet; 