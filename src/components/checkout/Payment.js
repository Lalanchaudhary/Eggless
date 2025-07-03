import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Alert,
  CircularProgress,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {
  handleRazorpayPayment,
  handleCODPayment,
  handleWalletPayment,
  getPaymentMethods
} from '../../services/paymentServices';
import { toast } from 'react-toastify';
const Payment = ({ selectedAddress ,orderInstruction,tax ,shipping}) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal + shipping + tax;
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAddress) {
      setError('Please select a shipping address');
      return;
    }

    await handlePayment();
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const orderData = {
        items: cartItems.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        shippingAddress: selectedAddress,
        orderInstruction,
        userId: user._id,
      };

      let result;
      switch (paymentMethod) {
        case 'razorpay':
          result = await handleRazorpayPayment(orderData);
          break;
        case 'cod':
          result = await handleCODPayment(orderData);
          break;
        case 'wallet':
          result = await handleWalletPayment(orderData);
          break;
        default:
          throw new Error('Invalid payment method');
      }

      const order = result?.order || result?.data?.order || result?.data;

      if (order) {
        toast.success('Order placed successfully!');
        cartItems.forEach(item => removeFromCart(item.id));
        navigate('/order-success');
      } else {
        throw new Error(result.message || 'Payment failed');
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = getPaymentMethods();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
                paymentMethod === method.id ? 'border-rose-500 bg-rose-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={() => setPaymentMethod(method.id)}
                  className="accent-rose-500"
                />
                <div>
                  <p className="font-medium">{method.name}</p>
                  <p className="text-xs text-gray-500">{method.description}</p>
                </div>
              </div>
              {!method.available && (
                <span className="text-red-500 text-xs">Unavailable</span>
              )}
            </label>
          ))}

          {paymentMethod === 'wallet' && (
            <div className="text-sm text-gray-600">
              Available Wallet Balance: ₹{user?.wallet.balance || 0}
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-600 border border-red-300 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <button
          onClick={handleOrderSubmit}
          disabled={loading}
          className="w-full mt-6 bg-rose-600 text-white py-2 px-4 rounded hover:bg-rose-700 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Continue to Payment'}
        </button>
      </div>
    </div>
  );
};

export default Payment