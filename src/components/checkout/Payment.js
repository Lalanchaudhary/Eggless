import React, { useState } from 'react';
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
import AddMoneyDialog from '../profile/AddMoneyDialog';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdSecurity,
  MdOutlineAccountBalanceWallet,
  MdLocalShipping,
  MdArrowForward
} from 'react-icons/md';
import { RiSecurePaymentLine, RiBankCardFill } from "react-icons/ri";

const Payment = ({ selectedAddress, orderInstruction, tax, shipping, deliveryDate, deliveryTime }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();
  const { user, updateUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
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
        tax: tax,
        shippingcharge: shipping,
        shippingAddress: selectedAddress,
        orderInstruction,
        deliveryDate: deliveryDate,
        deliveryTime: deliveryTime,
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

  const getMethodIcon = (id) => {
    switch (id) {
      case 'razorpay': return <RiBankCardFill className="w-6 h-6 text-blue-600" />;
      case 'cod': return <MdLocalShipping className="w-6 h-6 text-green-600" />;
      case 'wallet': return <MdOutlineAccountBalanceWallet className="w-6 h-6 text-purple-600" />;
      default: return <RiSecurePaymentLine className="w-6 h-6 text-gray-600" />;
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-8"
      >
        <MdSecurity className="text-green-600 w-6 h-6" />
        <h2 className="text-2xl font-bold text-gray-800">Secure Payment</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-rose-500 rounded-full block"></span>
              Choose Payment Mode
            </h3>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="relative">
                  <label
                    className={`relative flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === method.id
                        ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-500 ring-opacity-20'
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                      } ${!method.available ? 'opacity-60 cursor-not-allowed grayscale' : ''}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => method.available && setPaymentMethod(method.id)}
                      className="hidden"
                      disabled={!method.available}
                    />

                    <div className="mt-1 mr-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-rose-500' : 'border-gray-300'
                        }`}>
                        {paymentMethod === method.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <div className={`p-2 rounded-lg ${paymentMethod === method.id ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                          {getMethodIcon(method.id)}
                        </div>
                        <span className={`font-semibold ${paymentMethod === method.id ? 'text-gray-900' : 'text-gray-700'}`}>
                          {method.name}
                        </span>
                        {!method.available && (
                          <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">Unavailable</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 ml-[52px] leading-relaxed">
                        {method.description}
                      </p>

                      {/* Wallet Specific UI */}
                      <AnimatePresence>
                        {method.id === 'wallet' && paymentMethod === 'wallet' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-[52px] mt-3 overflow-hidden"
                          >
                            <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm inline-block min-w-[200px]">
                              <p className="text-sm text-gray-600 mb-1">Current Balance</p>
                              <p className="text-xl font-bold text-gray-800">₹{user?.wallet.balance || 0}</p>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setAddMoneyOpen(true)
                                }}
                                className="text-sm text-rose-600 font-medium hover:text-rose-700 hover:underline mt-1"
                              >
                                + Add Money to Wallet
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-100 text-green-800 text-sm">
              <RiSecurePaymentLine className="w-5 h-5 flex-shrink-0" />
              <p>Your payment information is encrypted and secure.</p>
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2"
            >
              <span className="flex-shrink-0">⚠️</span>
              {error}
            </motion.div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-4"
          >
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600" : ""}>
                  {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <div className="h-px bg-gray-100 my-4"></div>

              <div className="flex justify-between items-end">
                <span className="text-gray-800 font-bold">Total Amount</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900 block">₹{total.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 font-normal">Including all taxes</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOrderSubmit}
              disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white py-4 rounded-xl font-semibold shadow-rose-200 shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay ₹{total.toFixed(2)}
                  <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="mt-6 space-y-2 text-xs text-gray-500 text-center">
              <p className="flex justify-center items-center gap-1">
                <MdSecurity className="text-gray-400" />
                Guaranteed 100% Safe & Secure Checkout
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <AddMoneyDialog
        open={addMoneyOpen}
        onClose={() => setAddMoneyOpen(false)}
        user={user}
        onMoneyAdded={() => {
          if (updateUser) updateUser();
        }}
      />
    </div>
  );
};

export default Payment;