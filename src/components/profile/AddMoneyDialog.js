import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, Alert } from '@mui/material';
import { AddMoneyinWallet } from '../../services/paymentServices';

const AddMoneyDialog = ({ open, onClose, user, onMoneyAdded }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddMoney = async () => {
    try {
      setLoading(true);
      setError(null);
      await AddMoneyinWallet(amount, user);
      setAmount('');
      if (onMoneyAdded) onMoneyAdded();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to add money');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Money to Wallet</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          autoFocus
          margin="dense"
          label="Amount"
          type="number"
          fullWidth
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{ startAdornment: <span className="mr-2">₹</span> }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleAddMoney}
          variant="contained"
          color="primary"
          disabled={!amount || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Money'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMoneyDialog; 